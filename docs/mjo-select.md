# mjo-select

A customizable dropdown select component with search functionality and rich option support.

## Overview

The `mjo-select` component provides a sophisticated dropdown selection interface with support for icons, images, searching, and form integration. It works in conjunction with `mjo-option` elements to create flexible and user-friendly selection experiences.

## Basic Usage

### HTML

```html
<mjo-select label="Select an option" name="selection">
    <mjo-option value="option1">Option 1</mjo-option>
    <mjo-option value="option2">Option 2</mjo-option>
    <mjo-option value="option3">Option 3</mjo-option>
</mjo-select>
```

### Lit Element Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";

@customElement("example-select-basic")
export class ExampleSelectBasic extends LitElement {
    @state()
    private selectedValue = "";

    private handleChange(event: Event) {
        const select = event.target as any;
        this.selectedValue = select.value;
        console.log("Selected:", this.selectedValue);
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-select label="Choose a country" name="country" .value=${this.selectedValue} @change=${this.handleChange}>
                    <mjo-option value="us">United States</mjo-option>
                    <mjo-option value="ca">Canada</mjo-option>
                    <mjo-option value="mx">Mexico</mjo-option>
                    <mjo-option value="br">Brazil</mjo-option>
                    <mjo-option value="ar">Argentina</mjo-option>
                </mjo-select>

                ${this.selectedValue ? html` <p>Selected: <strong>${this.selectedValue}</strong></p> ` : ""}
            </div>
        `;
    }
}
```

## Select Variants and Styling

Configure select appearance with different sizes, colors, and styling options:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";

@customElement("example-select-variants")
export class ExampleSelectVariants extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <!-- Size Variants -->
                <div>
                    <h4>Sizes</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <mjo-select label="Small Select" size="small">
                            <mjo-option value="small1">Small Option 1</mjo-option>
                            <mjo-option value="small2">Small Option 2</mjo-option>
                        </mjo-select>

                        <mjo-select label="Medium Select" size="medium">
                            <mjo-option value="medium1">Medium Option 1</mjo-option>
                            <mjo-option value="medium2">Medium Option 2</mjo-option>
                        </mjo-select>

                        <mjo-select label="Large Select" size="large">
                            <mjo-option value="large1">Large Option 1</mjo-option>
                            <mjo-option value="large2">Large Option 2</mjo-option>
                        </mjo-select>
                    </div>
                </div>

                <!-- Color Variants -->
                <div>
                    <h4>Colors</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <mjo-select label="Primary Color" color="primary">
                            <mjo-option value="primary1">Primary Option 1</mjo-option>
                            <mjo-option value="primary2">Primary Option 2</mjo-option>
                        </mjo-select>

                        <mjo-select label="Secondary Color" color="secondary">
                            <mjo-option value="secondary1">Secondary Option 1</mjo-option>
                            <mjo-option value="secondary2">Secondary Option 2</mjo-option>
                        </mjo-select>
                    </div>
                </div>

                <!-- States -->
                <div>
                    <h4>States</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <mjo-select label="Normal Select">
                            <mjo-option value="normal1">Normal Option 1</mjo-option>
                            <mjo-option value="normal2">Normal Option 2</mjo-option>
                        </mjo-select>

                        <mjo-select label="Disabled Select" disabled>
                            <mjo-option value="disabled1">Disabled Option 1</mjo-option>
                            <mjo-option value="disabled2">Disabled Option 2</mjo-option>
                        </mjo-select>

                        <mjo-select label="Full Width Select" fullwidth>
                            <mjo-option value="full1">Full Width Option 1</mjo-option>
                            <mjo-option value="full2">Full Width Option 2</mjo-option>
                        </mjo-select>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Options with Icons and Images

Create rich options with icons and images:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AiOutlineUser, AiFillStar, AiOutlineMail, AiOutlinePhone } from "mjo-icons/ai";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";

@customElement("example-select-rich-options")
export class ExampleSelectRichOptions extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <!-- Icon Options -->
                <div>
                    <h4>Options with Icons</h4>
                    <mjo-select label="Contact Method" placeholder="Choose contact method">
                        <mjo-option value="email" .startIcon=${AiOutlineMail}>Email</mjo-option>
                        <mjo-option value="phone" .startIcon=${AiOutlinePhone}>Phone</mjo-option>
                        <mjo-option value="user" .startIcon=${AiOutlineUser}>In Person</mjo-option>
                        <mjo-option value="star" .startIcon=${AiFillStar} .endIcon=${AiFillStar}>Premium Contact</mjo-option>
                    </mjo-select>
                </div>

