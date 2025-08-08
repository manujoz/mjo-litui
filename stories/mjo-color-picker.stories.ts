import type { Meta, StoryObj } from "@storybook/web-components";

import { themes } from "@storybook/theming";
import { html } from "lit";

import "../src/mjo-color-picker";

const meta: Meta = {
    component: "mjo-color-picker",
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
            description: "Sets the color of the checkbox.",
        },
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"],
            defaultValue: "medium",
            description: "Sets the color of the checkbox.",
        },
        label: {
            control: { type: "text" },
            defaultValue: "Checkbox",
            description: "Label for the checkbox.",
        },
        helperText: {
            control: { type: "text" },
            defaultValue: "Helper text",
            description: "Helper text for the checkbox.",
        },
        value: {
            control: { type: "text" },
            defaultValue: "",
            description: "Value of the checkbox.",
        },
        rounded: {
            control: "boolean",
            defaultValue: false,
            description: "Hide error messages.",
        },
        disabled: {
            control: "boolean",
            defaultValue: false,
            description: "Disabled style for the checkbox.",
        },
        hideErrors: {
            control: "boolean",
            defaultValue: false,
            description: "Hide error messages.",
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
        size: "medium",
        label: "Select Color",
        helperText: "Helper text",
        value: "",
        rounded: false,
        disabled: false,
        hideErrors: false,
    },
    render: (args) =>
        html`<center>
            <mjo-color-picker
                style="width: 300px"
                color=${args.color}
                size=${args.size}
                label=${args.label}
                helperText=${args.helperText}
                value=${args.value}
                ?rounded=${args.rounded}
                ?disabled=${args.disabled}
                ?hideErrors=${args.hideErrors}
            ></mjo-color-picker>
        </center>`,
};
