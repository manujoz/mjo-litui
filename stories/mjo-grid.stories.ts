import type { Meta, StoryObj } from "@storybook/web-components";

import { themes } from "@storybook/theming";
import { html } from "lit";

import "../src/mjo-grid";

const meta: Meta = {
    component: "mjo-grid",
    parameters: {
        docs: {
            theme: themes.dark,
            source: {
                code: "",
            },
        },
    },
    argTypes: {
        mode: {
            control: { type: "select" },
            options: ["columns", "fill", "fit"],
            defaultValue: "columns",
            description: "Grid mode for columns handle.",
        },
        columns: {
            control: { type: "number" },
            defaultValue: "4",
            description: "Grid columns.",
        },
        gap: {
            control: { type: "text" },
            defaultValue: "1em",
            description: "Set gap for the grid.",
        },
        minWidthRow: {
            control: { type: "text" },
            description: "Min column width.",
        },
        maxWidthRow: {
            control: { type: "text" },
            defaultValue: "1fr",
            description: "Maax column width.",
        },
        flow: {
            control: { type: "select" },
            options: ["initial", "row", "column", "row", "dense", "revert", "revert-layer"],
            defaultValue: "initial",
            description: "Grid auto flow value.",
        },
        autoRows: {
            control: { type: "text" },
            defaultValue: "auto",
            description: "Grid auto row value.",
        },
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    parameters: {
        docs: {
            theme: themes.dark,
        },
    },
    args: {
        gap: "1rem",
        columns: "4",
        mode: "columns",
        minWidthRow: "100px",
        maxWidthRow: "1fr",
        flow: "initial",
        autoRows: "auto",
    },
    render: (args) =>
        html`<div class="storyContainer">
            <mjo-grid
                gap=${args.gap}
                columns=${args.columns}
                mode=${args.mode}
                minWidthRow=${args.minWidthRow}
                maxWidthRow=${args.maxWidthRow}
                flow=${args.flow}
                autoRows=${args.autoRows}
            >
                <div style="background-color: #444444; padding: 1rem; aspect-ratio: 2/1;">Item 1</div>
                <div style="background-color: #444444; padding: 1rem; aspect-ratio: 2/1;">Item 2</div>
                <div style="background-color: #444444; padding: 1rem; aspect-ratio: 2/1;">Item 3</div>
                <div style="background-color: #444444; padding: 1rem; aspect-ratio: 2/1;">Item 4</div>
                <div style="background-color: #444444; padding: 1rem; aspect-ratio: 2/1;">Item 5</div>
                <div style="background-color: #444444; padding: 1rem; aspect-ratio: 2/1;">Item 6</div>
                <div style="background-color: #444444; padding: 1rem; aspect-ratio: 2/1;">Item 7</div>
                <div style="background-color: #444444; padding: 1rem; aspect-ratio: 2/1;">Item 8</div>
                <div style="background-color: #444444; padding: 1rem; aspect-ratio: 2/1;">Item 9</div>
                <div style="background-color: #444444; padding: 1rem; aspect-ratio: 2/1;">Item 10</div>
                <div style="background-color: #444444; padding: 1rem; aspect-ratio: 2/1;">Item 11</div>
                <div style="background-color: #444444; padding: 1rem; aspect-ratio: 2/1;">Item 12</div>
            </mjo-grid>
        </div>`,
};
