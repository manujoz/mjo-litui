import type { Meta, StoryObj } from "@storybook/web-components";

import { themes } from "@storybook/theming";
import { html } from "lit";

import "../src/mjo-avatar";

const meta: Meta = {
    component: "mjo-avatar",
    parameters: {
        docs: {
            theme: themes.dark,
            source: {
                code: "",
            },
        },
    },
    argTypes: {
        src: {
            control: { type: "text" },
            defaultValue: "",
            description: "Set image for the avatar.",
        },
        alt: {
            control: { type: "text" },
            defaultValue: "",
            description: "Alternate text of image.",
        },
        name: {
            control: { type: "text" },
            defaultValue: "",
            description: "Set the name of the avatar.",
        },
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"],
            defaultValue: "medium",
            description: "Sets the size of the avatar.",
        },
        radius: {
            control: { type: "select" },
            options: ["small", "medium", "large", "full", "none"],
            defaultValue: "medium",
            description: "Set avatar radius.",
        },
        color: {
            control: { type: "select" },
            options: ["default", "primary", "secondary", "success", "warning", "info", "error"],
            defaultValue: "primary",
            description: "Sets the color of the avatar.",
        },
        bordered: {
            control: "boolean",
            defaultValue: false,
            description: "Show a border in the avatar.",
        },
        disabled: {
            control: "boolean",
            defaultValue: false,
            description: "Disabled style for the avatar.",
        },
        nameColoured: {
            control: "boolean",
            defaultValue: false,
            description: "When not there a image, set a color for the avatar having account the initial letter.",
        },
        fallback: {
            control: "text",
            defaultValue: "",
            description: "Put a fallback image when the src is not valid. This must be an SVG plain text.",
        },
        showFallback: {
            control: "boolean",
            defaultValue: false,
            description: "Show the fallback image when the src is not valid.",
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
        src: "https://xsgames.co/randomusers/assets/avatars/male/55.jpg",
        alt: "",
        name: "",
        size: "large",
        radius: "full",
        color: "default",
        bordered: true,
        disabled: false,
        nameColoured: false,
        fallback: "",
        showFallback: false,
    },
    render: (args) =>
        html`<center>
            <mjo-avatar
                src=${args.src}
                alt=${args.alt}
                name=${args.name}
                size=${args.size}
                radius=${args.radius}
                color=${args.color}
                ?bordered=${args.bordered}
                ?disabled=${args.disabled}
                ?nameColoured=${args.nameColoured}
                fallback=${args.fallback}
                ?showFallback=${args.showFallback}
            ></mjo-avatar>
        </center>`,
};
