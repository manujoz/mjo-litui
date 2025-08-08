import type { Meta, StoryObj } from "@storybook/web-components";

import { themes } from "@storybook/theming";
import { html } from "lit";

import "../src/mjo-accordion";

const meta: Meta = {
    component: "mjo-accordion",
    parameters: {
        docs: {
            theme: themes.dark,
            source: {
                code: "",
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: "select" },
            options: ["light", "shadow", "bordered", "splitted"],
            defaultValue: "light",
            description: "Variant of the accordion.",
        },
        selectionMode: {
            control: { type: "select" },
            options: ["single", "multiple"],
            defaultValue: "single",
            description: "Sets the size of the alert.",
        },
        compact: {
            control: "boolean",
            defaultValue: false,
            description: "Set if alert is closable.",
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
        variant: "light",
        selectionMode: "single",
        compact: false,
    },
    render: (args) => html`
        <mjo-accordion variant=${args.variant} selectionMode=${args.selectionMode} ?compact=${args.compact}>
            <mjo-accordion-item itemTitle="Item 1">
                Lorem500 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Quisquam, voluptatibus Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam, voluptatibus
            </mjo-accordion-item>
            <mjo-accordion-item itemTitle="Item 2">
                Lorem500 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Quisquam, voluptatibus Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam, voluptatibus
            </mjo-accordion-item>
            <mjo-accordion-item itemTitle="Item 3">
                Lorem500 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Quisquam, voluptatibus Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam, voluptatibus
            </mjo-accordion-item>
        </mjo-accordion>
    `,
};
