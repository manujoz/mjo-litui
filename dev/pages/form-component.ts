import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-button.js";
import "../../src/mjo-checkbox-group.js";
import "../../src/mjo-checkbox.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-radio.js";
import "../../src/mjo-select.js";
import "../../src/mjo-slider.js";
import "../../src/mjo-switch.js";
import "../../src/mjo-textarea.js";
import "../../src/mjo-textfield.js";

import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("form-component")
export class FormComponent extends LitElement {
    @state() private enableValidation = true;
    @state() private showFormData = false;
    @state() private lastFormData: any = {};
    @state() private lastValidationResult: any = {};
    @state() private formSubmitCount = 0;

    render() {
        return html`
            <h1>Form Component Examples</h1>

            <section-container label="Interactive Form Playground">
                <playground-grid>
                    <mjo-form
                        slot="demo"
                        id="playground-form"
                        ?noValidate=${!this.enableValidation}
                        .errmessages=${{
                            required: "This field is required",
                            isemail: "Please enter a valid email address",
                            minlength: "This field is too short",
                            maxlength: "This field is too long",
                            pattern: "Invalid format",
                        }}
                        .inputsErrmessages=${{
                            email: { isemail: "Please provide a valid email address" },
                            password: { minlength: "Password must be at least 8 characters", security: "Password is too weak" },
                        }}
                        @submit=${this.#handlePlaygroundSubmit}
                    >
                        <mjo-grid columns="2" gap="20px">
                            <mjo-textfield
                                name="fullName"
                                label="Full Name"
                                placeholder="Enter your full name"
                                required
                                validator-rules='{"required": true, "minlength": 2}'
                            ></mjo-textfield>

                            <mjo-textfield
                                name="email"
                                label="Email Address"
                                type="email"
                                placeholder="your@email.com"
                                required
                                validator-rules='{"required": true, "isemail": true}'
                            ></mjo-textfield>

                            <mjo-textfield
                                name="phone"
                                label="Phone Number"
                                placeholder="+1 (555) 123-4567"
                                validator-rules='{"phonenumber": true}'
                            ></mjo-textfield>

                            <mjo-textfield
                                name="age"
                                label="Age"
                                type="number"
                                placeholder="25"
                                validator-rules='{"isnumber": true, "min": 18, "max": 120}'
                            ></mjo-textfield>
                        </mjo-grid>

                        <mjo-textarea
                            name="bio"
                            label="Bio"
                            placeholder="Tell us about yourself..."
                            validator-rules='{"maxlength": 500}'
                            rows="4"
                        ></mjo-textarea>

                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Interests:</h4>
                            <mjo-checkbox name="interests" value="technology" label="Technology" checked></mjo-checkbox>
                            <mjo-checkbox name="interests" value="design" label="Design & UX"></mjo-checkbox>
                            <mjo-checkbox name="interests" value="business" label="Business"></mjo-checkbox>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Preferred Contact:</h4>
                            <mjo-radio name="contact" value="email" label="Email" checked></mjo-radio>
                            <mjo-radio name="contact" value="phone" label="Phone"></mjo-radio>
                            <mjo-radio name="contact" value="sms" label="SMS"></mjo-radio>
                        </div>

                        <mjo-slider name="experience" label="Years of Experience" value="3" min="0" max="20" step="1" valueSuffix=" years"></mjo-slider>

                        <mjo-switch name="newsletter" label="Subscribe to newsletter" checked></mjo-switch>

                        <div class="form-actions">
                            <mjo-button type="submit" color="primary">Submit Form</mjo-button>
                            <mjo-button type="reset" variant="ghost">Reset Form</mjo-button>
                        </div>
                    </mjo-form>

                    <control-group slot="controls" label="Form Settings" columns="1">
                        <mjo-button size="small" variant=${this.enableValidation ? "default" : "ghost"} @click=${() => this.toggleValidation()}>
                            ${this.enableValidation ? "Disable" : "Enable"} Validation
                        </mjo-button>
                        <mjo-button size="small" variant=${this.showFormData ? "default" : "ghost"} @click=${() => this.toggleFormData()}>
                            ${this.showFormData ? "Hide" : "Show"} Form Data
                        </mjo-button>
                    </control-group>
                </playground-grid>

                ${this.showFormData
                    ? html`
                          <div class="form-data-display">
                              <h4>Last Form Submission:</h4>
                              <div class="data-content">
                                  <div class="data-section">
                                      <h5>Form Data:</h5>
                                      <pre>${JSON.stringify(this.lastFormData, null, 2)}</pre>
                                  </div>
                                  <div class="data-section">
                                      <h5>Validation Result:</h5>
                                      <pre>${JSON.stringify(this.lastValidationResult, null, 2)}</pre>
                                  </div>
                                  <div class="data-section">
                                      <span><strong>Total Submissions:</strong> ${this.formSubmitCount}</span>
                                  </div>
                              </div>
                          </div>
                      `
                    : ""}
            </section-container>

            <section-container label="Contact Form Example" description="A typical contact form with validation.">
                <mjo-form @submit=${this.#handleContactSubmit}>
                    <mjo-grid columns="2" gap="20px">
                        <mjo-textfield
                            name="firstName"
                            label="First Name"
                            placeholder="John"
                            required
                            validator-rules='{"required": true, "minlength": 2}'
                        ></mjo-textfield>

                        <mjo-textfield
                            name="lastName"
                            label="Last Name"
                            placeholder="Doe"
                            required
                            validator-rules='{"required": true, "minlength": 2}'
                        ></mjo-textfield>
                    </mjo-grid>

                    <mjo-textfield
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="john.doe@example.com"
                        required
                        validator-rules='{"required": true, "isemail": true}'
                    ></mjo-textfield>

                    <mjo-textfield
                        name="subject"
                        label="Subject"
                        placeholder="What is this about?"
                        required
                        validator-rules='{"required": true, "minlength": 5}'
                    ></mjo-textfield>

                    <mjo-textarea
                        name="message"
                        label="Message"
                        placeholder="Your message here..."
                        required
                        validator-rules='{"required": true, "minlength": 10}'
                        rows="5"
                    ></mjo-textarea>

                    <mjo-checkbox name="consent" label="I agree to the privacy policy" required validator-rules='{"required": true}'></mjo-checkbox>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Send Message</mjo-button>
                        <mjo-button type="reset" variant="ghost">Clear Form</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="User Registration Form" description="Complete user registration with various input types.">
                <mjo-form
                    .errmessages=${{
                        required: "This field is required",
                        isemail: "Invalid email format",
                        minlength: "Too short",
                        equalto: "Passwords do not match",
                        security: "Password is too weak",
                    }}
                    @submit=${this.#handleRegistrationSubmit}
                >
                    <mjo-grid columns="2" gap="20px">
                        <mjo-textfield
                            name="username"
                            label="Username"
                            placeholder="johndoe123"
                            required
                            validator-rules='{"required": true, "minlength": 3, "pattern": "^[a-zA-Z0-9_]+$"}'
                            helperText="Only letters, numbers, and underscores"
                        ></mjo-textfield>

                        <mjo-textfield
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            validator-rules='{"required": true, "isemail": true}'
                        ></mjo-textfield>

                        <mjo-textfield
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="********"
                            required
                            validator-rules='{"required": true, "minlength": 8, "security": "medium"}'
                            helperText="At least 8 characters with mixed case and numbers"
                        ></mjo-textfield>

                        <mjo-textfield
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            placeholder="********"
                            required
                            validator-rules='{"required": true, "equalto": "password"}'
                        ></mjo-textfield>

                        <mjo-textfield
                            name="birthDate"
                            label="Birth Date"
                            type="text"
                            placeholder="YYYY-MM-DD"
                            required
                            validator-rules='{"required": true, "minage": 13}'
                        ></mjo-textfield>

                        <mjo-textfield name="phone" label="Phone Number" placeholder="+1 555 123 4567" validator-rules='{"phonenumber": true}'></mjo-textfield>
                    </mjo-grid>

                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Account Type:</h4>
                        <mjo-radio name="accountType" value="personal" label="Personal Account" checked></mjo-radio>
                        <mjo-radio name="accountType" value="business" label="Business Account"></mjo-radio>
                        <mjo-radio name="accountType" value="organization" label="Organization"></mjo-radio>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <h4 style="margin: 0; color: var(--mjo-foreground-color, #333);">Preferences:</h4>
                        <mjo-checkbox name="notifications" value="email" label="Email notifications" checked></mjo-checkbox>
                        <mjo-checkbox name="notifications" value="sms" label="SMS notifications"></mjo-checkbox>
                        <mjo-checkbox name="marketing" value="yes" label="Marketing communications"></mjo-checkbox>
                        <mjo-checkbox
                            name="terms"
                            label="I accept the Terms of Service and Privacy Policy"
                            required
                            validator-rules='{"required": true}'
                        ></mjo-checkbox>
                    </div>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Create Account</mjo-button>
                        <mjo-button type="reset" variant="ghost">Reset Form</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="Survey Form" description="Multi-step survey with ratings and preferences.">
                <mjo-form @submit=${this.#handleSurveySubmit}>
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        <div>
                            <h4 style="margin: 0 0 16px 0; color: var(--mjo-foreground-color, #333);">Personal Information:</h4>
                            <mjo-grid columns="3" gap="16px">
                                <mjo-textfield name="name" label="Full Name" required validator-rules='{"required": true}'></mjo-textfield>
                                <mjo-textfield name="age" label="Age" type="number" validator-rules='{"isnumber": true, "min": 13, "max": 120}'></mjo-textfield>
                                <mjo-textfield name="city" label="City"></mjo-textfield>
                            </mjo-grid>
                        </div>

                        <div>
                            <h4 style="margin: 0 0 16px 0; color: var(--mjo-foreground-color, #333);">Experience Rating:</h4>
                            <mjo-slider
                                name="overallSatisfaction"
                                label="Overall Satisfaction"
                                value="5"
                                min="1"
                                max="10"
                                step="1"
                                valueSuffix="/10"
                            ></mjo-slider>
                            <mjo-slider name="easeOfUse" label="Ease of Use" value="7" min="1" max="10" step="1" valueSuffix="/10"></mjo-slider>
                            <mjo-slider name="performance" label="Performance" value="8" min="1" max="10" step="1" valueSuffix="/10"></mjo-slider>
                        </div>

                        <div>
                            <h4 style="margin: 0 0 16px 0; color: var(--mjo-foreground-color, #333);">How did you hear about us?</h4>
                            <mjo-radio name="source" value="search" label="Search Engine (Google, Bing, etc.)" checked></mjo-radio>
                            <mjo-radio name="source" value="social" label="Social Media"></mjo-radio>
                            <mjo-radio name="source" value="friend" label="Friend or Colleague"></mjo-radio>
                            <mjo-radio name="source" value="ad" label="Online Advertisement"></mjo-radio>
                            <mjo-radio name="source" value="other" label="Other"></mjo-radio>
                        </div>

                        <div>
                            <h4 style="margin: 0 0 16px 0; color: var(--mjo-foreground-color, #333);">Which features do you use most?</h4>
                            <mjo-checkbox name="features" value="dashboard" label="Dashboard" checked></mjo-checkbox>
                            <mjo-checkbox name="features" value="reports" label="Reports & Analytics"></mjo-checkbox>
                            <mjo-checkbox name="features" value="collaboration" label="Team Collaboration"></mjo-checkbox>
                            <mjo-checkbox name="features" value="integrations" label="Third-party Integrations"></mjo-checkbox>
                            <mjo-checkbox name="features" value="mobile" label="Mobile App"></mjo-checkbox>
                        </div>

                        <mjo-textarea
                            name="feedback"
                            label="Additional Feedback"
                            placeholder="Tell us what you think could be improved..."
                            rows="4"
                            validator-rules='{"maxlength": 1000}'
                        ></mjo-textarea>

                        <mjo-switch name="followUp" label="I'm open to follow-up questions" checked></mjo-switch>
                    </div>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Submit Survey</mjo-button>
                        <mjo-button type="reset" variant="ghost">Clear Responses</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="E-commerce Checkout Form" description="Order form with shipping and payment details.">
                <mjo-form @submit=${this.#handleCheckoutSubmit}>
                    <div style="display: flex; flex-direction: column; gap: 24px;">
                        <div>
                            <h4 style="margin: 0 0 16px 0; color: var(--mjo-foreground-color, #333);">Shipping Information:</h4>
                            <mjo-grid columns="2" gap="16px">
                                <mjo-textfield name="shippingFirstName" label="First Name" required validator-rules='{"required": true}'></mjo-textfield>
                                <mjo-textfield name="shippingLastName" label="Last Name" required validator-rules='{"required": true}'></mjo-textfield>
                            </mjo-grid>
                            <mjo-textfield
                                name="shippingAddress"
                                label="Street Address"
                                placeholder="123 Main Street"
                                required
                                validator-rules='{"required": true}'
                            ></mjo-textfield>
                            <mjo-grid columns="3" gap="16px">
                                <mjo-textfield name="shippingCity" label="City" required validator-rules='{"required": true}'></mjo-textfield>
                                <mjo-textfield name="shippingState" label="State/Province" required validator-rules='{"required": true}'></mjo-textfield>
                                <mjo-textfield name="shippingZip" label="ZIP/Postal Code" required validator-rules='{"required": true}'></mjo-textfield>
                            </mjo-grid>
                        </div>

                        <div>
                            <h4 style="margin: 0 0 16px 0; color: var(--mjo-foreground-color, #333);">Shipping Options:</h4>
                            <mjo-radio name="shippingMethod" value="standard" label="Standard Shipping (5-7 days) - FREE" checked></mjo-radio>
                            <mjo-radio name="shippingMethod" value="expedited" label="Expedited Shipping (2-3 days) - $9.99"></mjo-radio>
                            <mjo-radio name="shippingMethod" value="overnight" label="Overnight Delivery - $24.99"></mjo-radio>
                        </div>

                        <mjo-checkbox name="sameAsBilling" label="Billing address is same as shipping" checked></mjo-checkbox>

                        <div>
                            <h4 style="margin: 0 0 16px 0; color: var(--mjo-foreground-color, #333);">Order Preferences:</h4>
                            <mjo-checkbox name="giftWrap" label="Gift wrap this order (+$4.99)"></mjo-checkbox>
                            <mjo-checkbox name="trackingUpdates" label="Send SMS tracking updates" checked></mjo-checkbox>
                            <mjo-checkbox name="newsletter" label="Subscribe to our newsletter for deals"></mjo-checkbox>
                        </div>

                        <mjo-textarea
                            name="orderNotes"
                            label="Special Instructions"
                            placeholder="Any special delivery instructions..."
                            rows="3"
                            validator-rules='{"maxlength": 500}'
                        ></mjo-textarea>
                    </div>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Place Order</mjo-button>
                        <mjo-button type="button" variant="ghost">Save for Later</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="Event Handling Demo">
                <div class="event-demo">
                    <mjo-form @submit=${this.#logFormEvent}>
                        <mjo-textfield
                            name="testField"
                            label="Test Field"
                            placeholder="Type something and submit..."
                            required
                            validator-rules='{"required": true, "minlength": 3}'
                        ></mjo-textfield>

                        <mjo-checkbox-group>
                            <mjo-checkbox name="testCheck" label="Test Checkbox 2" checkgroup="test"></mjo-checkbox>
                            <mjo-checkbox name="testCheck" label="Test Checkbox 3" checkgroup="test"></mjo-checkbox>
                            <mjo-checkbox name="testCheck" label="Test Checkbox 1" checkgroup="test" maxcheck="2"></mjo-checkbox>
                        </mjo-checkbox-group>

                        <div class="form-actions">
                            <mjo-button type="submit" color="primary">Submit Test</mjo-button>
                        </div>
                    </mjo-form>

                    <div class="event-log">
                        <h5>Form Event Log:</h5>
                        <div id="event-output" class="log-output">Form events will appear here...</div>
                    </div>
                </div>
            </section-container>
        `;
    }