                <!-- Image Options -->
                <div>
                    <h4>Options with Images</h4>
                    <mjo-select label="Country" placeholder="Select country">
                        <mjo-option value="us" startImage="https://flagcdn.com/w20/us.png"> United States </mjo-option>
                        <mjo-option value="ca" startImage="https://flagcdn.com/w20/ca.png"> Canada </mjo-option>
                        <mjo-option value="gb" startImage="https://flagcdn.com/w20/gb.png"> United Kingdom </mjo-option>
                        <mjo-option value="fr" startImage="https://flagcdn.com/w20/fr.png"> France </mjo-option>
                    </mjo-select>
                </div>

                <!-- Mixed Content -->
                <div>
                    <h4>Mixed Content Options</h4>
                    <mjo-select label="Status" placeholder="Select status">
                        <mjo-option value="active" .startIcon=${AiFillStar} text="Active - Premium"></mjo-option>
                        <mjo-option value="pending" .startIcon=${AiOutlineUser} text="Pending Approval"></mjo-option>
                        <mjo-option value="inactive" text="Inactive"></mjo-option>
                    </mjo-select>
                </div>
            </div>
        `;
    }
}
```

## Searchable Select

Enable search functionality for large option lists:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";

@customElement("example-select-searchable")
export class ExampleSelectSearchable extends LitElement {
    @state()
    private countries = [
        { value: "us", name: "United States" },
        { value: "ca", name: "Canada" },
        { value: "mx", name: "Mexico" },
        { value: "br", name: "Brazil" },
        { value: "ar", name: "Argentina" },
        { value: "fr", name: "France" },
        { value: "de", name: "Germany" },
        { value: "it", name: "Italy" },
        { value: "es", name: "Spain" },
        { value: "gb", name: "United Kingdom" },
        { value: "jp", name: "Japan" },
        { value: "cn", name: "China" },
        { value: "in", name: "India" },
        { value: "au", name: "Australia" },
        { value: "nz", name: "New Zealand" },
    ];

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <!-- Basic Searchable -->
                <div>
                    <h4>Searchable Country Select</h4>
                    <mjo-select label="Country" placeholder="Search and select country" searchable helperText="Type to search through options">
                        ${this.countries.map((country) => html` <mjo-option value=${country.value}>${country.name}</mjo-option> `)}
                    </mjo-select>
                </div>

                <!-- Large Dataset Example -->
                <div>
                    <h4>Large Dataset with Search</h4>
                    <mjo-select label="Programming Language" placeholder="Search programming languages" searchable size="large">
                        <mjo-option value="javascript">JavaScript</mjo-option>
                        <mjo-option value="typescript">TypeScript</mjo-option>
                        <mjo-option value="python">Python</mjo-option>
                        <mjo-option value="java">Java</mjo-option>
                        <mjo-option value="csharp">C#</mjo-option>
                        <mjo-option value="cpp">C++</mjo-option>
                        <mjo-option value="rust">Rust</mjo-option>
                        <mjo-option value="go">Go</mjo-option>
                        <mjo-option value="swift">Swift</mjo-option>
                        <mjo-option value="kotlin">Kotlin</mjo-option>
                        <mjo-option value="php">PHP</mjo-option>
                        <mjo-option value="ruby">Ruby</mjo-option>
                        <mjo-option value="dart">Dart</mjo-option>
                        <mjo-option value="scala">Scala</mjo-option>
                        <mjo-option value="clojure">Clojure</mjo-option>
                    </mjo-select>
                </div>
            </div>
        `;
    }
}
```

## Clearable Select

Add clear functionality to reset selections:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";
import "mjo-litui/mjo-button";

@customElement("example-select-clearable")
export class ExampleSelectClearable extends LitElement {
    @state()
    private selectedPriority = "medium";

