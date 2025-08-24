import { MjoTableHeader, MjoTableRows } from "../../src/types/mjo-table";

import { expect } from "@esm-bundle/chai";
import { html } from "lit";

// Import fixtures
import { csrFixture, ssrHydratedFixture, ssrNonHydratedFixture } from "../fixtures/base-fixture.js";

// Import test utilities
import { assertHasShadowRoot } from "../fixtures/test-utils.js";

// Import SSR helpers
import { setupSSREnvironment } from "../helpers/ssr-test-setup.js";

const TABLE_MODULE_PATH = "../../dist/mjo-table.js";

const HEADERS: MjoTableHeader[] = [
    { key: "name", render: "Name", sortable: true },
    { key: "age", render: "Age", sortable: true },
    { key: "email", render: "Email", sortable: false },
];

const ROWS: MjoTableRows[] = [[{ key: "name", render: "John Doe" }], [{ key: "age", render: 30 }], [{ key: "email", render: "john.doe@example.com" }]];

/**
 * Test suite for mjo-avatar component
 */
suite("mjo-avatar Component", () => {
    // Setup SSR environment before tests
    suiteSetup(() => {
        setupSSREnvironment({ verbose: false });
    });

    suite("Basic Rendering", () => {
        test("should render in CSR mode", async () => {
            const element = await csrFixture(html`<mjo-table name="Test User"></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            });

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-avatar");
            assertHasShadowRoot(element);
        });

        test("should render in SSR non-hydrated mode", async () => {
            const element = await ssrNonHydratedFixture(html`<mjo-avatar name="Test User"></mjo-avatar>`, {
                modules: [TABLE_MODULE_PATH],
            });

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-avatar");
        });

        test("should render in SSR hydrated mode", async () => {
            const element = await ssrHydratedFixture(html`<mjo-avatar name="Test User"></mjo-avatar>`, {
                modules: [TABLE_MODULE_PATH],
            });

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-avatar");
            assertHasShadowRoot(element);
        });
    });
});
