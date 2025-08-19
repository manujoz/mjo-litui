import { Server as HTTPServer } from "http";
import { WebSocket, WebSocketServer } from "ws";

export interface HMREvent {
    type: "reload" | "build-start" | "build-complete" | "build-error" | "file-changed";
    data?: {
        files?: string[];
        message?: string;
        error?: string;
    };
}

export class HMRWebSocketManager {
    private wss: WebSocketServer | null = null;
    private clients: Set<WebSocket> = new Set();
    private verbose: boolean;

    constructor(options: { verbose?: boolean } = {}) {
        this.verbose = options.verbose ?? false; // Cambiar default a false para reducir logs
    }

    /**
     * Inicializar el servidor WebSocket
     */
    public initialize(server: HTTPServer): Promise<void> {
        return new Promise<void>((resolve) => {
            this.wss = new WebSocketServer({ server, path: "/hmr" });

            this.wss.on("connection", (ws: WebSocket) => {
                this.clients.add(ws);
                if (this.verbose) {
                    console.log("🔌 Cliente HMR conectado. Total:", this.clients.size);
                }

                ws.on("close", () => {
                    this.clients.delete(ws);
                    if (this.verbose) {
                        console.log("❌ Cliente HMR desconectado. Total:", this.clients.size);
                    }
                });

                ws.on("error", (error) => {
                    console.error("⚠️ Error en WebSocket HMR:", error);
                    this.clients.delete(ws);
                });

                // Nota: No enviamos mensaje de bienvenida para evitar reloads innecesarios
                // El cliente detecta la conexión exitosa mediante el evento 'onopen'
                resolve();
            });

            if (this.verbose) {
                console.log("🔌 Servidor WebSocket HMR iniciado en /hmr");
            }
        });
    }

    /**
     * Enviar evento a todos los clientes conectados
     */
    public broadcast(event: HMREvent): void {
        if (this.clients.size === 0) {
            if (this.verbose) {
                console.log("📡 Sin clientes HMR conectados para broadcast");
            }
            return;
        }

        const message = JSON.stringify(event);
        let sentCount = 0;

        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
                sentCount++;
            } else {
                // Limpiar clientes desconectados
                this.clients.delete(client);
            }
        });

        if (this.verbose) {
            console.log(`📡 Evento HMR enviado a ${sentCount} clientes:`, event.type);
        }
    }

    /**
     * Notificar inicio de build
     */
    public notifyBuildStart(files: string[]): void {
        this.broadcast({
            type: "build-start",
            data: { files, message: "Compilando archivos..." },
        });
    }

    /**
     * Notificar build completado exitosamente
     */
    public notifyBuildComplete(): void {
        this.broadcast({
            type: "build-complete",
            data: { message: "Compilación completada" },
        });
    }

    /**
     * Notificar error en build
     */
    public notifyBuildError(error: string): void {
        this.broadcast({
            type: "build-error",
            data: { error, message: "Error en compilación" },
        });
    }

    /**
     * Notificar cambios de archivos (sin build)
     */
    public notifyFileChanged(files: string[]): void {
        this.broadcast({
            type: "file-changed",
            data: { files, message: "Archivos modificados" },
        });
    }

    /**
     * Forzar reload completo de página
     */
    public forceReload(): void {
        this.broadcast({
            type: "reload",
            data: { message: "Recargando página..." },
        });
    }

    /**
     * Obtener estadísticas del manager
     */
    public getStats(): { connectedClients: number; isActive: boolean } {
        return {
            connectedClients: this.clients.size,
            isActive: this.wss !== null,
        };
    }

    /**
     * Cerrar el servidor WebSocket
     */
    public close(): void {
        if (this.wss) {
            this.clients.forEach((client) => {
                client.close();
            });
            this.clients.clear();
            this.wss.close();
            this.wss = null;
            if (this.verbose) {
                console.log("🔌 Servidor WebSocket HMR cerrado");
            }
        }
    }
}
