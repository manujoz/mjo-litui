import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import "../../../src/mjo-button";

@customElement("drawer-content")
export class DrawerContent extends LitElement {
    render() {
        return html`
            <div class="content">
                Lorem impugnation is the act of making an assertion without any evidence or proof. It is often used in legal contexts to refer to a claim that
                is not supported by any evidence. In other words, it is a statement that is made without any basis in fact or reality. This can be seen as a
                form of deception or manipulation, as it seeks to persuade others to believe something that is not true.
                <br /><br />
                Impugnation can take many forms, including false accusations, misleading statements, and outright lies. It is important to be aware of this
                tactic and to be able to recognize when it is being used. This can help you to avoid being misled or manipulated by others.
                <br /><br />
                In conclusion, impugnation is a serious issue that can have significant consequences. It is important to be vigilant and to question the motives
                of those who make claims without any evidence or proof. By doing so, you can protect yourself from being misled or manipulated by others. Lorem
                impugnation is the act of making an assertion without any evidence or proof. It is often used in legal contexts to refer to a claim that is not
                supported by any evidence. In other words, it is a statement that is made without any basis in fact or reality. This can be seen as a form of
                deception or manipulation, as it seeks to persuade others to believe something that is not true.
                <br /><br />
                Impugnation can take many forms, including false accusations, misleading statements, and outright lies. It is important to be aware of this
                tactic and to be able to recognize when it is being used. This can help you to avoid being misled or manipulated by others.
                <br /><br />
                In conclusion, impugnation is a serious issue that can have significant consequences. It is important to be vigilant and to question the motives
                of those who make claims without any evidence or proof. By doing so, you can protect yourself from being misled or manipulated by others. Lorem
                impugnation is the act of making an assertion without any evidence or proof. It is often used in legal contexts to refer to a claim that is not
                supported by any evidence. In other words, it is a statement that is made without any basis in fact or reality. This can be seen as a form of
                deception or manipulation, as it seeks to persuade others to believe something that is not true.
                <br /><br />
                Impugnation can take many forms, including false accusations, misleading statements, and outright lies. It is important to be aware of this
                tactic and to be able to recognize when it is being used. This can help you to avoid being misled or manipulated by others.
                <br /><br />
                In conclusion, impugnation is a serious issue that can have significant consequences. It is important to be vigilant and to question the motives
                of those who make claims without any evidence or proof. By doing so, you can protect yourself from being misled or manipulated by others. Lorem
                impugnation is the act of making an assertion without any evidence or proof. It is often used in legal contexts to refer to a claim that is not
                supported by any evidence. In other words, it is a statement that is made without any basis in fact or reality. This can be seen as a form of
                deception or manipulation, as it seeks to persuade others to believe something that is not true.
                <br /><br />
                Impugnation can take many forms, including false accusations, misleading statements, and outright lies. It is important to be aware of this
                tactic and to be able to recognize when it is being used. This can help you to avoid being misled or manipulated by others.
                <br /><br />
                In conclusion, impugnation is a serious issue that can have significant consequences. It is important to be vigilant and to question the motives
                of those who make claims without any evidence or proof. By doing so, you can protect yourself from being misled or manipulated by others.
            </div>
            <div class="footer">
                <mjo-button @click=${this.handleClick} fullwidth color="primary">CLOSE</mjo-button>
            </div>
        `;
    }

    handleClick() {
        this.dispatchEvent(new CustomEvent("close-drawer", { bubbles: true, composed: true }));
    }

    static styles = [
        css`
            :host {
                display: flex;
                flex-direction: column;
                flex: 1 1 0;

                --mjo-button-border-radius: 0;
            }
            .content {
                position: relative;
                flex: 1 1 0;
                padding: var(--mjo-space-small);
                overflow-y: auto;
            }
            .footer {
                position: relative;
                flex: 0 1 auto;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "drawer-content": DrawerContent;
    }
}
