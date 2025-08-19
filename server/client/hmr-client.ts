/**
 * Enhanced HMR client to prevent infinite loops
 * Version 3.0 - Advanced state control and smart reconnection
 */
class MjoHMRClient {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 3; // Reduced to avoid spam
    private reconnectDelay = 2000; // 2 seconds base
    private isConnected = false;
    private isReloading = false;
    private buildInProgress = false;
    private lastBuildCompleteTime = 0;
    private reloadCooldown = 3000; // 3 seconds cooldown between reloads

    // States to prevent loops
    private isShuttingDown = false;
    private hasReloadScheduled = false;
    private notificationTimeout?: number;

    constructor() {
        // Prevent multiple instances
        if (window.mjoHMRClient) {
            console.log("🔥 HMR client already exists, reusing instance");
            return window.mjoHMRClient;
        }

        window.mjoHMRClient = this;
        this.init();
    }

    private init(): void {
        console.log("🔥 Starting HMR client v3.0...");

        // Mark as initialized to avoid multiple instances
        if (window.mjHMRInitialized) {
            console.log("🔥 HMR already initialized, exiting...");
            return;
        }
        window.mjHMRInitialized = true;

        this.setupCleanupListeners();
        this.connect();
    }

    private setupCleanupListeners(): void {
        // Cleanup when closing/reloading the window
        window.addEventListener("beforeunload", () => {
            console.log("🔄 Page closing, cleaning up HMR...");
            this.isShuttingDown = true;
            this.cleanup();
        });

        window.addEventListener("unload", () => {
            this.isShuttingDown = true;
            this.cleanup();
        });

        // Cleanup when the page is hidden (tab change, etc.)
        document.addEventListener("visibilitychange", () => {
            if (document.hidden && this.isReloading) {
                console.log("🔄 Page hidden during reload, cleaning up...");
                this.cleanup();
            }
        });
    }

    private cleanup(): void {
        console.log("🧹 Cleaning up HMR client...");

        if (this.ws) {
            try {
                this.ws.close(1000, "Cleanup");
            } catch (error) {
                console.log("⚠️ Error closing WebSocket:", error);
            }
            this.ws = null;
        }

        this.isConnected = false;
    }

    private connect(): void {
        // Do not connect if shutting down or reload is already scheduled
        if (this.isShuttingDown || this.isReloading || this.hasReloadScheduled) {
            console.log("🔥 HMR connection skipped: invalid state");
            return;
        }

        if (this.isConnected) {
            console.log("🔥 Already connected to HMR");
            return;
        }

        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${protocol}//${window.location.host}/hmr`;

        console.log("🔌 Connecting to HMR WebSocket:", wsUrl);

        try {
            this.ws = new WebSocket(wsUrl);
            this.setupEventListeners();
        } catch (error) {
            console.error("❌ Error creating WebSocket:", error);
            this.scheduleReconnect();
        }
    }

    private setupEventListeners(): void {
        if (!this.ws) return;

        this.ws.onopen = () => {
            console.log("✅ HMR client connected");
            this.isConnected = true;
            this.reconnectAttempts = 0;
            this.showNotification("🔥 HMR connected", "success");
        };

        this.ws.onmessage = (event: MessageEvent) => {
            try {
                const data: HMREventData = JSON.parse(event.data);
                this.handleHMREvent(data);
            } catch (error) {
                console.error("❌ Error parsing HMR message:", error);
            }
        };

        this.ws.onclose = (event: CloseEvent) => {
            console.log("❌ HMR WebSocket connection closed:", event.code, event.reason);
            this.isConnected = false;

            // Only reconnect if not intentionally reloading
            if (!this.isReloading && this.reconnectAttempts < this.maxReconnectAttempts) {
                this.scheduleReconnect();
            }
        };

        this.ws.onerror = (error: Event) => {
            console.error("⚠️ HMR WebSocket error:", error);
            this.isConnected = false;
        };
    }

