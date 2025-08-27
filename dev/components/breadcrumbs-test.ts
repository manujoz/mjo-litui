import type { MjoBreadcrumbsItems } from "../../src/types/mjo-breadcrumbs.js";

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import { FaHome } from "mjo-icons/fa";

import "../../src/mjo-breadcrumbs.js";
import "../../src/mjo-grid.js";

const items: MjoBreadcrumbsItems = [
    {
        label: "Home",
        href: "#",
        icon: FaHome,
    },
    {
        label: "Library",
        href: "#",
    },
    {
        active: true,
        label: "Data",
        icon: FaHome,
    },
];

@customElement("breadcrumbs-test")
export class BreadcrumbsTest extends LitElement {
    render() {
        return html`<mjo-breadcrumbs .items=${items} color="secondary" size="small"></mjo-breadcrumbs>`;
    }

    static styles = [
        css`
            :host {
                display: block;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "breadcrumbs-test": BreadcrumbsTest;
    }
}
