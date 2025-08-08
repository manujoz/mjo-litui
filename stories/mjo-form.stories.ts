// import type { Meta, StoryObj } from "@storybook/web-components";
// import type { DrawerStorybook } from "./components/drawer/drawer-storybook";

// import { action } from "@storybook/addon-actions";
// import { themes } from "@storybook/theming";
// import { html } from "lit";

// import "../src/mjo-form";

// const meta: Meta = {
//     component: "mjo-form",
//     parameters: {
//         docs: {
//             theme: themes.dark,
//             source: {
//                 code: "",
//             },
//         },
//     },
//     argTypes: {
//         blocked: {
//             control: "boolean",
//             defaultValue: false,
//             description: "Block the drawer and must be closed manually.",
//         },
//         position: {
//             control: { type: "select" },
//             options: ["right", "top", "bottom", "left"],
//             defaultValue: "right",
//             description: "Drawer position.",
//         },
//         width: {
//             control: { type: "number" },
//             defaultValue: 500,
//             description: "Set the drawer width.",
//         },
//         height: {
//             control: { type: "number" },
//             defaultValue: 500,
//             description: "Set the drawer height.",
//         },
//         animationDuration: {
//             control: { type: "number" },
//             defaultValue: 300,
//             description: "Set the animation duration.",
//         },
//     },
// };

// export default meta;
// type Story = StoryObj;

// export const Default: Story = {
//     parameters: {
//         docs: {
//             theme: themes.dark,
//         },
//     },
//     args: {
//         blocked: false,
//         position: "right",
//         width: undefined,
//         height: undefined,
//         animationDuration: undefined,
//     },
//     render: (args) => {
//         const openedAction = action("Drawer opened");
//         const closedAction = action("Drawer closed");

//         return html`<center>
//             <mjo-form> asdsa </mjo-form>
//         </center>`;
//     },
// };

// declare global {
//     interface HTMLElementTagNameMap {
//         "drawer-storybook": DrawerStorybook;
//     }
// }