    @state()
    private selectedCategory = "";

    private clearPriority() {
        this.selectedPriority = "";
    }

    private resetToDefault() {
        this.selectedPriority = "medium";
        this.selectedCategory = "general";
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <!-- Clearable Select -->
                <mjo-select label="Priority Level" .value=${this.selectedPriority} clearabled helperText="Click the X to clear selection">
                    <mjo-option value="low">Low Priority</mjo-option>
                    <mjo-option value="medium">Medium Priority</mjo-option>
                    <mjo-option value="high">High Priority</mjo-option>
                    <mjo-option value="urgent">Urgent</mjo-option>
                </mjo-select>

                <!-- Another Clearable Select -->
                <mjo-select label="Category" .value=${this.selectedCategory} clearabled searchable placeholder="Choose a category">
                    <mjo-option value="general">General</mjo-option>
                    <mjo-option value="support">Support</mjo-option>
                    <mjo-option value="billing">Billing</mjo-option>
                    <mjo-option value="technical">Technical</mjo-option>
                    <mjo-option value="feature">Feature Request</mjo-option>
                </mjo-select>

                <!-- Control Buttons -->
                <div style="display: flex; gap: 1rem;">
                    <mjo-button @click=${this.clearPriority} variant="ghost"> Clear Priority </mjo-button>
                    <mjo-button @click=${this.resetToDefault}> Reset to Defaults </mjo-button>
                </div>

                <!-- Current Values Display -->
                <div style="padding: 1rem; background: #f5f5f5; border-radius: 4px;">
                    <p><strong>Current Values:</strong></p>
                    <p>Priority: ${this.selectedPriority || "None selected"}</p>
                    <p>Category: ${this.selectedCategory || "None selected"}</p>
                </div>
            </div>
        `;
    }
}
```

## Form Integration

Use select components within forms with validation:

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoForm } from "mjo-litui/types";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-select-form")
export class ExampleSelectForm extends LitElement {
    @query("mjo-form")
    private form!: MjoForm;

    @state()
    private formData = {
        name: "",
        email: "",
        country: "",
        priority: "",
        category: "",
        language: "",
    };

    @state()
    private isSubmitting = false;

