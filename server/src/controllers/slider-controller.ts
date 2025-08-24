import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class SliderController {
    /**
     * Renders the complete demo page for mjo-slider
     */
    async renderSliderPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-slider");

        if (!component) {
            throw new Error("mjo-slider component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Interactive range slider component with accessibility features, keyboard navigation, and support for both single value and dual-handle range selection.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const sliderTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Slider Playground</h2>
                <p class="subtitle">Customize and interact with sliders in real-time. Adjust properties to see how they affect the slider behavior.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-slider id="playground-slider" label="Interactive Demo" min="0" max="100" value="50" name="demo-slider"></mjo-slider>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Label</h4>
                            <input
                                type="text"
                                name="label"
                                placeholder="Enter label..."
                                oninput="changeSliderProp('label', this.value)"
                                value="Interactive Demo"
                            />
                        </div>

                        <div class="control-group">
                            <h4>Min Value</h4>
                            <input
                                type="number"
                                name="min"
                                placeholder="Min value..."
                                oninput="changeSliderProp('min', this.value)"
                                value="0"
                                min="-100"
                                max="50"
                            />
                        </div>

                        <div class="control-group">
                            <h4>Max Value</h4>
                            <input
                                type="number"
                                name="max"
                                placeholder="Max value..."
                                oninput="changeSliderProp('max', this.value)"
                                value="100"
                                min="50"
                                max="200"
                            />
                        </div>

                        <div class="control-group">
                            <h4>Step</h4>
                            <select name="step" onchange="changeSliderProp('step', this.value)">
                                <option value="1" selected>1</option>
                                <option value="0.1">0.1</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select name="color" onchange="changeSliderProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select name="size" onchange="changeSliderProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Value Prefix</h4>
                            <input type="text" name="valuePrefix" placeholder="e.g., $, €..." oninput="changeSliderProp('valuePrefix', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Value Suffix</h4>
                            <input
                                type="text"
                                name="valueSuffix"
                                placeholder="e.g., %, px, °C..."
                                oninput="changeSliderProp('valueSuffix', this.value)"
                                value=""
                            />
                        </div>

                        <div class="control-group">
                            <h4>Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input name="isRange" type="checkbox" onchange="changeSliderProp('isRange', this.checked || false)" />
                                    <span>Range Mode</span>
                                </label>
                                <label class="toggle">
                                    <input name="tooltip" type="checkbox" onchange="changeSliderProp('tooltip', this.checked || false)" />
                                    <span>Show Tooltips</span>
                                </label>
                                <label class="toggle">
                                    <input name="hideValue" type="checkbox" onchange="changeSliderProp('hideValue', this.checked || false)" />
                                    <span>Hide Value</span>
                                </label>
                                <label class="toggle">
                                    <input name="disabled" type="checkbox" onchange="changeSliderProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Name (Form)</h4>
                            <input
                                name="name"
                                type="text"
                                placeholder="Form field name..."
                                oninput="changeSliderProp('name', this.value)"
                                value="demo-slider"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-slider component.</p>

                <h3>Basic Sliders</h3>
                <div class="component-showcase slider-showcase-vertical">
                    <mjo-slider label="Volume" min="0" max="100" value="75" valueSuffix="%" name="volume"></mjo-slider>
                    <mjo-slider label="Temperature" min="-10" max="40" value="22" valueSuffix="°C" name="temp" color="secondary"></mjo-slider>
                    <mjo-slider label="Price" min="10" max="1000" value="500" valuePrefix="$" name="price"></mjo-slider>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase slider-showcase-vertical">
                    <mjo-slider label="Small Slider" size="small" min="0" max="100" value="25" valueSuffix="%" name="small"></mjo-slider>
                    <mjo-slider label="Medium Slider" size="medium" min="0" max="100" value="50" valueSuffix="%" name="medium"></mjo-slider>
                    <mjo-slider label="Large Slider" size="large" min="0" max="100" value="75" valueSuffix="%" name="large"></mjo-slider>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase slider-showcase-vertical">
                    <mjo-slider label="Primary Color" color="primary" min="0" max="100" value="60" valueSuffix="%" name="primary"></mjo-slider>
                    <mjo-slider label="Secondary Color" color="secondary" min="0" max="100" value="40" valueSuffix="%" name="secondary"></mjo-slider>
                </div>

                <h3>Step Values</h3>
                <div class="component-showcase slider-showcase-vertical">
                    <mjo-slider label="Rating" min="0" max="5" step="0.5" value="4.5" valueSuffix=" stars" name="rating"></mjo-slider>
                    <mjo-slider label="Discount" min="0" max="100" step="5" value="15" valueSuffix="%" name="discount" color="secondary"></mjo-slider>
                    <mjo-slider label="Volume (10s)" min="0" max="100" step="10" value="70" name="volume10"></mjo-slider>
                </div>

                <h3>Range Sliders</h3>
                <div class="component-showcase slider-showcase-vertical">
                    <mjo-slider label="Price Range" min="0" max="1000" value="200-800" valuePrefix="$" isRange name="priceRange"></mjo-slider>
                    <mjo-slider
                        label="Temperature Range"
                        min="-10"
                        max="40"
                        value="18-25"
                        valueSuffix="°C"
                        isRange
                        color="secondary"
                        name="tempRange"
                    ></mjo-slider>
                    <mjo-slider label="Age Range" min="18" max="100" value="25-65" valueSuffix=" years" isRange name="ageRange"></mjo-slider>
                </div>

                <h3>With Tooltips</h3>
                <div class="component-showcase slider-showcase-vertical">
                    <mjo-slider label="Quality" min="0" max="100" value="85" valueSuffix="%" tooltip name="quality"></mjo-slider>
                    <mjo-slider label="Budget Range" min="100" max="2000" value="500-1500" valuePrefix="$" tooltip isRange name="budgetRange"></mjo-slider>
                </div>

                <h3>Hidden Value Display</h3>
                <div class="component-showcase slider-showcase-vertical">
                    <mjo-slider label="Brightness" min="0" max="100" value="50" hideValue name="brightness"></mjo-slider>
                    <mjo-slider label="Contrast" min="0" max="200" value="100" hideValue color="secondary" name="contrast"></mjo-slider>
                </div>

                <h3>Disabled State</h3>
                <div class="component-showcase slider-showcase-vertical">
                    <mjo-slider label="Disabled Single" min="0" max="100" value="30" valueSuffix="%" disabled name="disabled1"></mjo-slider>
                    <mjo-slider label="Disabled Range" min="0" max="100" value="20-80" valueSuffix="%" disabled isRange name="disabled2"></mjo-slider>
                </div>

                <h3>Accessibility Features</h3>
                <div class="component-showcase slider-showcase-vertical">
                    <mjo-slider
                        label="Accessible Slider"
                        min="0"
                        max="100"
                        value="50"
                        valueSuffix="%"
                        name="accessible1"
                        aria-describedby="slider-help"
                    ></mjo-slider>
                    <div id="slider-help" style="font-size: 0.875rem; color: #666; margin-top: 0.25rem;">
                        Use arrow keys to adjust value, Home/End for min/max, PageUp/PageDown for larger steps
                    </div>

                    <mjo-slider
                        label="Range with ARIA"
                        min="18"
                        max="65"
                        value="25-45"
                        valueSuffix=" years"
                        isRange
                        name="accessible2"
                        color="secondary"
                        aria-describedby="range-help"
                    ></mjo-slider>
                    <div id="range-help" style="font-size: 0.875rem; color: #666; margin-top: 0.25rem;">
                        Tab between handles, use keyboard navigation to adjust each handle independently
                    </div>
                </div>

                <h3>Form Integration</h3>
                <div class="component-showcase slider-showcase-vertical">
                    <form style="border: 1px solid #ddd; padding: 1rem; border-radius: 6px; background: #f9f9f9;">
                        <h4 style="margin-top: 0;">Settings Form</h4>

                        <mjo-slider label="Volume" min="0" max="100" value="75" valueSuffix="%" name="formVolume"></mjo-slider>

                        <mjo-slider label="Quality" min="1" max="10" value="7" name="formQuality" color="secondary"></mjo-slider>

                        <mjo-slider label="Price Range" min="0" max="500" value="100-300" valuePrefix="$" isRange name="formPriceRange"></mjo-slider>

                        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #ddd;">
                            <small>Form values are automatically synchronized with the slider values.</small>
                        </div>
                    </form>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(sliderTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/slider-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-slider.css"],
        });
    }
}
