import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class FormController {
    /**
     * Renders the complete demo page for mjo-form
     */
    async renderFormPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-form");

        if (!component) {
            throw new Error("mjo-form component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that provides form validation and data collection with comprehensive validation rules and error handling.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const formTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Basic Usage Section -->
            <div class="main-section">
                <h2 class="title">📦 Basic Form</h2>
                <p class="subtitle">Simple form with validation and error handling.</p>

                <div class="component-showcase">
                    <mjo-form id="basic-form">
                        <div class="form-grid">
                            <mjo-textfield name="firstName" label="First Name" placeholder="Enter your first name" required></mjo-textfield>

                            <mjo-textfield name="lastName" label="Last Name" placeholder="Enter your last name" required></mjo-textfield>
                        </div>

                        <mjo-textfield name="email" label="Email" type="email" placeholder="Enter your email" required isemail></mjo-textfield>

                        <mjo-button type="submit" color="primary" variant="default"> Submit Form </mjo-button>
                    </mjo-form>
                </div>
            </div>

            <!-- Advanced Validation Section -->
            <div class="main-section">
                <h2 class="title">🔒 Advanced Validation</h2>
                <p class="subtitle">Form with comprehensive validation rules and custom error messages.</p>

                <div class="component-showcase">
                    <mjo-form id="validation-form">
                        <div class="form-grid">
                            <mjo-textfield
                                name="username"
                                label="Username"
                                placeholder="Enter username"
                                required
                                minlength="3"
                                maxlength="20"
                                nospaces
                            ></mjo-textfield>

                            <mjo-textfield name="phone" label="Phone Number" type="tel" placeholder="Enter phone number" phonenumber></mjo-textfield>
                        </div>

                        <mjo-textfield name="website" label="Website" type="url" placeholder="https://example.com" isurl></mjo-textfield>

                        <mjo-textfield name="password" label="Password" type="password" placeholder="Enter password" required security="high"></mjo-textfield>

                        <mjo-textfield
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm password"
                            required
                            equalto="password"
                        ></mjo-textfield>

                        <mjo-button type="submit" color="primary" variant="default"> Create Account </mjo-button>
                    </mjo-form>
                </div>
            </div>

            <!-- Form with Different Input Types Section -->
            <div class="main-section">
                <h2 class="title">🎛️ Multiple Input Types</h2>
                <p class="subtitle">Form showcasing various input components with validation.</p>

                <div class="component-showcase">
                    <mjo-form id="multi-input-form">
                        <div class="form-grid">
                            <mjo-textfield name="fullName" label="Full Name" placeholder="Enter your full name" required></mjo-textfield>

                            <mjo-select name="country" label="Country" placeholder="Select your country" required>
                                <option value="">Select Country</option>
                                <option value="us">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="ca">Canada</option>
                                <option value="es">Spain</option>
                                <option value="fr">France</option>
                                <option value="de">Germany</option>
                            </mjo-select>
                        </div>

                        <mjo-textarea name="bio" label="Bio" placeholder="Tell us about yourself" maxlength="500"></mjo-textarea>

                        <mjo-date-picker
                            name="birthdate"
                            label="Birth Date"
                            placeholder="Select your birth date"
                            required
                            maxage="100"
                            minage="13"
                        ></mjo-date-picker>

                        <mjo-slider name="experience" label="Years of Experience" min="0" max="50" value="5"></mjo-slider>

                        <div class="form-group">
                            <mjo-checkbox name="newsletter" label="Subscribe to newsletter"></mjo-checkbox>

                            <mjo-checkbox name="terms" label="I agree to the terms and conditions" required></mjo-checkbox>
                        </div>

                        <mjo-button type="submit" color="success" variant="default"> Submit Profile </mjo-button>
                    </mjo-form>
                </div>
            </div>

            <!-- Radio Groups Section -->
            <div class="main-section">
                <h2 class="title">📻 Radio Groups</h2>
                <p class="subtitle">Form with radio button groups for exclusive selections.</p>

                <div class="component-showcase">
                    <mjo-form id="radio-form">
                        <mjo-textfield name="email" label="Email" type="email" placeholder="Enter your email" required isemail></mjo-textfield>

                        <div class="form-group">
                            <label class="form-group-label">Preferred Contact Method</label>
                            <mjo-radio name="contact" value="email" label="Email" required></mjo-radio>
                            <mjo-radio name="contact" value="phone" label="Phone"></mjo-radio>
                            <mjo-radio name="contact" value="sms" label="SMS"></mjo-radio>
                        </div>

                        <div class="form-group">
                            <label class="form-group-label">Account Type</label>
                            <mjo-radio name="accountType" value="personal" label="Personal" required></mjo-radio>
                            <mjo-radio name="accountType" value="business" label="Business"></mjo-radio>
                            <mjo-radio name="accountType" value="nonprofit" label="Non-profit"></mjo-radio>
                        </div>

                        <mjo-button type="submit" color="info" variant="default"> Create Account </mjo-button>
                    </mjo-form>
                </div>
            </div>

            <!-- Checkbox Groups Section -->
            <div class="main-section">
                <h2 class="title">☑️ Checkbox Groups</h2>
                <p class="subtitle">Form with checkbox groups and validation for minimum/maximum selections.</p>

                <div class="component-showcase">
                    <mjo-form id="checkbox-form">
                        <mjo-textfield name="projectName" label="Project Name" placeholder="Enter project name" required></mjo-textfield>

                        <div class="form-group">
                            <label class="form-group-label">Technologies (Select 2-4)</label>
                            <mjo-checkbox name="tech1" value="javascript" label="JavaScript" checkgroup="technologies" mincheck="2" maxcheck="4"></mjo-checkbox>
                            <mjo-checkbox name="tech2" value="typescript" label="TypeScript" checkgroup="technologies"></mjo-checkbox>
                            <mjo-checkbox name="tech3" value="react" label="React" checkgroup="technologies"></mjo-checkbox>
                            <mjo-checkbox name="tech4" value="vue" label="Vue.js" checkgroup="technologies"></mjo-checkbox>
                            <mjo-checkbox name="tech5" value="angular" label="Angular" checkgroup="technologies"></mjo-checkbox>
                            <mjo-checkbox name="tech6" value="lit" label="Lit" checkgroup="technologies"></mjo-checkbox>
                        </div>

                        <mjo-button type="submit" color="warning" variant="default"> Submit Project </mjo-button>
                    </mjo-form>
                </div>
            </div>

            <!-- Switch Controls Section -->
            <div class="main-section">
                <h2 class="title">🔄 Switch Controls</h2>
                <p class="subtitle">Form with switch components for toggle options.</p>

                <div class="component-showcase">
                    <mjo-form id="switch-form">
                        <div class="form-grid">
                            <mjo-textfield name="username" label="Username" placeholder="Enter username" required></mjo-textfield>

                            <mjo-textfield name="email" label="Email" type="email" placeholder="Enter email" required isemail></mjo-textfield>
                        </div>

                        <div class="form-group">
                            <mjo-switch name="notifications" label="Enable notifications"></mjo-switch>

                            <mjo-switch name="emailAlerts" label="Email alerts"></mjo-switch>

                            <mjo-switch name="darkMode" label="Dark mode"></mjo-switch>

                            <mjo-switch name="analytics" label="Analytics tracking"></mjo-switch>
                        </div>

                        <mjo-button type="submit" color="secondary" variant="default"> Save Preferences </mjo-button>
                    </mjo-form>
                </div>
            </div>

            <!-- Date Validation Section -->
            <div class="main-section">
                <h2 class="title">📅 Date Validation</h2>
                <p class="subtitle">Form with date validation rules and constraints.</p>

                <div class="component-showcase">
                    <mjo-form id="date-form">
                        <div class="form-grid">
                            <mjo-textfield name="eventName" label="Event Name" placeholder="Enter event name" required></mjo-textfield>

                            <mjo-date-picker name="eventDate" label="Event Date" placeholder="Select event date" required></mjo-date-picker>
                        </div>

                        <div class="form-grid">
                            <mjo-date-picker name="startDate" label="Start Date" placeholder="Select start date" required></mjo-date-picker>

                            <mjo-date-picker name="endDate" label="End Date" placeholder="Select end date" required></mjo-date-picker>
                        </div>

                        <mjo-button type="submit" color="success" variant="default"> Create Event </mjo-button>
                    </mjo-form>
                </div>
            </div>

            <!-- Custom Error Messages Section -->
            <div class="main-section">
                <h2 class="title">🚫 Custom Error Messages</h2>
                <p class="subtitle">Form with customized validation error messages.</p>

                <div class="component-showcase">
                    <mjo-form id="custom-errors-form">
                        <div class="form-grid">
                            <mjo-textfield
                                name="customUsername"
                                label="Username"
                                placeholder="Enter unique username"
                                required
                                minlength="3"
                                maxlength="15"
                                nospaces
                            ></mjo-textfield>

                            <mjo-textfield
                                name="customEmail"
                                label="Email Address"
                                type="email"
                                placeholder="Enter valid email"
                                required
                                isemail
                            ></mjo-textfield>
                        </div>

                        <mjo-textfield
                            name="customPassword"
                            label="Strong Password"
                            type="password"
                            placeholder="Enter secure password"
                            required
                            security="very-high"
                            minlength="8"
                        ></mjo-textfield>

                        <mjo-button type="submit" color="error" variant="default"> Register with Custom Validation </mjo-button>
                    </mjo-form>
                </div>
            </div>

            <!-- No Validation Section -->
            <div class="main-section">
                <h2 class="title">🚫 No Validation</h2>
                <p class="subtitle">Form with validation disabled using noValidate attribute.</p>

                <div class="component-showcase">
                    <mjo-form id="no-validation-form" noValidate>
                        <div class="form-grid">
                            <mjo-textfield name="name" label="Name" placeholder="Any name" required></mjo-textfield>

                            <mjo-textfield name="email" label="Email" type="email" placeholder="Any text" required isemail></mjo-textfield>
                        </div>

                        <mjo-button type="submit" color="primary" variant="dashed"> Submit Without Validation </mjo-button>
                    </mjo-form>
                </div>
            </div>

            <!-- Loading State Section -->
            <div class="main-section">
                <h2 class="title">⏳ Loading State</h2>
                <p class="subtitle">Form that shows loading state on submit button during form processing.</p>

                <div class="component-showcase">
                    <mjo-form id="loading-form">
                        <div class="form-grid">
                            <mjo-textfield name="name" label="Full Name" placeholder="Enter your full name" required></mjo-textfield>

                            <mjo-textfield name="email" label="Email" type="email" placeholder="Enter your email" required isemail></mjo-textfield>
                        </div>

                        <mjo-textarea name="message" label="Message" placeholder="Enter your message" required minlength="10"></mjo-textarea>

                        <mjo-button type="submit" color="primary" variant="default"> Send Message </mjo-button>
                    </mjo-form>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(formTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/form-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-form.css"],
        });
    }
}
