import type { Meta, StoryObj } from "@storybook/web-components";

import { themes } from "@storybook/theming";
import { html } from "lit";

import "../src/mjo-button";

const meta: Meta = {
    component: "mjo-alert",
    parameters: {
        docs: {
            theme: themes.dark,
            source: {
                code: "",
            },
        },
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: ["success", "info", "warning", "error"],
            defaultValue: "button",
            description: "Alert type",
        },
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"],
            defaultValue: "medium",
            description: "Sets the size of the alert.",
        },
        rounded: {
            control: { type: "select" },
            options: ["none", "small", "medium", "large"],
            defaultValue: "medium",
            description: "Set rounded corners for the alert.",
        },
        message: {
            control: { type: "text" },
            defaultValue: "",
            description: "Set the message for the alert.",
        },
        detail: {
            control: { type: "text" },
            defaultValue: "",
            description: "Set the detail for the alert.",
        },
        closable: {
            control: "boolean",
            defaultValue: false,
            description: "Set if alert is closable.",
        },
        hideIcon: {
            control: "boolean",
            defaultValue: false,
            description: "Hide the alert icon.",
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
        type: "info",
        size: "medium",
        rounded: "medium",
        message: "This is a message",
        detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        closable: false,
        hideIcon: false,
    },
    render: (args) => html`
        <mjo-alert
            type=${args.type}
            size=${args.size}
            ?rounded=${args.rounded}
            message=${args.message}
            detail=${args.detail}
            ?closable=${args.closable}
            ?hideIcon=${args.hideIcon}
        ></mjo-alert>
    `,
};