    private handleHMREvent(event: HMREventData): void {
        console.log("📡 HMR event received:", event.type, event.data);

        // Avoid processing events if already reloading or shutting down
        if (this.isReloading || this.isShuttingDown || this.hasReloadScheduled) {
            console.log("🔄 Ignoring HMR event: invalid state");
            return;
        }

        switch (event.type) {
            case "build-start":
                this.buildInProgress = true;
                this.showNotification("🔨 Building...", "info");
                break;

            case "build-complete":
                this.buildInProgress = false;
                this.lastBuildCompleteTime = Date.now();
                this.showNotification("✅ Build completed", "success");
                // Schedule reload with better control
                this.scheduleReload();
                break;

            case "build-error":
                this.buildInProgress = false;
                this.showNotification(`❌ Error: ${event.data?.error || "Unknown error"}`, "error");
                // DO NOT reload in case of error
                break;

            case "file-changed":
                if (!this.buildInProgress) {
                    const files = event.data?.files || [];
                    this.showNotification(`📝 Files changed: ${files.length}`, "info");
                }
                break;

            case "reload":
                this.scheduleReload();
                break;

            default:
                console.log("🤷‍♂️ Unhandled HMR event:", event.type);
        }
    }

    private scheduleReload(): void {
        if (this.hasReloadScheduled || this.isReloading || this.isShuttingDown) {
            console.log("🔄 Reload already scheduled or in progress");
            return;
        }

        // Check cooldown
        const timeSinceLastBuild = Date.now() - this.lastBuildCompleteTime;
        if (timeSinceLastBuild > 0 && timeSinceLastBuild < this.reloadCooldown) {
            console.log(`⏳ Reload in cooldown, waiting ${this.reloadCooldown - timeSinceLastBuild}ms more`);
            setTimeout(() => this.scheduleReload(), this.reloadCooldown - timeSinceLastBuild);
            return;
        }

        console.log("🔄 Scheduling page reload...");
        this.hasReloadScheduled = true;
        this.isReloading = true;
        this.cleanup();

        this.showNotification("🔄 Reloading page...", "info");

        // Delay to show notification and clean up connections
        setTimeout(() => {
            console.log("🔄 Executing reload...");
            window.location.reload();
        }, 800);
    }

    private scheduleReconnect(): void {
        if (this.isReloading || this.reconnectAttempts >= this.maxReconnectAttempts) {
            if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                console.log("❌ Maximum reconnect attempts reached");
                this.showNotification("❌ HMR permanently disconnected", "error");
            }
            return;
        }

        this.reconnectAttempts++;
        const delay = this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1);

        console.log(`🔄 Retrying connection in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

        setTimeout(() => {
            if (!this.isReloading && !this.isConnected) {
                this.connect();
            }
        }, delay);
    }

    private createNotificationContainer(): void {
        // Create notification container if it does not exist
        if (document.getElementById("hmr-notifications")) return;

        const container = document.createElement("div");
        container.id = "hmr-notifications";
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    private showNotification(message: string, type: NotificationType = "info"): void {
        this.createNotificationContainer();
        const container = document.getElementById("hmr-notifications");
        if (!container) return;

        // Clear previous notification
        if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
        }
        container.innerHTML = "";

        const notification = document.createElement("div");

        const colors: Record<NotificationType, string> = {
            info: "#3b82f6",
            success: "#10b981",
            error: "#ef4444",
            warning: "#f59e0b",
        };

        notification.style.cssText = `
            background: ${colors[type] || colors.info};
            color: white;
            padding: 12px 16px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            pointer-events: auto;
            cursor: pointer;
        `;

        notification.textContent = message;
        container.appendChild(notification);

        // Animate entry
        requestAnimationFrame(() => {
            notification.style.transform = "translateX(0)";
        });

        // Auto-hide after 4 seconds (except permanent errors)
        if (type !== "error" || message.includes("permanently disconnected")) {
            this.notificationTimeout = window.setTimeout(() => {
                notification.style.transform = "translateX(100%)";
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 4000);
        }

        // Click to close
        notification.addEventListener("click", () => {
            notification.style.transform = "translateX(100%)";
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
}

// Only initialize once when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        if (!window.mjoHMRClient) {
            new MjoHMRClient();
        }
    });
} else {
    if (!window.mjoHMRClient) {
        new MjoHMRClient();
    }
}

interface HMREventData {
    type: "build-start" | "build-complete" | "build-error" | "file-changed" | "reload";
    data?: {
        error?: string;
        files?: string[];
    };
}

type NotificationType = "info" | "success" | "error" | "warning";

interface Window {
    mjoHMRClient?: MjoHMRClient;
    mjHMRInitialized?: boolean;
}
