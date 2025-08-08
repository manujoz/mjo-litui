/* eslint-disable no-console */
import type { MjoDrawer } from "../../../src/mjo-drawer";

import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import "../../../src/mjo-drawer";
import "./drawer-content";

@customElement("drawer-storybook")
export class DrawerStorybook extends LitElement {
    @property({ type: Boolean }) blocked = false;
    @property({ type: String }) position: "left" | "right" | "top" | "bottom" = "right";
    @property({ type: Number }) width: number | undefined;
    @property({ type: Number }) height: number | undefined;
    @property({ type: Number }) animationDuration: number | undefined;

    @query("mjo-drawer") drawer!: MjoDrawer;

    render() {
        return html`
            <mjo-drawer></mjo-drawer>
            <mjo-button @click=${this.openDrawer}>OPEN DRAWER</mjo-button>
        `;
    }

    openDrawer() {
        this.drawer.controller.show({
            content: html`<drawer-content @close-drawer=${this.closeDrawer.bind(this)}></drawer-content>`,
            title: "Drawer Title",
            animationDuration: this.animationDuration,
            blocked: this.blocked,
            height: this.height,
            width: this.width || 700,
            position: this.position,
            onClose: () => {
                this.dispatchEvent(new CustomEvent("closed", { bubbles: true, composed: true }));
            },
            onOpen: () => {
                this.dispatchEvent(new CustomEvent("opened", { bubbles: true, composed: true }));
            },
        });
    }

    closeDrawer() {
        this.drawer.controller.close();
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            .drawer {
                padding: 20px;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "drawer-storybook": DrawerStorybook;
    }
}
