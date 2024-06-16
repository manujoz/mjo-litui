import type { Meta, StoryObj } from "@storybook/web-components";

import { themes } from "@storybook/theming";
import { html } from "lit";

import "../src/mjo-typography";

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
        variant: {
            control: { type: "select" },
            options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
            description: "Sets the variant of the typography.",
        },
        innerText: {
            control: { type: "text" },
            description: "Sets the inner text of the typography.",
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
        variant: "p",
        innerText: "Hello world!!!",
    },
    render: (args) =>
        html`<center>
            <mjo-typography variant=${args.variant}>${args.innerText}</mjo-typography>
            <mjo-typography variant=${args.variant}>${args.innerText}</mjo-typography>
            <mjo-typography variant=${args.variant}>${args.innerText}</mjo-typography>
        </center>`,
};
