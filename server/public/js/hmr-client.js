class MjoHMRClient {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 3;
    this.reconnectDelay = 2e3;
    this.isConnected = false;
    this.isReloading = false;
    this.buildInProgress = false;
    this.lastBuildCompleteTime = 0;
    this.reloadCooldown = 3e3;
    this.isShuttingDown = false;
    this.hasReloadScheduled = false;
    if (window.mjoHMRClient) {
      console.log("🔥 HMR client already exists, reusing instance");
      return window.mjoHMRClient;
    }
    window.mjoHMRClient = this;
    this.init();
  }
  init() {
    console.log("🔥 Starting HMR client v3.0...");
    if (window.mjHMRInitialized) {
      console.log("🔥 HMR already initialized, exiting...");
      return;
    }
    window.mjHMRInitialized = true;
    this.setupCleanupListeners();
    this.connect();
  }
  setupCleanupListeners() {
    window.addEventListener("beforeunload", () => {
      console.log("🔄 Page closing, cleaning up HMR...");
      this.isShuttingDown = true;
      this.cleanup();
    });
    window.addEventListener("unload", () => {
      this.isShuttingDown = true;
      this.cleanup();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.isReloading) {
        console.log("🔄 Page hidden during reload, cleaning up...");
        this.cleanup();
      }
    });
  }
  cleanup() {
    console.log("🧹 Cleaning up HMR client...");
    if (this.ws) {
      try {
        this.ws.close(1e3, "Cleanup");
      } catch (error) {
        console.log("⚠️ Error closing WebSocket:", error);
      }
      this.ws = null;
    }
    this.isConnected = false;
  }
  connect() {
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
  setupEventListeners() {
    if (!this.ws)
      return;
    this.ws.onopen = () => {
      console.log("✅ HMR client connected");
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.showNotification("🔥 HMR connected", "success");
    };
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleHMREvent(data);
      } catch (error) {
        console.error("❌ Error parsing HMR message:", error);
      }
    };
    this.ws.onclose = (event) => {
      console.log("❌ HMR WebSocket connection closed:", event.code, event.reason);
      this.isConnected = false;
      if (!this.isReloading && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.scheduleReconnect();
      }
    };
    this.ws.onerror = (error) => {
      console.error("⚠️ HMR WebSocket error:", error);
      this.isConnected = false;
    };
  }
  handleHMREvent(event) {
    var _a, _b;
    console.log("📡 HMR event received:", event.type, event.data);
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
        this.scheduleReload();
        break;
      case "build-error":
        this.buildInProgress = false;
        this.showNotification(`❌ Error: ${((_a = event.data) == null ? void 0 : _a.error) || "Unknown error"}`, "error");
        break;
      case "file-changed":
        if (!this.buildInProgress) {
          const files = ((_b = event.data) == null ? void 0 : _b.files) || [];
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
  scheduleReload() {
    if (this.hasReloadScheduled || this.isReloading || this.isShuttingDown) {
      console.log("🔄 Reload already scheduled or in progress");
      return;
    }
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
    setTimeout(() => {
      console.log("🔄 Executing reload...");
      window.location.reload();
    }, 800);
  }
  scheduleReconnect() {
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
  createNotificationContainer() {
    if (document.getElementById("hmr-notifications"))
      return;
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
  showNotification(message, type = "info") {
    this.createNotificationContainer();
    const container = document.getElementById("hmr-notifications");
    if (!container)
      return;
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
    container.innerHTML = "";
    const notification = document.createElement("div");
    const colors = {
      info: "#3b82f6",
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b"
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
    requestAnimationFrame(() => {
      notification.style.transform = "translateX(0)";
    });
    if (type !== "error" || message.includes("permanently disconnected")) {
      this.notificationTimeout = window.setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }, 4e3);
    }
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
//# sourceMappingURL=hmr-client.js.map
