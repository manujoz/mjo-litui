/**
 * Cliente HMR mejorado para evitar bucles infinitos
 * Versión 3.0 - Control de estado avanzado y reconexión inteligente
 */
class MjoHMRClient {
    constructor() {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 3; // Reducido para evitar spam
        this.reconnectDelay = 2000; // 2 segundos base
        this.isConnected = false;
        this.isReloading = false;
        this.buildInProgress = false;
        this.lastBuildCompleteTime = 0;
        this.reloadCooldown = 3000; // 3 segundos de cooldown entre reloads

        // Estados para prevenir bucles
        this.isShuttingDown = false;
        this.hasReloadScheduled = false;

        // Evitar múltiples instancias
        if (window.mjoHMRClient) {
            console.log("🔥 Cliente HMR ya existe, reutilizando instancia");
            return window.mjoHMRClient;
        }

        window.mjoHMRClient = this;
        this.init();
    }

    init() {
        console.log("🔥 Iniciando cliente HMR v3.0...");

        // Marcar como inicializado para evitar múltiples instancias
        if (window.mjHMRInitialized) {
            console.log("🔥 HMR ya inicializado, saliendo...");
            return;
        }
        window.mjHMRInitialized = true;

        this.setupCleanupListeners();
        this.connect();
    }

    setupCleanupListeners() {
        // Cleanup al cerrar/recargar la ventana
        window.addEventListener("beforeunload", () => {
            console.log("🔄 Página cerrándose, limpiando HMR...");
            this.isShuttingDown = true;
            this.cleanup();
        });

        window.addEventListener("unload", () => {
            this.isShuttingDown = true;
            this.cleanup();
        });

        // Cleanup cuando la página se oculta (cambio de tab, etc.)
        document.addEventListener("visibilitychange", () => {
            if (document.hidden && this.isReloading) {
                console.log("🔄 Página oculta durante reload, limpiando...");
                this.cleanup();
            }
        });
    }

    cleanup() {
        console.log("🧹 Limpiando cliente HMR...");

        if (this.ws) {
            try {
                this.ws.close(1000, "Cleanup");
            } catch (error) {
                console.log("⚠️ Error cerrando WebSocket:", error);
            }
            this.ws = null;
        }

        this.isConnected = false;
    }

    connect() {
        // No conectar si estamos cerrando o ya hay reload programado
        if (this.isShuttingDown || this.isReloading || this.hasReloadScheduled) {
            console.log("🔥 Conexión HMR saltada: estado no válido");
            return;
        }

        if (this.isConnected) {
            console.log("🔥 Ya conectado a HMR");
            return;
        }

        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${protocol}//${window.location.host}/hmr`;

        console.log("🔌 Conectando a WebSocket HMR:", wsUrl);

        try {
            this.ws = new WebSocket(wsUrl);
            this.setupEventListeners();
        } catch (error) {
            console.error("❌ Error creando WebSocket:", error);
            this.scheduleReconnect();
        }
    }

    setupEventListeners() {
        this.ws.onopen = () => {
            console.log("✅ Cliente HMR conectado");
            this.isConnected = true;
            this.reconnectAttempts = 0;
            this.showNotification("🔥 HMR conectado", "success");
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.handleHMREvent(data);
            } catch (error) {
                console.error("❌ Error parsing mensaje HMR:", error);
            }
        };

        this.ws.onclose = (event) => {
            console.log("❌ Conexión WebSocket HMR cerrada:", event.code, event.reason);
            this.isConnected = false;

            // Solo reconectar si no estamos recargando intencionalmente
            if (!this.isReloading && this.reconnectAttempts < this.maxReconnectAttempts) {
                this.scheduleReconnect();
            }
        };

