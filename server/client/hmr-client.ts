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
    private reloadCooldown = 500; // 500 milliseconds cooldown between reloads

    // States to prevent loops
    private isShuttingDown = false;
    private hasReloadScheduled = false;
    private notificationTimeout?: number;

    constructor() {
        // Prevent multiple instances
        if (window.mjoHMRClient) {
            return window.mjoHMRClient;
        }

        window.mjoHMRClient = this;
        this.init();
    }

    private init(): void {
        // Mark as initialized to avoid multiple instances
        if (window.mjHMRInitialized) {
            return;
        }
        window.mjHMRInitialized = true;

        this.setupCleanupListeners();
        this.connect();
    }

    private setupCleanupListeners(): void {
        // Cleanup when closing/reloading the window
        window.addEventListener("beforeunload", () => {
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
                this.cleanup();
            }
        });
    }

    private cleanup(): void {
        if (this.ws) {
            try {
                this.ws.close(1000, "Cleanup");
            } catch (error) {
                console.warn("⚠️ Error closing WebSocket:", error);
            }
            this.ws = null;
        }

        this.isConnected = false;
    }

    private connect(): void {
        // Do not connect if shutting down or reload is already scheduled
        if (this.isShuttingDown || this.isReloading || this.hasReloadScheduled) {
            return;
        }

        if (this.isConnected) {
            return;
        }

        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${protocol}//${window.location.host}/hmr`;

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
        // Avoid processing events if already reloading or shutting down
        if (this.isReloading || this.isShuttingDown || this.hasReloadScheduled) {
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
                console.warn("🤷‍♂️ Unhandled HMR event:", event.type);
        }
    }

    private scheduleReload(): void {
        if (this.hasReloadScheduled || this.isReloading || this.isShuttingDown) {
            return;
        }

        // Check cooldown
        const timeSinceLastBuild = Date.now() - this.lastBuildCompleteTime;
        if (timeSinceLastBuild > 0 && timeSinceLastBuild < this.reloadCooldown) {
            setTimeout(() => this.scheduleReload(), this.reloadCooldown - timeSinceLastBuild);
            return;
        }

        this.hasReloadScheduled = true;
        this.isReloading = true;
        this.cleanup();

        this.showNotification("🔄 Reloading page...", "info");

        // Delay to show notification and clean up connections
        setTimeout(() => {
            window.location.reload();
        }, 800);
    }

    private scheduleReconnect(): void {
        if (this.isReloading || this.reconnectAttempts >= this.maxReconnectAttempts) {
            if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                console.warn("❌ Maximum reconnect attempts reached");
                this.showNotification("❌ HMR permanently disconnected", "error");
            }
            return;
        }

        this.reconnectAttempts++;
        const delay = this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1);

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
