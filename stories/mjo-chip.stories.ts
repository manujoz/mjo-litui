import type { Meta, StoryObj } from "@storybook/web-components";

import { themes } from "@storybook/theming";
import { html } from "lit";

import "../src/mjo-chip";

const meta: Meta = {
    component: "mjo-chip",
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
            options: ["default", "primary", "secondary", "default", "success", "warning", "error", "info"],
            defaultValue: "primary",
            description: "Sets the color of the chip.",
        },
        closable: {
            control: "boolean",
            defaultValue: false,
            description: "Sets the closable state of the chip.",
        },
        disabled: {
            control: "boolean",
            defaultValue: false,
            description: "Disabled style for the chip.",
        },
        endIcon: {
            control: { type: "text" },
            defaultValue: "",
            description: "End icon for the chip.",
        },
        label: {
            control: { type: "text" },
            defaultValue: "Chip",
            description: "Label for the chip.",
        },
        radius: {
            control: { type: "select" },
            options: ["full", "small", "medium", "large", "none"],
            defaultValue: "full",
            description: "Sets the radius of the chip.",
        },
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"],
            defaultValue: "medium",
            description: "Sets the size of the chip.",
        },
        startIcon: {
            control: { type: "text" },
            defaultValue: "",
            description: "Start icon for the chip.",
        },
        value: {
            control: { type: "text" },
            defaultValue: "",
            description: "Value of the chip.",
        },
        variant: {
            control: { type: "select" },
            options: ["solid", "bordered", "light", "flat", "faded", "shadow", "dot"],
            defaultValue: "solid",
            description: "Sets the variant of the chip.",
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
        closable: false,
        disabled: false,
        endIcon: undefined,
        label: "Checkbox",
        radius: "full",
        size: "medium",
        startIcon: undefined,
        value: "",
        variant: "solid",
    },
    render: (args) =>
        html`<center>
            <mjo-chip
                color=${args.color}
                ?closable=${args.closable}
                ?disabled=${args.disabled}
                endIcon=${args.endIcon}
                label=${args.label}
                radius=${args.radius}
                size=${args.size}
                startIcon=${args.startIcon}
                value=${args.value}
                variant=${args.variant}
            ></mjo-chip>
        </center>`,
};
