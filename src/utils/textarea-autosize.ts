export class TextAreaAutoSize {
    private textarea: HTMLTextAreaElement;
    private rows: number;
    private maxHeight?: number;

    listeners = {
        input: () => {
            this.#autoSize();
        },
    };

    constructor(textarea: HTMLTextAreaElement, rows: number, maxHeight?: number) {
        this.textarea = textarea;
        this.rows = rows;
        this.maxHeight = maxHeight;

        this.textarea.style.maxHeight = `${this.maxHeight}px`;

        this.textarea.addEventListener("input", this.listeners.input);
    }

    destroy() {
        this.textarea.removeEventListener("input", this.listeners.input);
    }

    #autoSize() {
        if (!this.textarea) return;

        this.textarea.rows = this.rows;

        let offsetHeight = this.textarea?.offsetHeight || 0;
        let scrollHeight = this.textarea?.scrollHeight || 0;

        if (this.maxHeight && scrollHeight > this.maxHeight) {
            this.textarea.style.height = `${this.maxHeight}px`;
            return;
        }

        this.textarea.style.height = "";

        while (scrollHeight > offsetHeight && scrollHeight <= (this.maxHeight || 0)) {
            this.textarea.rows += 1;
            offsetHeight = this.textarea?.offsetHeight || 0;
            scrollHeight = this.textarea?.scrollHeight || 0;
        }
    }
}