    private toggleValidation() {
        this.enableValidation = !this.enableValidation;
    }

    private toggleFormData() {
        this.showFormData = !this.showFormData;
    }

    #handlePlaygroundSubmit = (event: CustomEvent) => {
        const { formData, response } = event.detail;
        this.lastFormData = response.data;
        this.lastValidationResult = {
            error: response.error,
            errorMessage: response.errmsg,
            errorRule: response.errrule,
            errorInput: response.errInput?.name || null,
        };
        this.formSubmitCount++;

        console.log("Playground form submitted:", { formData, response });

        // Simulate async processing
        setTimeout(() => {
            if (response.submitButton) {
                response.submitButton.loading = false;
            }
        }, 2000);
    };

    #handleContactSubmit = (event: CustomEvent) => {
        const { response } = event.detail;
        console.log("Contact form submitted:", response.data);

        // Simulate sending message
        setTimeout(() => {
            if (response.submitButton) {
                response.submitButton.loading = false;
            }
            alert("Message sent successfully!");
        }, 1500);
    };

    #handleRegistrationSubmit = (event: CustomEvent) => {
        const { response } = event.detail;
        console.log("Registration form submitted:", response.data);

        // Simulate account creation
        setTimeout(() => {
            if (response.submitButton) {
                response.submitButton.loading = false;
            }
            if (!response.error) {
                alert("Account created successfully!");
            }
        }, 2500);
    };

    #handleSurveySubmit = (event: CustomEvent) => {
        const { response } = event.detail;
        console.log("Survey form submitted:", response.data);

        // Simulate survey processing
        setTimeout(() => {
            if (response.submitButton) {
                response.submitButton.loading = false;
            }
            alert("Thank you for your feedback!");
        }, 1000);
    };

    #handleCheckoutSubmit = (event: CustomEvent) => {
        const { response } = event.detail;
        console.log("Checkout form submitted:", response.data);

        // Simulate order processing
        setTimeout(() => {
            if (response.submitButton) {
                response.submitButton.loading = false;
            }
            if (!response.error) {
                alert("Order placed successfully! Order #12345");
            }
        }, 3000);
    };

    #logFormEvent = (event: CustomEvent) => {
        const output = this.shadowRoot?.querySelector("#event-output");
        if (output) {
            const time = new Date().toLocaleTimeString();
            const { response } = event.detail;

            console.log("Form event:", event.detail);

            const safeResponse = {
                error: response.error,
                errorMessage: response.errmsg,
                errorRule: response.errrule,
                errorInput: response.errInput?.name || null,
                data: response.data,
                elementsCount: response.elements.length,
            };

            const eventInfo = `[${time}] Form Submit: ${JSON.stringify(safeResponse, null, 2)}\n\n`;
            output.textContent = eventInfo + (output.textContent || "").split("\n\n").slice(0, 4).join("\n\n");

            // Simulate processing
            setTimeout(() => {
                if (response.submitButton) {
                    response.submitButton.loading = false;
                }
            }, 1500);
        }
    };

    static styles = [
        css`
            :host {
                display: block;
                padding: 30px;
                max-width: 1400px;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                gap: 40px;
            }

            h1 {
                font-size: 2em;
                margin: 0;
                color: var(--mjo-foreground-color, #333);
            }

            h4 {
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
                font-weight: 500;
            }

            h5 {
                color: var(--mjo-foreground-color, #333);
                font-size: 1em;
                font-weight: 500;
            }

            .form-actions {
                display: flex;
                gap: 12px;
                margin-top: 20px;
                flex-wrap: wrap;
            }

            .form-data-display {
                margin-top: 20px;
                padding: 16px;
                background: var(--mjo-background-color-high, #f5f5f5);
                border-radius: 8px;
                border: 1px solid var(--mjo-border-color, #ddd);
            }

            .form-data-display h4 {
                margin: 0 0 12px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
            }

            .data-content {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            .data-section {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .data-section h5 {
                margin: 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1em;
            }

            .data-section pre {
                background: var(--mjo-background-color, #fff);
                border: 1px solid var(--mjo-border-color, #ddd);
                border-radius: 4px;
                padding: 12px;
                font-family: "Courier New", Courier, monospace;
                font-size: 0.85rem;
                color: var(--mjo-foreground-color, #333);
                white-space: pre-wrap;
                max-height: 200px;
                overflow-y: auto;
                margin: 0;
            }

            .data-section span {
                font-size: 0.95rem;
                color: var(--mjo-foreground-color, #333);
            }

            .data-section strong {
                color: var(--mjo-foreground-color, #222);
                font-weight: 600;
                margin-right: 8px;
            }

            .event-demo {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .event-log h5 {
                margin: 0 0 8px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1em;
            }

            .log-output {
                background: var(--mjo-background-color-high, #f5f5f5);
                border: 1px solid var(--mjo-border-color, #ddd);
                border-radius: 4px;
                padding: 12px;
                font-family: "Courier New", Courier, monospace;
                font-size: 0.85rem;
                color: var(--mjo-foreground-color, #333);
                white-space: pre-wrap;
                max-height: 300px;
                overflow-y: auto;
                min-height: 100px;
            }

            /* Form styling enhancements */
            mjo-form {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                :host {
                    padding: 20px;
                }

                .event-demo {
                    gap: 16px;
                }

                .form-actions {
                    flex-direction: column;
                }

                .data-content {
                    gap: 12px;
                }
            }

            @media (max-width: 480px) {
                mjo-grid[columns="2"] {
                    --columns: 1;
                }

                mjo-grid[columns="3"] {
                    --columns: 1;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "form-component": FormComponent;
    }
}
