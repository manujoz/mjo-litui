import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class MessagesController {
    /**
     * Renders the complete demo page for mjo-message
     */
    async renderMessagesPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-message");

        if (!component) {
            throw new Error("mjo-message component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that displays temporary toast-like notifications with accessibility support.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const messagesTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Different use cases and configurations of mjo-message component.</p>

                <h3>Basic Message Types</h3>
                <div class="component-showcase messages-examples">
                    <div class="messages-demo-group">
                        <h4>Info Messages</h4>
                        <mjo-message id="info-message"></mjo-message>
                        <mjo-button onclick="showInfoMessage()" color="info">Show Info</mjo-button>
                        <small>Informational messages for general updates</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Success Messages</h4>
                        <mjo-message id="success-message"></mjo-message>
                        <mjo-button onclick="showSuccessMessage()" color="success">Show Success</mjo-button>
                        <small>Confirmation messages for successful actions</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Warning Messages</h4>
                        <mjo-message id="warning-message"></mjo-message>
                        <mjo-button onclick="showWarningMessage()" color="warning">Show Warning</mjo-button>
                        <small>Cautionary messages requiring attention</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Error Messages</h4>
                        <mjo-message id="error-message"></mjo-message>
                        <mjo-button onclick="showErrorMessage()" color="error">Show Error</mjo-button>
                        <small>Critical messages for errors and failures</small>
                    </div>
                </div>

                <h3>Custom Duration Examples</h3>
                <div class="component-showcase messages-examples">
                    <div class="messages-demo-group">
                        <h4>Quick Message (1s)</h4>
                        <mjo-message id="quick-message"></mjo-message>
                        <mjo-button onclick="showQuickMessage()" color="primary">Show Quick</mjo-button>
                        <small>Short duration for quick feedback</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Long Message (10s)</h4>
                        <mjo-message id="long-message"></mjo-message>
                        <mjo-button onclick="showLongMessage()" color="secondary">Show Long</mjo-button>
                        <small>Extended duration for important information</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Persistent Message</h4>
                        <mjo-message id="persistent-message"></mjo-message>
                        <mjo-button onclick="showPersistentMessage()" color="warning" variant="ghost">Show Persistent</mjo-button>
                        <small>Very long duration (30s) for critical notices</small>
                    </div>
                </div>

                <h3>Message Queue Behavior</h3>
                <div class="component-showcase messages-examples">
                    <div class="messages-demo-group">
                        <h4>Multiple Messages</h4>
                        <mjo-message id="multi-message" max-messages="4"></mjo-message>
                        <mjo-button onclick="showMultipleMessages()" color="primary">Show Multiple</mjo-button>
                        <small>Demonstrates queue management (max 4)</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Rapid Messages</h4>
                        <mjo-message id="rapid-message" max-messages="3"></mjo-message>
                        <mjo-button onclick="showRapidMessages()" color="secondary">Show Rapid</mjo-button>
                        <small>Fast sequential messages (max 3)</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Mixed Types Queue</h4>
                        <mjo-message id="mixed-message" max-messages="4"></mjo-message>
                        <mjo-button onclick="showMixedMessages()" color="info">Show Mixed</mjo-button>
                        <small>Different message types in sequence</small>
                    </div>
                </div>

                <h3>Accessibility Features</h3>
                <div class="component-showcase messages-examples">
                    <div class="messages-demo-group">
                        <h4>Polite Announcements</h4>
                        <mjo-message id="polite-message" aria-live="polite" region-label="Polite notifications"></mjo-message>
                        <mjo-button onclick="showPoliteMessage()" color="success">Show Polite</mjo-button>
                        <small>Announced when screen reader is idle</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Assertive Announcements</h4>
                        <mjo-message id="assertive-message" aria-live="assertive" region-label="Urgent notifications"></mjo-message>
                        <mjo-button onclick="showAssertiveMessage()" color="error">Show Assertive</mjo-button>
                        <small>Immediately announced to screen readers</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Custom Region Label</h4>
                        <mjo-message id="custom-region" region-label="Application status updates"></mjo-message>
                        <mjo-button onclick="showCustomRegionMessage()" color="info" variant="ghost">Show Custom Region</mjo-button>
                        <small>Custom accessible label for message area</small>
                    </div>
                </div>

                <h3>Form Integration Examples</h3>
                <div class="component-showcase messages-examples">
                    <div class="messages-demo-group">
                        <h4>Form Validation</h4>
                        <mjo-message id="validation-message"></mjo-message>
                        <div class="form-demo">
                            <input type="email" placeholder="Enter email..." id="email-input" />
                            <mjo-button onclick="validateForm()" color="primary">Validate</mjo-button>
                        </div>
                        <small>Shows validation feedback messages</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Save Feedback</h4>
                        <mjo-message id="save-message"></mjo-message>
                        <div class="form-demo">
                            <input type="text" placeholder="Enter data..." id="data-input" />
                            <mjo-button onclick="simulateSave()" color="success">Save Data</mjo-button>
                        </div>
                        <small>Provides save operation feedback</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Async Operation</h4>
                        <mjo-message id="async-message"></mjo-message>
                        <div class="form-demo">
                            <mjo-button onclick="simulateAsyncOperation()" color="secondary" id="async-btn">Start Process</mjo-button>
                        </div>
                        <small>Shows progress and completion messages</small>
                    </div>
                </div>

                <h3>Callback Examples</h3>
                <div class="component-showcase messages-examples">
                    <div class="messages-demo-group">
                        <h4>With Callback</h4>
                        <mjo-message id="callback-message"></mjo-message>
                        <mjo-button onclick="showCallbackMessage()" color="warning">Show with Callback</mjo-button>
                        <small>Executes callback when message closes</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Chained Messages</h4>
                        <mjo-message id="chain-message"></mjo-message>
                        <mjo-button onclick="showChainedMessages()" color="info">Show Chain</mjo-button>
                        <small>Messages triggered by previous message close</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Action Confirmation</h4>
                        <mjo-message id="confirm-message"></mjo-message>
                        <mjo-button onclick="showConfirmationSequence()" color="error" variant="dashed">Delete Item</mjo-button>
                        <small>Confirmation workflow with messages</small>
                    </div>
                </div>

                <h3>Custom Configuration</h3>
                <div class="component-showcase messages-examples">
                    <div class="messages-demo-group">
                        <h4>Limited Queue (2 max)</h4>
                        <mjo-message id="limited-message" max-messages="2"></mjo-message>
                        <mjo-button onclick="showLimitedQueue()" color="primary">Show Limited</mjo-button>
                        <small>Only 2 messages shown simultaneously</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Large Queue (6 max)</h4>
                        <mjo-message id="large-message" max-messages="6"></mjo-message>
                        <mjo-button onclick="showLargeQueue()" color="secondary">Show Large Queue</mjo-button>
                        <small>Up to 6 messages displayed at once</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Silent Messages</h4>
                        <mjo-message id="silent-message" aria-live="off"></mjo-message>
                        <mjo-button onclick="showSilentMessage()" color="info" variant="ghost">Show Silent</mjo-button>
                        <small>Messages not announced to screen readers</small>
                    </div>
                </div>

                <h3>Real-world Scenarios</h3>
                <div class="component-showcase messages-examples">
                    <div class="messages-demo-group">
                        <h4>File Upload Status</h4>
                        <mjo-message id="upload-message"></mjo-message>
                        <mjo-button onclick="simulateFileUpload()" color="success">Upload File</mjo-button>
                        <small>Multi-stage upload process feedback</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>Network Status</h4>
                        <mjo-message id="network-message"></mjo-message>
                        <mjo-button onclick="simulateNetworkIssue()" color="warning">Simulate Network Issue</mjo-button>
                        <small>Connection status notifications</small>
                    </div>
                    <div class="messages-demo-group">
                        <h4>System Notifications</h4>
                        <mjo-message id="system-message"></mjo-message>
                        <mjo-button onclick="showSystemNotifications()" color="info">Show System Status</mjo-button>
                        <small>System-wide status updates</small>
                    </div>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(messagesTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/messages-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-message.css"],
        });
    }
}