        this.ws.onerror = (error) => {
            console.error("⚠️ Error en WebSocket HMR:", error);
            this.isConnected = false;
        };
    }

    handleHMREvent(event) {
        console.log("📡 Evento HMR recibido:", event.type, event.data);

        // Evitar procesar eventos si ya estamos recargando o cerrando
        if (this.isReloading || this.isShuttingDown || this.hasReloadScheduled) {
            console.log("🔄 Ignorando evento HMR: estado no válido");
            return;
        }

        switch (event.type) {
            case "build-start":
                this.buildInProgress = true;
                this.showNotification("🔨 Compilando...", "info");
                break;

            case "build-complete":
                this.buildInProgress = false;
                this.lastBuildCompleteTime = Date.now();
                this.showNotification("✅ Compilación completada", "success");
                // Programar reload con mejor control
                this.scheduleReload();
                break;

            case "build-error":
                this.buildInProgress = false;
                this.showNotification(`❌ Error: ${event.data?.error || "Error desconocido"}`, "error");
                // NO recargar en caso de error
                break;

            case "file-changed":
                if (!this.buildInProgress) {
                    const files = event.data?.files || [];
                    this.showNotification(`📝 Archivos modificados: ${files.length}`, "info");
                }
                break;

            case "reload":
                this.scheduleReload();
                break;

            default:
                console.log("🤷‍♂️ Evento HMR no manejado:", event.type);
        }
    }

    scheduleReload() {
        if (this.hasReloadScheduled || this.isReloading || this.isShuttingDown) {
            console.log("🔄 Reload ya programado o en proceso");
            return;
        }

        // Verificar cooldown
        const timeSinceLastBuild = Date.now() - this.lastBuildCompleteTime;
        if (timeSinceLastBuild > 0 && timeSinceLastBuild < this.reloadCooldown) {
            console.log(`⏳ Reload en cooldown, esperando ${this.reloadCooldown - timeSinceLastBuild}ms más`);
            setTimeout(() => this.scheduleReload(), this.reloadCooldown - timeSinceLastBuild);
            return;
        }

        console.log("🔄 Programando reload de la página...");
        this.hasReloadScheduled = true;
        this.isReloading = true;
        this.cleanup();

        this.showNotification("🔄 Recargando página...", "info");

        // Delay para mostrar notificación y limpiar conexiones
        setTimeout(() => {
            console.log("🔄 Ejecutando reload...");
            window.location.reload();
        }, 800);
    }

    reloadPage() {
        if (this.isReloading) {
            console.log("🔄 Reload ya en progreso, ignorando");
            return;
        }

        this.isReloading = true;
        this.isConnected = false; // Marcar como desconectado para evitar reconexiones

        console.log("🔄 Recargando página...");
        this.showNotification("🔄 Recargando...", "info");

        // Cerrar WebSocket limpiamente antes del reload
        if (this.ws) {
            this.ws.close(1000, "Page reloading");
            this.ws = null;
        }

        // Delay antes del reload para mostrar la notificación
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    scheduleReconnect() {
        if (this.isReloading || this.reconnectAttempts >= this.maxReconnectAttempts) {
            if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                console.log("❌ Máximo de intentos de reconexión alcanzado");
                this.showNotification("❌ HMR desconectado permanentemente", "error");
            }
            return;
        }

        this.reconnectAttempts++;
        const delay = this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1);

        console.log(`🔄 Reintentando conexión en ${delay}ms (intento ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

        setTimeout(() => {
            if (!this.isReloading && !this.isConnected) {
                this.connect();
            }
        }, delay);
    }

    createNotificationContainer() {
        // Crear contenedor de notificaciones si no existe
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

    showNotification(message, type = "info") {
        const container = document.getElementById("hmr-notifications");
        if (!container) return;

        // Limpiar notificación anterior
        if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
        }
        container.innerHTML = "";

        const notification = document.createElement("div");

        const colors = {
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

        // Animar entrada
        requestAnimationFrame(() => {
            notification.style.transform = "translateX(0)";
        });

        // Auto-hide después de 4 segundos (excepto errores permanentes)
        if (type !== "error" || message.includes("desconectado permanentemente")) {
            this.notificationTimeout = setTimeout(() => {
                notification.style.transform = "translateX(100%)";
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 4000);
        }

        // Click para cerrar
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

// Solo inicializar una vez cuando el DOM esté listo
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
