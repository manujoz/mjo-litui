import type { Meta, StoryObj } from "@storybook/web-components";

import { themes } from "@storybook/theming";
import { html } from "lit";

import "../src/mjo-button";
import "../src/mjo-dropdown";

const meta: Meta = {
    component: "mjo-dropdown",
    parameters: {
        docs: {
            theme: themes.dark,
            source: {
                code: "",
            },
        },
    },
    argTypes: {
        fullwidth: {
            control: { type: "boolean" },
            description: "Sets the fullwidth of the dropdown.",
        },
        preventScroll: {
            control: { type: "boolean" },
            description: "Prevents the dropdown from scrolling.",
        },
        behaviour: {
            control: { type: "radio" },
            options: ["hover", "click"],
            defaultValue: "hover",
            description: "Sets the behaviour of the dropdown.",
        },
        width: {
            control: { type: "text" },
            description: "Sets the width of the dropdown.",
        },
        height: {
            control: { type: "text" },
            description: "Sets the height of the dropdown.",
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
        fullwidth: false,
        preventScroll: false,
        behaviour: "hover",
        width: undefined,
        height: undefined,
    },
    render: (args) =>
        html`<center>
            <mjo-dropdown
                ?fullwidth=${args.fullwidth}
                ?preventScroll=${args.preventScroll}
                behaviour=${args.behaviour}
                width=${args.width}
                height=${args.height}
                .html=${html`<div style="position: relative; padding: 5px 10px;">
                    <p style="margin: 0; padding: 5px 0">List item</p>
                    <p style="margin: 0; padding: 5px 0">List item</p>
                    <p style="margin: 0; padding: 5px 0">List item</p>
                    <p style="margin: 0; padding: 5px 0">List item</p>
                </div>`}
            >
                <mjo-button>CLICK ME</mjo-button>
            </mjo-dropdown>
        </center>`,
};
