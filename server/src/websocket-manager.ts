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
        this.verbose = options.verbose ?? false; // Change default to false to reduce logs
    }

    /**
     * Initialize the WebSocket server
     */
    public initialize(server: HTTPServer): Promise<void> {
        return new Promise<void>((resolve) => {
            this.wss = new WebSocketServer({ server, path: "/hmr" });

            this.wss.on("connection", (ws: WebSocket) => {
                this.clients.add(ws);
                if (this.verbose) {
                    console.log("🔌 HMR client connected. Total:", this.clients.size);
                }

                ws.on("close", () => {
                    this.clients.delete(ws);
                    if (this.verbose) {
                        console.log("❌ HMR client disconnected. Total:", this.clients.size);
                    }
                });

                ws.on("error", (error) => {
                    console.error("⚠️ WebSocket HMR error:", error);
                    this.clients.delete(ws);
                });

                // Note: No welcome message is sent to avoid unnecessary reloads
                // The client detects successful connection via the 'onopen' event
                resolve();
            });

            if (this.verbose) {
                console.log("🔌 HMR WebSocket server started at /hmr");
            }
        });
    }

    /**
     * Send event to all connected clients
     */
    public broadcast(event: HMREvent): void {
        if (this.clients.size === 0) {
            if (this.verbose) {
                console.log("📡 No HMR clients connected for broadcast");
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
                // Clean up disconnected clients
                this.clients.delete(client);
            }
        });

        if (this.verbose) {
            console.log(`📡 HMR event sent to ${sentCount} clients:`, event.type);
        }
    }

    /**
     * Notify build start
     */
    public notifyBuildStart(files: string[]): void {
        this.broadcast({
            type: "build-start",
            data: { files, message: "Building files..." },
        });
    }

    /**
     * Notify build completed successfully
     */
    public notifyBuildComplete(): void {
        this.broadcast({
            type: "build-complete",
            data: { message: "Build completed" },
        });
    }

    /**
     * Notify build error
     */
    public notifyBuildError(error: string): void {
        this.broadcast({
            type: "build-error",
            data: { error, message: "Build error" },
        });
    }

    /**
     * Notify file changes (without build)
     */
    public notifyFileChanged(files: string[]): void {
        this.broadcast({
            type: "file-changed",
            data: { files, message: "Files changed" },
        });
    }

    /**
     * Force full page reload
     */
    public forceReload(): void {
        this.broadcast({
            type: "reload",
            data: { message: "Reloading page..." },
        });
    }

    /**
     * Get manager statistics
     */
    public getStats(): { connectedClients: number; isActive: boolean } {
        return {
            connectedClients: this.clients.size,
            isActive: this.wss !== null,
        };
    }

    /**
     * Close the WebSocket server
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
                console.log("🔌 HMR WebSocket server closed");
            }
        }
    }
}
