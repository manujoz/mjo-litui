import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class TextNowrapController {
    /**
     * Renders the complete demo page for mjo-text-nowrap
     */
    async renderTextNowrapPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-text-nowrap");

        if (!component) {
            throw new Error("mjo-text-nowrap component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Utility component for text truncation with ellipsis, perfect for responsive layouts and limited spaces.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const textNowrapTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Use Cases Section -->
            <div class="main-section">
                <h2 class="title">📝 Common Use Cases</h2>
                <p class="subtitle">Real-world scenarios where text truncation is essential for maintaining clean layouts.</p>

                <!-- Navigation Breadcrumbs -->
                <div class="use-case-container">
                    <h3 class="use-case-title">Navigation Breadcrumbs</h3>
                    <p class="use-case-description">Long navigation paths need truncation to prevent layout breaks in responsive designs.</p>
                    <div class="use-case-demo">
                        <nav class="breadcrumb-nav">
                            <a href="#">Home</a>
                            <span class="separator">›</span>
                            <mjo-text-nowrap> Very Long Category Name That Should Be Truncated </mjo-text-nowrap>
                            <span class="separator">›</span>
                            <mjo-text-nowrap> Another Extremely Long Subcategory Name </mjo-text-nowrap>
                            <span class="separator">›</span>
                            <span class="current">Current Page</span>
                        </nav>
                    </div>
                </div>

                <!-- Card Titles -->
                <div class="use-case-container">
                    <h3 class="use-case-title">Card Titles & Descriptions</h3>
                    <p class="use-case-description">Maintain consistent card layouts by truncating long titles and descriptions.</p>
                    <div class="use-case-demo">
                        <div class="cards-grid">
                            <div class="demo-card">
                                <mjo-text-nowrap tag="h3" class="card-title">
                                    This is an Extremely Long Title That Would Normally Break the Card Layout
                                </mjo-text-nowrap>
                                <mjo-text-nowrap class="card-description">
                                    This description is also very long and needs to be truncated to maintain visual consistency across the card grid layout.
                                </mjo-text-nowrap>
                            </div>
                            <div class="demo-card">
                                <mjo-text-nowrap tag="h3" class="card-title"> Another Very Long Product Title That Needs Truncation </mjo-text-nowrap>
                                <mjo-text-nowrap class="card-description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </mjo-text-nowrap>
                            </div>
                            <div class="demo-card">
                                <mjo-text-nowrap tag="h3" class="card-title"> Short Title </mjo-text-nowrap>
                                <mjo-text-nowrap class="card-description"> This is a shorter description that fits well. </mjo-text-nowrap>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Table Cells -->
                <div class="use-case-container">
                    <h3 class="use-case-title">Table Cells</h3>
                    <p class="use-case-description">Prevent table overflow by truncating long content in cells while maintaining table structure.</p>
                    <div class="use-case-demo">
                        <table class="demo-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <mjo-text-nowrap> John Alexander Smith-Johnson III </mjo-text-nowrap>
                                    </td>
                                    <td>
                                        <mjo-text-nowrap> john.alexander.smith.johnson@very-long-company-domain.com </mjo-text-nowrap>
                                    </td>
                                    <td>
                                        <mjo-text-nowrap> Software Engineering & Development </mjo-text-nowrap>
                                    </td>
                                    <td>
                                        <mjo-text-nowrap>
                                            Senior Full Stack Developer specializing in web applications and cloud infrastructure
                                        </mjo-text-nowrap>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <mjo-text-nowrap> Maria Elena Rodriguez-Garcia </mjo-text-nowrap>
                                    </td>
                                    <td>
                                        <mjo-text-nowrap> maria.rodriguez@company.example.org </mjo-text-nowrap>
                                    </td>
                                    <td>
                                        <mjo-text-nowrap> Product Design & User Experience </mjo-text-nowrap>
                                    </td>
                                    <td>
                                        <mjo-text-nowrap> Lead UX Designer with 8+ years of experience in digital product design </mjo-text-nowrap>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Form Labels -->
                <div class="use-case-container">
                    <h3 class="use-case-title">Form Labels & Input Placeholders</h3>
                    <p class="use-case-description">Maintain form alignment by truncating long labels and help text.</p>
                    <div class="use-case-demo">
                        <form class="demo-form">
                            <div class="form-group">
                                <mjo-text-nowrap tag="div" class="form-label"> This is an Extremely Long Form Label That Should Be Truncated </mjo-text-nowrap>
                                <input type="text" class="form-input" />
                                <mjo-text-nowrap class="form-help">
                                    This help text is also very long and provides detailed instructions that need to be truncated to maintain layout
                                    consistency.
                                </mjo-text-nowrap>
                            </div>
                            <div class="form-group">
                                <mjo-text-nowrap tag="div" class="form-label"> Another Very Long Label With Multiple Words </mjo-text-nowrap>
                                <input type="email" class="form-input" />
                                <mjo-text-nowrap class="form-help"> Enter your professional email address for business communications. </mjo-text-nowrap>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Notification Messages -->
                <div class="use-case-container">
                    <h3 class="use-case-title">Notification Messages</h3>
                    <p class="use-case-description">Truncate long notification messages while preserving the most important information.</p>
                    <div class="use-case-demo">
                        <div class="notifications-container">
                            <div class="notification success">
                                <div class="notification-icon">✓</div>
                                <mjo-text-nowrap class="notification-message">
                                    Your profile has been successfully updated with all the new information you provided, including contact details and
                                    preferences.
                                </mjo-text-nowrap>
                            </div>
                            <div class="notification warning">
                                <div class="notification-icon">⚠</div>
                                <mjo-text-nowrap class="notification-message">
                                    Warning: The file you are trying to upload exceeds the maximum size limit of 10MB. Please compress or choose a smaller file.
                                </mjo-text-nowrap>
                            </div>
                            <div class="notification error">
                                <div class="notification-icon">✕</div>
                                <mjo-text-nowrap class="notification-message">
                                    Error: Unable to connect to the server. Please check your internet connection and try again. If the problem persists,
                                    contact support.
                                </mjo-text-nowrap>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Accessibility Features -->
            <div class="main-section">
                <h2 class="title">♿ Accessibility Features</h2>
                <p class="subtitle">Examples showcasing proper accessibility implementation with ARIA labels and semantic elements.</p>

                <div class="use-case-container">
                    <h3 class="use-case-title">ARIA Labels for Screen Readers</h3>
                    <p class="use-case-description">When text is truncated, screen readers need access to the full content via aria-label.</p>
                    <div class="use-case-demo">
                        <div class="accessibility-examples">
                            <mjo-text-nowrap
                                aria-label="This is the complete text that screen readers will announce: John Alexander Smith-Johnson III, Senior Software Engineer at Tech Solutions International LLC"
                            >
                                John Alexander Smith-Johnson III, Senior Software Engineer...
                            </mjo-text-nowrap>

                            <mjo-text-nowrap
                                tag="h4"
                                aria-label="Complete article title: How to Build Scalable Web Applications Using Modern JavaScript Frameworks and Best Practices"
                            >
                                How to Build Scalable Web Applications Using Modern...
                            </mjo-text-nowrap>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Implementation Examples -->
            <div class="main-section">
                <h2 class="title">💡 Implementation Examples</h2>
                <p class="subtitle">Code examples showing different ways to implement text truncation with mjo-text-nowrap.</p>

                <div class="code-examples">
                    <div class="code-example">
                        <h3 class="code-title">Basic Usage</h3>
                        <pre><code>&lt;mjo-text-nowrap&gt;
  This text will be truncated with ellipsis if too long
&lt;/mjo-text-nowrap&gt;</code></pre>
                    </div>

                    <div class="code-example">
                        <h3 class="code-title">With Semantic Tags</h3>
                        <pre><code>&lt;mjo-text-nowrap tag="h2"&gt;
  Long Heading That Needs Truncation
&lt;/mjo-text-nowrap&gt;

&lt;mjo-text-nowrap tag="p"&gt;
  Long paragraph content that should be truncated...
&lt;/mjo-text-nowrap&gt;</code></pre>
                    </div>

                    <div class="code-example">
                        <h3 class="code-title">With ARIA Labels</h3>
                        <pre><code>&lt;mjo-text-nowrap 
  aria-label="Full text for screen readers"&gt;
  Truncated visible text...
&lt;/mjo-text-nowrap&gt;</code></pre>
                    </div>
                </div>
            </div>
        `;

        // Render complete page
        return await ssrRenderer.renderPage(textNowrapTemplate, {
            title: `${title} - mjo-litui`,
            description: subtitle,
            styles: ["/public/css/text-nowrap-demo.css"],
        });
    }
}
