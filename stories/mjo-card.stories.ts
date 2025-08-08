import type { Meta, StoryObj } from "@storybook/web-components";

import { themes } from "@storybook/theming";
import { html } from "lit";

import "../src/mjo-card";

const meta: Meta = {
    component: "mjo-card",
    parameters: {
        docs: {
            theme: themes.dark,
            source: {
                code: "",
            },
        },
    },
    argTypes: {
        contrast: {
            control: { type: "select" },
            options: ["low", "high", "normal"],
            defaultValue: undefined,
            description: "Variant of the accordion.",
        },
        radius: {
            control: { type: "select" },
            options: ["none", "small", "medium", "large"],
            defaultValue: "medium",
            description: "Sets the size of the alert.",
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
        contrast: undefined,
        radius: "medium",
    },
    render: (args) => html`<mjo-card contrast=${args.contrast} radius=${args.radius}> adsadsad </mjo-card>`,
};
