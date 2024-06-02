import type { Meta, StoryObj } from "@storybook/web-components";

import { themes } from "@storybook/theming";
import { html } from "lit";

import "../src/mjo-button";

const meta: Meta = {
    component: "mjo-button",
    parameters: {
        docs: {
            theme: themes.dark,
            source: {
                code: "",
            },
        },
    },
    argTypes: {
        color: {
            control: { type: "select" },
            options: ["primary", "secondary"],
            defaultValue: "primary",
            description: "Sets the color of the button.",
        },
        disabled: {
            control: "boolean",
            defaultValue: false,
            description: "Disabled style for the button.",
        },
        endIcon: {
            control: { type: "text" },
            defaultValue: "",
            description: "Icon at the end of the button.",
        },
        fullwidth: {
            control: "boolean",
            defaultValue: false,
            description: "Set fullwidth for the button.",
        },
        loading: {
            control: "boolean",
            defaultValue: false,
            description: "Show loading spinner in the button.",
        },
        noink: {
            control: "boolean",
            defaultValue: false,
            description: "Disable ink ripple effect.",
        },
        rounded: {
            control: "boolean",
            defaultValue: false,
            description: "Set rounded corners for the button.",
        },
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"],
            defaultValue: "medium",
            description: "Sets the size of the button.",
        },
        startIcon: {
            control: { type: "text" },
            defaultValue: "",
            description: "Icon at the start of the button.",
        },
        toggleable: {
            control: "boolean",
            defaultValue: false,
            description: "Toggleable button.",
        },
        variant: {
            control: { type: "select" },
            options: ["default", "ghost", "dashed", "link", "text"],
            defaultValue: "default",
            description: "Button variant.",
        },
        type: {
            control: { type: "select" },
            options: ["button", "submit", "reset"],
            defaultValue: "button",
            description: "Button type.",
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
        color: "primary",
        disabled: false,
        endIcon: "",
        fullwidth: false,
        loading: false,
        noink: false,
        rounded: false,
        size: "medium",
        startIcon: "",
        toggleable: false,
        variant: "default",
        type: "button",
    },
    render: (args) =>
        html`<center>
            <mjo-button
                color=${args.color}
                ?disabled=${args.disabled}
                endIcon=${args.endIcon}
                ?fullwidth=${args.fullwidth}
                ?loading=${args.loading}
                ?noink=${args.noink}
                ?rounded=${args.rounded}
                size=${args.size}
                startIcon=${args.startIcon}
                ?toggleable=${args.toggleable}
                variant=${args.variant}
                type=${args.type}
                >CLICK ME</mjo-button
            >
        </center>`,
};
