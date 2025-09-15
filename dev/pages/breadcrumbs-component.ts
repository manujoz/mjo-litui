import type { MjoBreadcrumbsItems } from "../../src/types/mjo-breadcrumbs.js";

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

// import { FaFile, FaFolder, FaHome, FaUser } from "mjo-icons/fa";
import { LiaFile, LiaFolder, LiaHomeSolid, LiaUser } from "mjo-icons/lia";

import "../../src/mjo-breadcrumbs.js";
import "../../src/mjo-grid.js";

const basicItems: MjoBreadcrumbsItems = [
    {
        label: "Home",
        href: "#",
        icon: LiaHomeSolid,
    },
    {
        label: "Library",
        href: "#",
    },
    {
        active: true,
        label: "Data",
        icon: LiaFile,
    },
];

const deepNavigationItems: MjoBreadcrumbsItems = [
    { label: "Home", href: "#", icon: LiaHomeSolid },
    { label: "User Management", href: "#", icon: LiaUser },
    { label: "Projects", href: "#", icon: LiaFolder },
    { label: "Web Development", href: "#" },
    { label: "Frontend", href: "#" },
    { label: "React Components", href: "#" },
    { label: "UI Library", href: "#" },
    { label: "Breadcrumbs", active: true },
];

@customElement("breadcrumbs-component")
export class BreadcrumbsComponent extends LitElement {
    render() {
        return html`
            <div class="demo-container">
                <h2>Basic Breadcrumbs</h2>
                <mjo-breadcrumbs preventDefault .items=${basicItems} color="primary" variant="solid"></mjo-breadcrumbs>
                <mjo-breadcrumbs preventDefault .items=${basicItems} color="secondary"></mjo-breadcrumbs>

                <h2>Manual Collapse (max 3 items)</h2>
                <div class="narrow-container">
                    <mjo-breadcrumbs preventDefault .items=${deepNavigationItems}> </mjo-breadcrumbs>
                </div>

                <h2>Responsive Collapse (Container Queries)</h2>
                <div class="responsive-container">
                    <mjo-breadcrumbs preventDefault .items=${deepNavigationItems} color="secondary"> </mjo-breadcrumbs>
                </div>

                <h2>Auto Collapse</h2>
                <div class="auto-container">
                    <mjo-breadcrumbs preventDefault .items=${deepNavigationItems} variant="bordered"> </mjo-breadcrumbs>
                </div>

                <h2>Different Sizes</h2>
                <div class="size-demo">
                    <mjo-breadcrumbs preventDefault .items=${basicItems} size="small" variant="solid"></mjo-breadcrumbs>
                    <mjo-breadcrumbs preventDefault .items=${basicItems} size="medium" variant="solid"></mjo-breadcrumbs>
                    <mjo-breadcrumbs preventDefault .items=${basicItems} size="large" variant="solid"></mjo-breadcrumbs>
                </div>

                <h2>Test Responsive Behavior</h2>
                <p>Resize the containers below to see the collapse behavior:</p>

                <div class="resizable-demo">
                    <div class="resizable-container" style="width: 500px; resize: horizontal; overflow: auto;">
                        <mjo-breadcrumbs preventDefault .items=${deepNavigationItems} variant="bordered"> </mjo-breadcrumbs>
                    </div>
                </div>

                <div class="resizable-demo">
                    <div class="resizable-container" style="width: 300px; resize: horizontal; overflow: auto;">
                        <mjo-breadcrumbs preventDefault @mjo-breadcrumbs:navigate=${this.#handleNavigate} .items=${deepNavigationItems} color="secondary">
                        </mjo-breadcrumbs>
                    </div>
                </div>
            </div>
        `;
    }

    #handleNavigate(event: CustomEvent) {
        console.log(event);
    }

    static styles = [
        css`
            :host {
                display: block;
                padding: 20px;
                font-family: var(--mjo-font-family, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif);
            }

            .demo-container {
                max-width: 1200px;
                margin: 0 auto;
            }

            h2 {
                margin-top: 2rem;
                margin-bottom: 1rem;
                color: var(--mjo-foreground-color, #333);
                border-bottom: 2px solid var(--mjo-primary-color, #1aa8ed);
                padding-bottom: 0.5rem;
            }

            .narrow-container {
                width: 300px;
                padding: 1rem;
                border: 2px dashed var(--mjo-border-color, #ccc);
                border-radius: 8px;
                margin: 1rem 0;
            }

            .responsive-container {
                width: 400px;
                padding: 1rem;
                border: 2px dashed var(--mjo-secondary-color, #7dc717);
                border-radius: 8px;
                margin: 1rem 0;
                resize: horizontal;
                overflow: auto;
                min-width: 200px;
            }

            .auto-container {
                width: 250px;
                padding: 1rem;
                border: 2px dashed var(--mjo-primary-color, #1aa8ed);
                border-radius: 8px;
                margin: 1rem 0;
            }

            .size-demo {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding: 1rem;
                background: var(--mjo-background-color-card, #f9f9f9);
                border-radius: 8px;
                margin: 1rem 0;
            }

            .resizable-demo {
                margin: 1rem 0;
            }

            .resizable-container {
                padding: 1rem;
                border: 2px solid var(--mjo-border-color, #ccc);
                border-radius: 8px;
                background: var(--mjo-background-color-card, #f9f9f9);
                min-height: 60px;
                display: flex;
                align-items: center;
            }

            p {
                color: var(--mjo-foreground-color-medium, #666);
                font-style: italic;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "breadcrumbs-component": BreadcrumbsComponent;
    }
}