    private async handleSubmit() {
        if (!this.form.validate()) {
            console.log("Form validation failed");
            return;
        }

        this.isSubmitting = true;

        try {
            // Get form data
            const data = this.form.getFormData();
            console.log("Form submitted with data:", data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            alert("Form submitted successfully!");
            this.form.reset();
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit form");
        } finally {
            this.isSubmitting = false;
        }
    }

    private handleFormChange(event: Event) {
        const target = event.target as any;
        if (target.name) {
            this.formData = {
                ...this.formData,
                [target.name]: target.value,
            };
        }
    }

    render() {
        return html`
            <mjo-form @change=${this.handleFormChange}>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                    <!-- Personal Information -->
                    <div>
                        <h4>Personal Information</h4>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <mjo-textfield label="Full Name" name="name" required rules="required|min:2" helperText="Enter your full name"> </mjo-textfield>

                            <mjo-textfield label="Email" name="email" type="email" required rules="required|email" helperText="We'll use this to contact you">
                            </mjo-textfield>

                            <mjo-select
                                label="Country"
                                name="country"
                                required
                                rules="required"
                                placeholder="Select your country"
                                searchable
                                helperText="Choose your country of residence"
                            >
                                <mjo-option value="us">United States</mjo-option>
                                <mjo-option value="ca">Canada</mjo-option>
                                <mjo-option value="gb">United Kingdom</mjo-option>
                                <mjo-option value="de">Germany</mjo-option>
                                <mjo-option value="fr">France</mjo-option>
                                <mjo-option value="es">Spain</mjo-option>
                                <mjo-option value="it">Italy</mjo-option>
                                <mjo-option value="au">Australia</mjo-option>
                                <mjo-option value="jp">Japan</mjo-option>
                                <mjo-option value="br">Brazil</mjo-option>
                            </mjo-select>
                        </div>
                    </div>

                    <!-- Request Details -->
                    <div>
                        <h4>Request Details</h4>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <mjo-select
                                label="Priority Level"
                                name="priority"
                                required
                                rules="required"
                                clearabled
                                helperText="Select the urgency of your request"
                            >
                                <mjo-option value="low">Low - General inquiry</mjo-option>
                                <mjo-option value="medium">Medium - Standard request</mjo-option>
                                <mjo-option value="high">High - Important issue</mjo-option>
                                <mjo-option value="urgent">Urgent - Critical problem</mjo-option>
                            </mjo-select>

                            <mjo-select label="Category" name="category" required rules="required" searchable placeholder="Choose request category">
                                <mjo-option value="general">General Information</mjo-option>
                                <mjo-option value="support">Technical Support</mjo-option>
                                <mjo-option value="billing">Billing & Payments</mjo-option>
                                <mjo-option value="feature">Feature Request</mjo-option>
                                <mjo-option value="bug">Bug Report</mjo-option>
                                <mjo-option value="account">Account Management</mjo-option>
                                <mjo-option value="integration">Integration Help</mjo-option>
                            </mjo-select>

                            <mjo-select label="Preferred Language" name="language" clearabled helperText="Optional - for support communications">
                                <mjo-option value="en">English</mjo-option>
                                <mjo-option value="es">Español</mjo-option>
                                <mjo-option value="fr">Français</mjo-option>
                                <mjo-option value="de">Deutsch</mjo-option>
                                <mjo-option value="it">Italiano</mjo-option>
                                <mjo-option value="pt">Português</mjo-option>
                            </mjo-select>
                        </div>
                    </div>
                </div>

                <!-- Form Actions -->
                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <mjo-button type="button" variant="ghost" @click=${() => this.form.reset()}> Reset Form </mjo-button>

                    <mjo-button @click=${this.handleSubmit} .loading=${this.isSubmitting}>
                        ${this.isSubmitting ? "Submitting..." : "Submit Request"}
                    </mjo-button>
                </div>

                <!-- Current Form Data Display -->
                <details style="margin-top: 2rem;">
                    <summary>View Current Form Data</summary>
                    <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;">
${JSON.stringify(this.formData, null, 2)}
          </pre
                    >
                </details>
            </mjo-form>
        `;
    }
}
```

## Prefix/Suffix Text and Icons

Add contextual elements to enhance the select appearance:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AiOutlineGlobal, AiOutlineDollar, AiOutlinePhone } from "mjo-icons/ai";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";

@customElement("example-select-decorative")
export class ExampleSelectDecorative extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <!-- Currency Select with Prefix -->
                <div>
                    <h4>Currency Selection</h4>
                    <mjo-select label="Currency" .startIcon=${AiOutlineDollar} prefixText="$" helperText="Select your preferred currency">
                        <mjo-option value="usd">USD - US Dollar</mjo-option>
                        <mjo-option value="eur">EUR - Euro</mjo-option>
                        <mjo-option value="gbp">GBP - British Pound</mjo-option>
                        <mjo-option value="jpy">JPY - Japanese Yen</mjo-option>
                    </mjo-select>
                </div>

                <!-- Region Select with Icons -->
                <div>
                    <h4>Region Selection</h4>
                    <mjo-select label="Region" .startIcon=${AiOutlineGlobal} suffixText="region" helperText="Choose your operating region">
                        <mjo-option value="na">North America</mjo-option>
                        <mjo-option value="eu">Europe</mjo-option>
                        <mjo-option value="asia">Asia Pacific</mjo-option>
                        <mjo-option value="latam">Latin America</mjo-option>
                    </mjo-select>
                </div>

                <!-- Phone Type with Custom Styling -->
                <div>
                    <h4>Contact Method</h4>
                    <mjo-select label="Phone Type" .startIcon=${AiOutlinePhone} .endIcon=${AiOutlinePhone} color="secondary" helperText="How can we reach you?">
                        <mjo-option value="mobile">Mobile Phone</mjo-option>
                        <mjo-option value="home">Home Phone</mjo-option>
                        <mjo-option value="work">Work Phone</mjo-option>
                        <mjo-option value="other">Other</mjo-option>
                    </mjo-select>
                </div>
            </div>
        `;
    }
}
```

## Dynamic Options

Dynamically populate options based on user interactions:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";
import "mjo-litui/mjo-button";

@customElement("example-select-dynamic")
export class ExampleSelectDynamic extends LitElement {
    @state()
    private selectedCategory = "";

    @state()
    private selectedSubcategory = "";

    @state()
    private categories = [
        { value: "electronics", name: "Electronics" },
        { value: "clothing", name: "Clothing" },
        { value: "books", name: "Books" },
        { value: "sports", name: "Sports" },
    ];

    @state()
    private subcategories: Record<string, { value: string; name: string }[]> = {
        electronics: [
            { value: "phones", name: "Smartphones" },
            { value: "laptops", name: "Laptops" },
            { value: "tablets", name: "Tablets" },
            { value: "accessories", name: "Accessories" },
        ],
        clothing: [
            { value: "shirts", name: "Shirts" },
            { value: "pants", name: "Pants" },
            { value: "shoes", name: "Shoes" },
            { value: "accessories", name: "Accessories" },
        ],
        books: [
            { value: "fiction", name: "Fiction" },
            { value: "nonfiction", name: "Non-Fiction" },
            { value: "technical", name: "Technical" },
            { value: "children", name: "Children's Books" },
        ],
        sports: [
            { value: "equipment", name: "Equipment" },
            { value: "apparel", name: "Apparel" },
            { value: "footwear", name: "Footwear" },
            { value: "nutrition", name: "Nutrition" },
        ],
    };

    private handleCategoryChange(event: Event) {
        const target = event.target as any;
        this.selectedCategory = target.value;
        this.selectedSubcategory = ""; // Reset subcategory when category changes
    }

    private handleSubcategoryChange(event: Event) {
        const target = event.target as any;
        this.selectedSubcategory = target.value;
    }

    private addNewCategory() {
        const name = prompt("Enter new category name:");
        if (name) {
            const value = name.toLowerCase().replace(/\s+/g, "_");
            this.categories = [...this.categories, { value, name }];
            this.subcategories = { ...this.subcategories, [value]: [] };
        }
    }

    private addSubcategory() {
        if (!this.selectedCategory) {
            alert("Please select a category first");
            return;
        }

        const name = prompt("Enter new subcategory name:");
        if (name) {
            const value = name.toLowerCase().replace(/\s+/g, "_");
            const newSubcategory = { value, name };

            this.subcategories = {
                ...this.subcategories,
                [this.selectedCategory]: [...this.subcategories[this.selectedCategory], newSubcategory],
            };
        }
    }

    private get availableSubcategories() {
        return this.selectedCategory ? this.subcategories[this.selectedCategory] || [] : [];
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <!-- Category Selection -->
                <mjo-select label="Category" .value=${this.selectedCategory} @change=${this.handleCategoryChange} placeholder="Choose a category" searchable>
                    ${this.categories.map((category) => html` <mjo-option value=${category.value}>${category.name}</mjo-option> `)}
                </mjo-select>

                <!-- Subcategory Selection (Dynamic) -->
                <mjo-select
                    label="Subcategory"
                    .value=${this.selectedSubcategory}
                    @change=${this.handleSubcategoryChange}
                    placeholder=${this.selectedCategory ? "Choose a subcategory" : "Select a category first"}
                    .disabled=${!this.selectedCategory}
                    searchable
                >
                    ${this.availableSubcategories.map((subcategory) => html` <mjo-option value=${subcategory.value}>${subcategory.name}</mjo-option> `)}
                </mjo-select>

                <!-- Dynamic Actions -->
                <div style="display: flex; gap: 1rem;">
                    <mjo-button @click=${this.addNewCategory} variant="ghost"> Add Category </mjo-button>
                    <mjo-button @click=${this.addSubcategory} variant="ghost" .disabled=${!this.selectedCategory}> Add Subcategory </mjo-button>
                </div>

                <!-- Selection Display -->
                <div style="padding: 1rem; background: #f5f5f5; border-radius: 4px;">
                    <h4>Current Selection:</h4>
                    <p><strong>Category:</strong> ${this.selectedCategory || "None selected"}</p>
                    <p><strong>Subcategory:</strong> ${this.selectedSubcategory || "None selected"}</p>

                    ${this.selectedCategory ? html` <p><strong>Available Subcategories:</strong> ${this.availableSubcategories.length}</p> ` : ""}
                </div>
            </div>
        `;
    }
}
```

## Theme Customization

### Using mjo-theme

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";

@customElement("example-select-theming")
export class ExampleSelectTheming extends LitElement {
    render() {
        return html`
            <mjo-theme
                .theme=${{
                    select: {
                        backgroundColor: "#f8f9fa",
                        borderColor: "#dee2e6",
                        borderColorHover: "#adb5bd",
                        radius: "8px",
                        fontSize: "1rem",
                        optionPadding: "12px",
                        optionPreselectedBackgroundColor: "#e3f2fd",
                        optionSelectedPrimaryColor: "#1976d2",
                        optionFontSize: "0.9rem",
                    },
                }}
            >
                <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem;">
                    <h3>Custom Themed Select</h3>

                    <mjo-select label="Themed Select" placeholder="Custom styling">
                        <mjo-option value="option1">Styled Option 1</mjo-option>
                        <mjo-option value="option2">Styled Option 2</mjo-option>
                        <mjo-option value="option3">Styled Option 3</mjo-option>
                        <mjo-option value="option4">Styled Option 4</mjo-option>
                    </mjo-select>

                    <mjo-select label="Secondary Themed" color="secondary" searchable placeholder="Secondary color scheme">
                        <mjo-option value="secondary1">Secondary Option 1</mjo-option>
                        <mjo-option value="secondary2">Secondary Option 2</mjo-option>
                        <mjo-option value="secondary3">Secondary Option 3</mjo-option>
                    </mjo-select>
                </div>
            </mjo-theme>
        `;
    }
}
```

