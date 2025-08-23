import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class NotificationController {
    /**
     * Renders the complete demo page for mjo-notification
     */
    async renderNotificationPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-notification");

        if (!component) {
            throw new Error("mjo-notification component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that displays positioned toast notifications with controller architecture and comprehensive accessibility support.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const notificationTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Usage Examples Section -->
            <div class="main-section">
                <h2 class="title">📦 Notification Usage Examples</h2>
                <p class="subtitle">Explore different notification types, positions, and configurations.</p>

                <!-- Basic Notification Examples -->
                <h3>Notification Types</h3>
                <div class="component-showcase">
                    <mjo-button onclick="showNotification('info', 'Information', 'This is an informational message')">Info Notification</mjo-button>
                    <mjo-button onclick="showNotification('success', 'Success', 'Operation completed successfully!')" color="success"
                        >Success Notification</mjo-button
                    >
                    <mjo-button onclick="showNotification('warning', 'Warning', 'Please review this important warning')" color="warning"
                        >Warning Notification</mjo-button
                    >
                    <mjo-button onclick="showNotification('error', 'Error', 'An error occurred during processing')" color="error"
                        >Error Notification</mjo-button
                    >
                    <mjo-button onclick="showNotification('', 'Simple', 'This notification has no type, so no icon is displayed')" variant="ghost"
                        >No Type</mjo-button
                    >
                </div>

                <!-- Position Examples -->
                <h3>Notification Positions</h3>
                <div class="component-showcase">
                    <mjo-button onclick="showPositionNotification('top-right', 'Top Right')" color="primary">Top Right</mjo-button>
                    <mjo-button onclick="showPositionNotification('top-left', 'Top Left')" color="primary">Top Left</mjo-button>
                    <mjo-button onclick="showPositionNotification('bottom-right', 'Bottom Right')" color="primary">Bottom Right</mjo-button>
                    <mjo-button onclick="showPositionNotification('bottom-left', 'Bottom Left')" color="primary">Bottom Left</mjo-button>
                </div>

                <!-- Duration Examples -->
                <h3>Auto-Close and Manual Close</h3>
                <div class="component-showcase">
                    <mjo-button onclick="showTimedNotification(2000, 'Quick Message', 'This notification will close in 2 seconds')" color="info"
                        >2 Second Auto-close</mjo-button
                    >
                    <mjo-button onclick="showTimedNotification(5000, 'Extended Message', 'This notification will close in 5 seconds')" color="info"
                        >5 Second Auto-close</mjo-button
                    >
                    <mjo-button onclick="showPersistentNotification('Persistent', 'This notification stays until manually closed')" color="secondary"
                        >Manual Close Only</mjo-button
                    >
                </div>

                <!-- Rich Content Examples -->
                <h3>Rich Content</h3>
                <div class="component-showcase">
                    <mjo-button onclick="showRichContentNotification()" color="primary">Rich HTML Content</mjo-button>
                    <mjo-button onclick="showActionNotification()" color="success">With Action Buttons</mjo-button>
                </div>

                <!-- Management Examples -->
                <h3>Notification Management</h3>
                <div class="component-showcase">
                    <mjo-button onclick="showMultipleNotifications()" color="warning">Show Multiple (Threshold Test)</mjo-button>
                    <mjo-button onclick="clearAllNotifications()" color="error" variant="ghost">Clear All Notifications</mjo-button>
                    <mjo-button onclick="announceMessage()" variant="ghost">Screen Reader Announce</mjo-button>
                </div>

                <!-- Accessibility Examples -->
                <h3>Accessibility Features</h3>
                <div class="component-showcase">
                    <mjo-button onclick="showAccessibleNotification('polite')" color="info">Polite Announcement</mjo-button>
                    <mjo-button onclick="showAccessibleNotification('assertive')" color="warning">Assertive Announcement</mjo-button>
                    <mjo-button onclick="toggleAnimations()" variant="ghost">Toggle Animations</mjo-button>
                </div>

                <!-- Callback Examples -->
                <h3>Callback Handling</h3>
                <div class="component-showcase">
                    <mjo-button onclick="showNotificationWithCallback()" color="secondary">With Close Callback</mjo-button>
                    <mjo-button onclick="showProgrammaticControl()" color="primary">Programmatic Control</mjo-button>
                </div>
            </div>

            <!-- Implementation Notes -->
            <div class="main-section">
                <h2 class="title">🔧 Implementation Notes</h2>
                <p class="subtitle">Important details about notification system behavior.</p>

                <div class="notification-notes">
                    <div class="note-card">
                        <h4>🌍 Global Container</h4>
                        <p>
                            Notifications render in containers appended to <code>document.body</code>, allowing them to appear above any parent element
                            constraints like <code>overflow: hidden</code>.
                        </p>
                    </div>

                    <div class="note-card">
                        <h4>♿ Accessibility</h4>
                        <p>
                            The component includes comprehensive ARIA support, screen reader announcements, keyboard navigation, and respects
                            <code>prefers-reduced-motion</code> settings.
                        </p>
                    </div>

                    <div class="note-card">
                        <h4>🎯 Threshold Management</h4>
                        <p>
                            By default, only 4 notifications are shown simultaneously. Older notifications are automatically removed when the threshold is
                            exceeded.
                        </p>
                    </div>

                    <div class="note-card">
                        <h4>🎨 Theme Integration</h4>
                        <p>Full support for theme customization through ThemeMixin and CSS custom properties. Containers inherit theme from host component.</p>
                    </div>
                </div>
            </div>

            <!-- Notification Containers -->
            <mjo-notification id="default-notification" position="top-right" threshold="4" aria-label="System notifications"></mjo-notification>
            <mjo-notification id="position-notification" position="top-left" threshold="2" aria-label="Position test notifications"></mjo-notification>
        `;

        return ssrRenderer.renderPage(notificationTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/notification-interactions.js", type: "module" }],
            styles: ["/public/css/notification.css"],
        });
    }
}
