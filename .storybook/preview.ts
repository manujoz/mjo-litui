import { themes } from "@storybook/theming";
import type { Preview } from "@storybook/web-components";
import { html } from "lit";

import "../src/mjo-theme";
import "./global.css";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            theme: themes.dark,
        },
    },
    decorators: [
        (story) => html`
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                rel="stylesheet"
            />
            <mjo-theme scope="global" theme="dark"></mjo-theme>
            ${story()}
        `,
    ],
};

export default preview;
