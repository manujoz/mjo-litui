import { MjoGrid } from "../mjo-grid.js";

declare global {
    interface HTMLElementTagNameMap {
        "mjo-grid": MjoGrid;
    }
}

export { MjoGrid };