### Using ThemeMixin

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ThemeMixin } from "mjo-litui/mixins";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";

@customElement("example-select-theme-mixin")
export class ExampleSelectThemeMixin extends ThemeMixin(LitElement) {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem;">
                <h3>Component-Level Select Theming</h3>

                <mjo-select
                    label="Custom Component Theme"
                    .theme=${{
                        backgroundColor: "#fff3cd",
                        borderColor: "#ffc107",
                        borderColorHover: "#e0a800",
                        radius: "12px",
                        optionPreselectedBackgroundColor: "#fff8db",
                        optionSelectedPrimaryColor: "#856404",
                    }}
                    placeholder="Component-specific styling"
                >
                    <mjo-option value="custom1">Custom Option 1</mjo-option>
                    <mjo-option value="custom2">Custom Option 2</mjo-option>
                    <mjo-option value="custom3">Custom Option 3</mjo-option>
                </mjo-select>
            </div>
        `;
    }
}
```

## mjo-option Component

The `mjo-option` component represents individual options within a select dropdown.

### Option Properties

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AiFillStar, AiOutlineUser } from "mjo-icons/ai";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";

@customElement("example-option-properties")
export class ExampleOptionProperties extends LitElement {
    render() {
        return html`
            <mjo-select label="Option Examples" placeholder="See different option configurations">
                <!-- Basic option with value and text -->
                <mjo-option value="basic" text="Basic Option"> This text is ignored when text attribute is set </mjo-option>

                <!-- Option using slot content -->
                <mjo-option value="slot"> Option content from slot </mjo-option>

                <!-- Option with start icon -->
                <mjo-option value="start-icon" .startIcon=${AiFillStar}> Option with Start Icon </mjo-option>

                <!-- Option with end icon -->
                <mjo-option value="end-icon" .endIcon=${AiOutlineUser}> Option with End Icon </mjo-option>

                <!-- Option with both icons -->
                <mjo-option value="both-icons" .startIcon=${AiFillStar} .endIcon=${AiOutlineUser}> Option with Both Icons </mjo-option>

                <!-- Option with start image -->
                <mjo-option value="start-image" startImage="https://via.placeholder.com/20x20/007bff/ffffff?text=S"> Option with Start Image </mjo-option>

                <!-- Option with end image -->
                <mjo-option value="end-image" endImage="https://via.placeholder.com/20x20/28a745/ffffff?text=E"> Option with End Image </mjo-option>

                <!-- Pre-selected option -->
                <mjo-option value="preselected" selected> Pre-selected Option </mjo-option>
            </mjo-select>
        `;
    }
}
```

## Properties

### mjo-select Properties

| Name            | Type                             | Default     | Description                                  |
| --------------- | -------------------------------- | ----------- | -------------------------------------------- |
| `autoFocus`     | `boolean`                        | `false`     | Automatically focus the select when mounted  |
| `disabled`      | `boolean`                        | `false`     | Disable the select component                 |
| `fullwidth`     | `boolean`                        | `false`     | Make the select take full width of container |
| `name`          | `string`                         | -           | Form field name for form submission          |
| `placeholder`   | `string`                         | -           | Placeholder text when no option is selected  |
| `value`         | `string`                         | `""`        | Currently selected value                     |
| `label`         | `string`                         | -           | Label text displayed above the select        |
| `size`          | `"small" \| "medium" \| "large"` | `"medium"`  | Size variant of the select                   |
| `color`         | `"primary" \| "secondary"`       | `"primary"` | Color scheme for focus states                |
| `startIcon`     | `string`                         | -           | Icon displayed at the start of the select    |
| `endIcon`       | `string`                         | -           | Icon displayed at the end of the select      |
| `startImage`    | `string`                         | -           | Image displayed at the start of the select   |
| `endImage`      | `string`                         | -           | Image displayed at the end of the select     |
| `prefixText`    | `string`                         | -           | Text displayed before the input area         |
| `suffixText`    | `string`                         | -           | Text displayed after the input area          |
| `helperText`    | `string`                         | -           | Helper text displayed below the select       |
| `selectOnFocus` | `boolean`                        | `false`     | Select all text when focused                 |
| `clearabled`    | `boolean`                        | `false`     | Show a clear button to reset selection       |
| `searchable`    | `boolean`                        | `false`     | Enable search functionality in dropdown      |
| `dropDownTheme` | `MjoDropdownTheme`               | -           | Theme configuration for the dropdown         |
| `theme`         | `MjoSelectTheme`                 | `{}`        | Theme configuration for the select           |

### mjo-option Properties

| Name          | Type                       | Default     | Description                                          |
| ------------- | -------------------------- | ----------- | ---------------------------------------------------- |
| `value`       | `string`                   | `""`        | The value associated with this option                |
| `text`        | `string`                   | `""`        | Display text (falls back to slot content if not set) |
| `color`       | `"primary" \| "secondary"` | `"primary"` | Color scheme for selection states                    |
| `selected`    | `boolean`                  | `false`     | Whether this option is currently selected            |
| `preSelected` | `boolean`                  | `false`     | Whether this option is pre-highlighted               |
| `startIcon`   | `string`                   | `""`        | Icon displayed at the start of the option            |
| `endIcon`     | `string`                   | `""`        | Icon displayed at the end of the option              |
| `startImage`  | `string`                   | `""`        | Image displayed at the start of the option           |
| `endImage`    | `string`                   | `""`        | Image displayed at the end of the option             |
| `theme`       | `MjoSelectTheme`           | `{}`        | Theme configuration for the option                   |

## Methods

### mjo-select Methods

| Method                                          | Description                                    |
| ----------------------------------------------- | ---------------------------------------------- |
| `focus()`                                       | Focus the select input                         |
| `isOpen()`                                      | Returns whether the dropdown is currently open |
| `setValue(value: string, noDispatch?: boolean)` | Set the selected value programmatically        |
| `getValue()`                                    | Get the currently selected value               |

## Events

### mjo-select Events

| Event    | Description                           |
| -------- | ------------------------------------- |
| `change` | Fired when the selected value changes |
| `focus`  | Fired when the select receives focus  |
| `blur`   | Fired when the select loses focus     |

## CSS Custom Properties

### Select Styling

| Property                         | Default                                                       | Description           |
| -------------------------------- | ------------------------------------------------------------- | --------------------- |
| `--mjo-input-radius`             | `var(--mjo-radius, 5px)`                                      | Border radius         |
| `--mjo-input-border-color`       | `var(--mjo-border-color, #dddddd)`                            | Border color          |
| `--mjo-input-border-color-hover` | `#cccccc`                                                     | Border color on hover |
| `--mjo-input-background-color`   | `var(--mjo-background-color-high, #ffffff)`                   | Background color      |
| `--mjo-input-color`              | `var(--mjo-foreground-color, #222222)`                        | Text color            |
| `--mjo-input-font-size`          | `1em`                                                         | Font size             |
| `--mjo-input-padding`            | `calc(1em / 2 - 3px) calc(1em / 2 - 2px) calc(1em / 2 - 4px)` | Input padding         |
| `--mjo-input-primary-color`      | `var(--mjo-primary-color, #1aa8ed)`                           | Primary focus color   |
| `--mjo-input-secondary-color`    | `var(--mjo-secondary-color, #7dc717)`                         | Secondary focus color |

### Option Styling

| Property                                           | Default                                        | Description                     |
| -------------------------------------------------- | ---------------------------------------------- | ------------------------------- |
| `--mjo-select-option-padding`                      | `5px`                                          | Option padding                  |
| `--mjo-select-option-font-size`                    | `0.8em`                                        | Option font size                |
| `--mjo-select-option-preselected-background-color` | `var(--mjo-background-color-hover, #eeeeee)`   | Pre-selected background         |
| `--mjo-select-option-selected-primary-color`       | `var(--mjo-primary-foreground-color, white)`   | Selected text color (primary)   |
| `--mjo-select-option-selected-secondary-color`     | `var(--mjo-secondary-foreground-color, white)` | Selected text color (secondary) |

### Theme Interfaces

```ts
interface MjoSelectTheme extends MjoInputTheme {
    arrowColor?: string;
    optionPadding?: string;
    optionPreselectedBackgroundColor?: string;
    optionPreselectedColor?: string;
    optionSelectedPrimaryColor?: string;
    optionSelectedSecondaryColor?: string;
    optionFontSize?: string;
    optionPrimaryColor?: string;
    optionSecondaryColor?: string;
}

interface MjoInputTheme {
    backgroundColor?: string;
    borderColor?: string;
    borderColorHover?: string;
    borderStyle?: string;
    borderStyleFocus?: string;
    borderStyleHover?: string;
    borderWidth?: string;
    borderWidthFocus?: string;
    borderWidthHover?: string;
    boxShadow?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    helperColor?: string;
    helperFontSize?: string;
    helperFontWeight?: string;
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
    padding?: string;
    paddingSmall?: string;
    paddingLarge?: string;
    prefixTextBackgroundColor?: string;
    prefixTextColor?: string;
    radius?: string;
}
```

## Technical Notes

-   **Form Integration**: Automatically integrates with `mjo-form` for validation and data collection
-   **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, and Tab
-   **Search Functionality**: Built-in filtering when `searchable` is enabled
-   **Dynamic Options**: Options can be added/removed dynamically with automatic re-rendering
-   **Accessibility**: Full ARIA support with proper labeling and keyboard navigation
-   **Performance**: Uses efficient option rendering with change detection
-   **Theme Inheritance**: Options automatically inherit theme from parent select

## Accessibility

-   Full keyboard navigation support (Arrow keys, Enter, Escape, Tab)
-   Proper ARIA attributes for screen readers
-   Focus management and visual indicators
-   Support for assistive technologies
-   Semantic HTML structure with proper labeling

## Best Practices

-   Always provide meaningful labels for accessibility
-   Use helper text to guide users when needed
-   Enable search for lists with more than 10-15 options
-   Use icons and images to enhance option recognition
-   Implement proper validation when used in forms
-   Consider using clearable functionality for optional selections
-   Group related options logically
-   Provide default selections when appropriate

For additional theming options, see the [Theming Guide](./theming.md).
