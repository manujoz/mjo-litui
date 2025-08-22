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
    this.reloadCooldown = 500;
    this.isShuttingDown = false;
    this.hasReloadScheduled = false;
    if (window.mjoHMRClient) {
      return window.mjoHMRClient;
    }
    window.mjoHMRClient = this;
    this.init();
  }
  init() {
    if (window.mjHMRInitialized) {
      return;
    }
    window.mjHMRInitialized = true;
    this.setupCleanupListeners();
    this.connect();
  }
  setupCleanupListeners() {
    window.addEventListener("beforeunload", () => {
      this.isShuttingDown = true;
      this.cleanup();
    });
    window.addEventListener("unload", () => {
      this.isShuttingDown = true;
      this.cleanup();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.isReloading) {
        this.cleanup();
      }
    });
  }
  cleanup() {
    if (this.ws) {
      try {
        this.ws.close(1e3, "Cleanup");
      } catch (error) {
        console.warn("⚠️ Error closing WebSocket:", error);
      }
      this.ws = null;
    }
    this.isConnected = false;
  }
  connect() {
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
  setupEventListeners() {
    if (!this.ws)
      return;
    this.ws.onopen = () => {
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
        console.warn("🤷‍♂️ Unhandled HMR event:", event.type);
    }
  }
  scheduleReload() {
    if (this.hasReloadScheduled || this.isReloading || this.isShuttingDown) {
      return;
    }
    const timeSinceLastBuild = Date.now() - this.lastBuildCompleteTime;
    if (timeSinceLastBuild > 0 && timeSinceLastBuild < this.reloadCooldown) {
      setTimeout(() => this.scheduleReload(), this.reloadCooldown - timeSinceLastBuild);
      return;
    }
    this.hasReloadScheduled = true;
    this.isReloading = true;
    this.cleanup();
    this.showNotification("🔄 Reloading page...", "info");
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
  scheduleReconnect() {
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
