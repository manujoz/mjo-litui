import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-button.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-progress.js";

@customElement("progress-component")
export class ProgressComponent extends LitElement {
    @state() private progressValue = 25;
    @state() private isIndeterminate = false;

    render() {
        return html`
            <div class="demo-container">
                <h2>Progress Bar Examples</h2>

                <div class="section">
                    <h3>Bar Variant - Different Colors</h3>
                    <mjo-grid columns="1" gap="20px">
                        <mjo-progress variant="bar" color="primary" value=${this.progressValue} max="100" label="Primary Progress" showValue></mjo-progress>

                        <mjo-progress variant="bar" color="secondary" value=${this.progressValue} max="100" label="Secondary" showValue></mjo-progress>

                        <mjo-progress variant="bar" color="success" value=${this.progressValue} max="100" label="Success" showValue></mjo-progress>

                        <mjo-progress variant="bar" color="warning" value=${this.progressValue} max="100" label="Warning" showValue></mjo-progress>

                        <mjo-progress variant="bar" color="error" value=${this.progressValue} max="100" label="Error" showValue></mjo-progress>

                        <mjo-progress variant="bar" color="info" value=${this.progressValue} max="100" label="Info" showValue></mjo-progress>
                    </mjo-grid>
                </div>

                <div class="section">
                    <h3>Bar Variant - Different Sizes</h3>
                    <mjo-grid columns="1" gap="20px">
                        <mjo-progress variant="bar" size="small" color="primary" value=${this.progressValue} max="100" label="Small" showValue></mjo-progress>

                        <mjo-progress variant="bar" size="medium" color="primary" value=${this.progressValue} max="100" label="Medium" showValue></mjo-progress>

                        <mjo-progress variant="bar" size="large" color="primary" value=${this.progressValue} max="100" label="Large" showValue></mjo-progress>
                    </mjo-grid>
                </div>

                <div class="section">
                    <h3>Circle Variant - Different Colors</h3>
                    <mjo-grid columns="3" gap="30px">
                        <mjo-progress variant="circle" color="primary" value=${this.progressValue} max="100" label="Primary" showValue></mjo-progress>

                        <mjo-progress variant="circle" color="secondary" value=${this.progressValue} max="100" label="Secondary" showValue></mjo-progress>

                        <mjo-progress variant="circle" color="success" value=${this.progressValue} max="100" label="Success" showValue></mjo-progress>
                    </mjo-grid>
                </div>

                <div class="section">
                    <h3>Circle Variant - Different Sizes</h3>
                    <mjo-grid columns="3" gap="30px">
                        <mjo-progress variant="circle" size="small" color="info" value=${this.progressValue} max="100" label="Small" showValue></mjo-progress>

                        <mjo-progress variant="circle" size="medium" color="info" value=${this.progressValue} max="100" label="Medium" showValue></mjo-progress>

                        <mjo-progress variant="circle" size="large" color="info" value=${this.progressValue} max="100" label="Large" showValue></mjo-progress>
                    </mjo-grid>
                </div>

                <div class="section">
                    <h3>Indeterminate Progress</h3>
                    <mjo-grid columns="2" gap="30px">
                        <mjo-progress variant="bar" color="primary" ?indeterminate=${this.isIndeterminate} label="Indeterminate Bar"></mjo-progress>

                        <mjo-progress variant="circle" color="primary" ?indeterminate=${this.isIndeterminate} label="Indeterminate Circle"></mjo-progress>
                    </mjo-grid>
                </div>

                <div class="controls">
                    <h3>Controls</h3>
                    <div class="control-buttons">
                        <mjo-button @click=${this.decreaseProgress}>Decrease (-10)</mjo-button>
                        <mjo-button @click=${this.increaseProgress}>Increase (+10)</mjo-button>
                        <mjo-button @click=${this.toggleIndeterminate}> ${this.isIndeterminate ? "Stop" : "Start"} Indeterminate </mjo-button>
                        <mjo-button @click=${this.resetProgress}>Reset</mjo-button>
                    </div>
                    <p>Current Value: ${this.progressValue}%</p>
                </div>
            </div>
        `;
    }

    private increaseProgress() {
        this.progressValue = Math.min(100, this.progressValue + 10);
    }

    private decreaseProgress() {
        this.progressValue = Math.max(0, this.progressValue - 10);
    }

    private toggleIndeterminate() {
        this.isIndeterminate = !this.isIndeterminate;
    }

    private resetProgress() {
        this.progressValue = 0;
        this.isIndeterminate = false;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.addEventListener("mjo-progress:change", this.handleProgressChange as EventListener);
        this.addEventListener("mjo-progress:complete", this.handleProgressComplete as EventListener);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.removeEventListener("mjo-progress:change", this.handleProgressChange as EventListener);
        this.removeEventListener("mjo-progress:complete", this.handleProgressComplete as EventListener);
    }

    private handleProgressChange = (event: Event) => {
        const customEvent = event as CustomEvent;
        console.log("Progress changed:", customEvent.detail);
    };

    private handleProgressComplete = (event: Event) => {
        const customEvent = event as CustomEvent;
        console.log("Progress completed!", customEvent.detail);
    };

    static styles = [
        css`
            :host {
                display: block;
                padding: 30px;
                max-width: 1200px;
                margin: 0 auto;
            }

            .demo-container {
                display: flex;
                flex-direction: column;
                gap: 40px;
            }

            .section {
                display: flex;
                flex-direction: column;
                gap: 20px;
                padding: 20px;
                border: 1px solid var(--mjo-border-color, #e0e0e0);
                border-radius: 8px;
                background-color: var(--mjo-background-color-card, #ffffff);
            }

            h2 {
                text-align: center;
                color: var(--mjo-foreground-color-low, #333);
                margin: 0;
            }

            h3 {
                margin: 0;
                color: var(--mjo-foreground-color-low, #333);
                font-size: 1.2em;
                border-bottom: 2px solid var(--mjo-border-color, #4e9be4);
                padding-bottom: 8px;
            }

            .controls {
                display: flex;
                flex-direction: column;
                gap: 15px;
                padding: 20px;
                border: 2px solid var(--mjo-primary-color, #4e9be4);
                border-radius: 8px;
                background-color: var(--mjo-background-color-card, #ffffff);
            }

            .control-buttons {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }

            .control-buttons mjo-button {
                flex: 1;
                min-width: 120px;
            }

            p {
                margin: 0;
                font-weight: bold;
                color: var(--mjo-text-color, #333);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "progress-component": ProgressComponent;
    }
}
