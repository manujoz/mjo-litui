import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { AiFillEdit, AiFillFileText, AiFillMail, AiFillMessage } from "mjo-icons/ai";

import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class TextareaController {
    /**
     * Renders the complete demo page for mjo-textarea
     */
    async renderTextareaPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-textarea");

        if (!component) {
            throw new Error("mjo-textarea component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Multi-line text input component with auto-resize, character counting, and comprehensive validation support.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const textareaTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Textarea Playground</h2>
                <p class="subtitle">Customize and interact with textareas in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-textarea id="playground-textarea" label="Interactive Demo" placeholder="Type your message here..." rows="3"></mjo-textarea>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Label</h4>
                            <input type="text" placeholder="Enter label..." oninput="changeTextareaProp('label', this.value)" value="Interactive Demo" />
                        </div>

                        <div class="control-group">
                            <h4>Placeholder</h4>
                            <input
                                type="text"
                                placeholder="Enter placeholder..."
                                oninput="changeTextareaProp('placeholder', this.value)"
                                value="Type your message here..."
                            />
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeTextareaProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select onchange="changeTextareaProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Icons</h4>
                            <select onchange="changeTextareaProp('startIcon', this.value)">
                                <option value="" selected>Select start icon</option>
                                <option value="message">Message</option>
                                <option value="mail">Mail</option>
                                <option value="edit">Edit</option>
                                <option value="filetext">File Text</option>
                            </select>
                            <select onchange="changeTextareaProp('endIcon', this.value)">
                                <option value="" selected>Select end icon</option>
                                <option value="message">Message</option>
                                <option value="mail">Mail</option>
                                <option value="edit">Edit</option>
                                <option value="filetext">File Text</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Helper Text</h4>
                            <input type="text" placeholder="Enter helper text..." oninput="changeTextareaProp('helperText', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Rows & Height</h4>
                            <input type="number" min="1" max="10" placeholder="Rows..." oninput="changeTextareaProp('rows', this.value)" value="3" />
                            <input
                                type="number"
                                min="100"
                                max="500"
                                placeholder="Max height..."
                                oninput="changeTextareaProp('maxHeight', this.value)"
                                value=""
                            />
                        </div>

                        <div class="control-group">
                            <h4>Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextareaProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextareaProp('readonly', this.checked || false)" />
                                    <span>Readonly</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextareaProp('counter', this.checked || false)" />
                                    <span>Counter</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextareaProp('fullwidth', this.checked || false)" />
                                    <span>Full Width</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextareaProp('selectOnFocus', this.checked || false)" />
                                    <span>Select on Focus</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTextareaProp('autoFocus', this.checked || false)" />
                                    <span>Auto Focus</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Validation</h4>
                            <input type="number" placeholder="Max length..." oninput="changeTextareaProp('maxlength', this.value)" value="" />
                            <input type="number" placeholder="Min length..." oninput="changeTextareaProp('minlength', this.value)" value="" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-textarea component.</p>

                <h3>Basic Usage</h3>
                <div class="component-showcase textarea-showcase">
                    <mjo-textarea label="Message" placeholder="Enter your message here"></mjo-textarea>
                    <mjo-textarea label="Comments" placeholder="Share your thoughts..." rows="4"></mjo-textarea>
                    <mjo-textarea label="Description" placeholder="Describe your project..." helperText="Tell us about your project"></mjo-textarea>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase textarea-showcase">
                    <mjo-textarea label="Small" size="small" placeholder="Small textarea"></mjo-textarea>
                    <mjo-textarea label="Medium" size="medium" placeholder="Medium textarea"></mjo-textarea>
                    <mjo-textarea label="Large" size="large" placeholder="Large textarea"></mjo-textarea>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase textarea-showcase">
                    <mjo-textarea label="Primary" color="primary" placeholder="Primary color"></mjo-textarea>
                    <mjo-textarea label="Secondary" color="secondary" placeholder="Secondary color"></mjo-textarea>
                </div>

                <h3>With Icons</h3>
                <div class="component-showcase textarea-showcase">
                    <mjo-textarea label="Email Message" startIcon=${AiFillMail} placeholder="Type your email message..."></mjo-textarea>
                    <mjo-textarea label="User Bio" startIcon=${AiFillMessage} placeholder="Tell us about yourself..."></mjo-textarea>
                    <mjo-textarea label="Edit Content" startIcon=${AiFillEdit} placeholder="Edit your content here..."></mjo-textarea>
                </div>

                <h3>Auto-resize with Max Height</h3>
                <div class="component-showcase textarea-showcase">
                    <mjo-textarea label="Auto-resize" rows="2" maxHeight="200" placeholder="Start typing to see auto-resize in action..."></mjo-textarea>
                    <mjo-textarea
                        label="Limited Height"
                        rows="3"
                        maxHeight="150"
                        placeholder="This textarea will resize but stop at 150px height"
                    ></mjo-textarea>
                </div>

                <h3>With Character Counter</h3>
                <div class="component-showcase textarea-showcase">
                    <mjo-textarea
                        label="Tweet"
                        counter
                        maxlength="280"
                        placeholder="What's happening?"
                        helperText="Share your thoughts with the world"
                    ></mjo-textarea>
                    <mjo-textarea label="Product Review" counter maxlength="500" rows="4" placeholder="Write your review here..."></mjo-textarea>
                </div>

                <h3>With Images</h3>
                <div class="component-showcase textarea-showcase">
                    <mjo-textarea
                        label="Profile Description"
                        startImage="https://i.pravatar.cc/32?img=1"
                        placeholder="Tell us about yourself..."
                    ></mjo-textarea>
                    <mjo-textarea label="Company Info" endImage="https://i.pravatar.cc/32?img=2" placeholder="Describe your company..."></mjo-textarea>
                </div>

                <h3>Validation States</h3>
                <div class="component-showcase textarea-showcase">
                    <mjo-textarea label="Required Field" required error errormsg="This field is required" placeholder="Please enter a value"></mjo-textarea>
                    <mjo-textarea label="Valid Input" successmsg="Looks good!" value="This is a valid message." placeholder="Enter your message"></mjo-textarea>
                </div>

                <h3>Different States</h3>
                <div class="component-showcase textarea-showcase">
                    <mjo-textarea label="Disabled" disabled placeholder="Disabled textarea" value="Cannot edit this content"></mjo-textarea>
                    <mjo-textarea
                        label="Readonly"
                        readonly
                        placeholder="Readonly textarea"
                        value="This content is read-only and cannot be modified"
                    ></mjo-textarea>
                    <mjo-textarea label="Full Width" fullwidth placeholder="This textarea takes full width of its container"></mjo-textarea>
                </div>

                <h3>Form Integration Example</h3>
                <div class="form-example">
                    <h4>Contact Form</h4>
                    <div class="form-row">
                        <mjo-textarea label="Subject" placeholder="Enter subject..." required maxlength="100" counter></mjo-textarea>
                    </div>
                    <div class="form-row">
                        <mjo-textarea
                            label="Message"
                            placeholder="Enter your message..."
                            required
                            rows="5"
                            maxlength="1000"
                            counter
                            helperText="Please provide detailed information about your inquiry"
                        ></mjo-textarea>
                    </div>
                    <div class="form-row">
                        <mjo-textarea label="Additional Comments" placeholder="Any additional comments..." rows="3" maxlength="500" counter></mjo-textarea>
                    </div>
                </div>

                <h3>Advanced Usage</h3>
                <div class="component-showcase textarea-showcase">
                    <mjo-textarea
                        label="Feedback Form"
                        startIcon=${AiFillFileText}
                        counter
                        maxlength="750"
                        rows="6"
                        maxHeight="300"
                        placeholder="Share your detailed feedback..."
                        helperText="Your feedback helps us improve our services"
                        selectOnFocus
                    ></mjo-textarea>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(textareaTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/textarea-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-textarea.css"],
        });
    }
}
