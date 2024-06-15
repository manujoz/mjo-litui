import type { Meta, StoryObj } from "@storybook/web-components";

import { themes } from "@storybook/theming";
import { html } from "lit";

import "../src/mjo-checkbox";

const meta: Meta = {
    component: "mjo-checkbox",
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
        checked: {
            control: "boolean",
            defaultValue: false,
            description: "Sets the checked state of the checkbox.",
        },
        disabled: {
            control: "boolean",
            defaultValue: false,
            description: "Disabled style for the checkbox.",
        },
        label: {
            control: { type: "text" },
            defaultValue: "Checkbox",
            description: "Label for the checkbox.",
        },
        value: {
            control: { type: "text" },
            defaultValue: "",
            description: "Value of the checkbox.",
        },
        checkgroup: {
            control: { type: "text" },
            defaultValue: "",
            description: "Group name for the checkbox.",
        },
        helperText: {
            control: { type: "text" },
            defaultValue: "Helper text",
            description: "Helper text for the checkbox.",
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
        checked: false,
        disabled: false,
        label: "Checkbox",
        value: "",
        checkgroup: "",
        helperText: "Helper text",
        hideErrors: false,
    },
    render: (args) =>
        html`<center>
            <mjo-checkbox
                color=${args.color}
                ?checked=${args.checked}
                ?disabled=${args.disabled}
                label=${args.label}
                value=${args.value}
                checkgroup=${args.checkgroup}
                helperText=${args.helperText}
                ?hideErrors=${args.hideErrors}
            ></mjo-checkbox>
        </center>`,
};
