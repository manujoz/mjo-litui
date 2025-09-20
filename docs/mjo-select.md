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
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";

@customElement("example-select-searchable")
export class ExampleSelectSearchable extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <mjo-select label="Country" placeholder="Search and select country" searchable helperText="Type to search through options">
                    <mjo-option value="us">United States</mjo-option>
                    <mjo-option value="ca">Canada</mjo-option>
                    <mjo-option value="mx">Mexico</mjo-option>
                    <mjo-option value="br">Brazil</mjo-option>
                    <mjo-option value="fr">France</mjo-option>
                    <mjo-option value="de">Germany</mjo-option>
                    <mjo-option value="jp">Japan</mjo-option>
                    <mjo-option value="au">Australia</mjo-option>
                </mjo-select>

                <mjo-select label="Programming Language" placeholder="Search programming languages" searchable size="large">
                    <mjo-option value="javascript">JavaScript</mjo-option>
                    <mjo-option value="typescript">TypeScript</mjo-option>
                    <mjo-option value="python">Python</mjo-option>
                    <mjo-option value="java">Java</mjo-option>
                    <mjo-option value="csharp">C#</mjo-option>
                    <mjo-option value="rust">Rust</mjo-option>
                    <mjo-option value="go">Go</mjo-option>
                </mjo-select>
            </div>
        `;
    }
}
```

## Form Integration

Use select components within forms with validation:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-option";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-select-form")
export class ExampleSelectForm extends LitElement {
    @state()
    private formData = {
        name: "",
        email: "",
        country: "",
        department: "",
        priority: "",
    };

    private handleSubmit(event: Event) {
        event.preventDefault();
        console.log("Form submitted:", this.formData);
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
            <mjo-form @submit=${this.handleSubmit} @change=${this.handleFormChange}>
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <mjo-textfield label="Full Name" name="name" required></mjo-textfield>

                    <mjo-textfield label="Email" name="email" type="email" required></mjo-textfield>

                    <mjo-select label="Country" name="country" required placeholder="Select your country" searchable>
                        <mjo-option value="us">United States</mjo-option>
                        <mjo-option value="ca">Canada</mjo-option>
                        <mjo-option value="gb">United Kingdom</mjo-option>
                        <mjo-option value="de">Germany</mjo-option>
                        <mjo-option value="fr">France</mjo-option>
                    </mjo-select>

                    <mjo-select label="Department" name="department" required placeholder="Choose department">
                        <mjo-option value="engineering">Engineering</mjo-option>
                        <mjo-option value="design">Design</mjo-option>
                        <mjo-option value="marketing">Marketing</mjo-option>
                        <mjo-option value="sales">Sales</mjo-option>
                    </mjo-select>

                    <mjo-select label="Priority" name="priority" size="small">
                        <mjo-option value="low">Low</mjo-option>
                        <mjo-option value="medium">Medium</mjo-option>
                        <mjo-option value="high">High</mjo-option>
                    </mjo-select>

                    <mjo-button type="submit">Submit Form</mjo-button>
                </div>
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

| Name            | Type                             | Default     | Description                                     |
| --------------- | -------------------------------- | ----------- | ----------------------------------------------- |
| `autoFocus`     | `boolean`                        | `false`     | Automatically focus the select when mounted     |
| `disabled`      | `boolean`                        | `false`     | Disable the select component                    |
| `required`      | `boolean`                        | `false`     | Mark the select as required for form validation |
| `fullwidth`     | `boolean`                        | `false`     | Make the select take full width of container    |
| `name`          | `string`                         | -           | Form field name for form submission             |
| `placeholder`   | `string`                         | -           | Placeholder text when no option is selected     |
| `value`         | `string`                         | `""`        | Currently selected value                        |
| `label`         | `string`                         | -           | Label text displayed above the select           |
| `size`          | `"small" \| "medium" \| "large"` | `"medium"`  | Size variant of the select                      |
| `color`         | `"primary" \| "secondary"`       | `"primary"` | Color scheme for focus states                   |
| `startIcon`     | `string`                         | -           | Icon displayed at the start of the select       |
| `endIcon`       | `string`                         | -           | Icon displayed at the end of the select         |
| `startImage`    | `string`                         | -           | Image displayed at the start of the select      |
| `endImage`      | `string`                         | -           | Image displayed at the end of the select        |
| `prefixText`    | `string`                         | -           | Text displayed before the input area            |
| `suffixText`    | `string`                         | -           | Text displayed after the input area             |
| `helperText`    | `string`                         | -           | Helper text displayed below the select          |
| `selectOnFocus` | `boolean`                        | `false`     | Select all text when focused                    |
| `searchable`    | `boolean`                        | `false`     | Enable search functionality in dropdown         |
| `dropDownTheme` | `MjoDropdownTheme`               | -           | Theme configuration for the dropdown            |
| `theme`         | `MjoSelectTheme`                 | `{}`        | Theme configuration for the select              |

### ARIA Properties

The select component includes comprehensive ARIA support for accessibility:

| Name                   | Type                                     | Default | Description                           |
| ---------------------- | ---------------------------------------- | ------- | ------------------------------------- |
| `ariaDescribedby`      | `string`                                 | -       | ID(s) of elements that describe input |
| `ariaLabelledby`       | `string`                                 | -       | ID(s) of elements that label input    |
| `ariaErrormessage`     | `string`                                 | -       | ID of error message element           |
| `ariaAutocomplete`     | `"none" \| "inline" \| "list" \| "both"` | -       | Indicates autocomplete behavior       |
| `ariaActivedescendant` | `string`                                 | -       | ID of active option during navigation |

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

| Method                                          | Description                                        |
| ----------------------------------------------- | -------------------------------------------------- |
| `focus()`                                       | Focus the select input                             |
| `blur()`                                        | Blur the select input                              |
| `checkValidity(): boolean`                      | Check validity according to validation constraints |
| `reportValidity(): boolean`                     | Report validity and display validation messages    |
| `setCustomValidity(message: string): void`      | Set a custom validation message                    |
| `get validationMessage(): string`               | Get the current validation message                 |
| `openDropdown(): void`                          | Open the select dropdown                           |
| `closeDropdown(): void`                         | Close the select dropdown                          |
| `toggleDropdown(): void`                        | Toggle the select dropdown open/closed state       |
| `getSelectedOption(): MjoOption \| null`        | Get the currently selected option element          |
| `getOptions(): MjoOption[]`                     | Get all available option elements                  |
| `filterOptions(query: string): void`            | Filter options based on a search query             |
| `resetFilter(): void`                           | Reset the filter to show all options               |
| `isOpen(): boolean`                             | Check if the dropdown is currently open            |
| `setValue(value: string, noDispatch?: boolean)` | Set the selected value programmatically            |
| `getValue(): string`                            | Get the currently selected value                   |

## Events

### mjo-select Events

| Event                         | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| `mjo-select:change`           | Fired when the selected value changes with detail data |
| `mjo-select:open`             | Fired when the dropdown opens                          |
| `mjo-select:close`            | Fired when the dropdown closes                         |
| `mjo-select:search`           | Fired when searching through options (searchable mode) |
| `mjo-select:focus`            | Fired when the select gains focus                      |
| `mjo-select:blur`             | Fired when the select loses focus                      |
| `mjo-select:option-preselect` | Fired when an option is preselected via keyboard       |
| `change`                      | Standard HTML change event                             |
| `focus`                       | Standard HTML focus event                              |
| `blur`                        | Standard HTML blur event                               |
| `invalid`                     | Fired when validation fails                            |

### Event Details

#### mjo-select:change

```typescript
detail: {
    element: MjoSelect;
    value: string;
    previousValue: string;
    option: MjoOption | null;
    previousOption: MjoOption | null;
}
```

#### mjo-select:open

```typescript
detail: {
    element: MjoSelect;
    value: string;
    optionsCount: number;
}
```

#### mjo-select:close

```typescript
detail: {
    element: MjoSelect;
    value: string;
    reason: "selection" | "escape" | "blur" | "clickOutside";
}
```

## CSS Custom Properties

### Select Input Styling

| Property                         | Default                                                       | Description                  |
| -------------------------------- | ------------------------------------------------------------- | ---------------------------- |
| `--mjo-input-border-radius`      | `var(--mjo-radius-medium, 5px)`                               | Border radius                |
| `--mjo-input-border-style`       | `solid`                                                       | Border style                 |
| `--mjo-input-border-width`       | `1px`                                                         | Border width                 |
| `--mjo-input-border-color`       | `var(--mjo-border-color, #dddddd)`                            | Default border color         |
| `--mjo-input-border-style-hover` | `solid`                                                       | Border style on hover        |
| `--mjo-input-border-width-hover` | `1px`                                                         | Border width on hover        |
| `--mjo-input-border-color-hover` | `#cccccc`                                                     | Border color on hover        |
| `--mjo-input-border-style-focus` | `solid`                                                       | Border style on focus        |
| `--mjo-input-border-width-focus` | `1px`                                                         | Border width on focus        |
| `--mjo-input-background-color`   | `var(--mjo-background-color-card-low, #ffffff)`               | Background color             |
| `--mjo-input-box-shadow`         | `none`                                                        | Box shadow                   |
| `--mjo-input-color`              | `var(--mjo-foreground-color, #222222)`                        | Text color                   |
| `--mjo-input-font-size`          | `1em`                                                         | Font size                    |
| `--mjo-input-font-weight`        | `normal`                                                      | Font weight                  |
| `--mjo-input-font-family`        | `inherit`                                                     | Font family                  |
| `--mjo-input-padding`            | `calc(1em / 2 - 3px) calc(1em / 2 - 2px) calc(1em / 2 - 4px)` | Input padding                |
| `--mjo-input-padding-small`      | `calc(1em / 2 - 4px) calc(1em / 2)`                           | Input padding for small size |
| `--mjo-input-padding-large`      | `calc(1em / 2 - 2px) calc(1em / 2 + 3px) calc(1em / 2 - 3px)` | Input padding for large size |
| `--mjo-input-primary-color`      | `var(--mjo-primary-color, #1aa8ed)`                           | Primary focus color          |
| `--mjo-input-secondary-color`    | `var(--mjo-secondary-color, #7dc717)`                         | Secondary focus color        |

### Prefix/Suffix Text Styling

| Property                                   | Default                    | Description                  |
| ------------------------------------------ | -------------------------- | ---------------------------- |
| `--mjo-input-prefix-text-background-color` | `rgba(220, 220, 220, 0.5)` | Prefix text background color |
| `--mjo-input-prefix-text-color`            | `currentColor`             | Prefix text color            |

### Label Styling

| Property                         | Default           | Description       |
| -------------------------------- | ----------------- | ----------------- |
| `--mjo-select-label-font-size`   | `calc(1em * 0.8)` | Label font size   |
| `--mjo-select-label-font-weight` | `normal`          | Label font weight |
| `--mjo-select-label-color`       | `currentColor`    | Label color       |

### Helper Text Styling

| Property                         | Default                                         | Description             |
| -------------------------------- | ----------------------------------------------- | ----------------------- |
| `--mjo-input-helper-font-size`   | `calc(1em * 0.8)`                               | Helper text font size   |
| `--mjo-input-helper-font-weight` | `normal`                                        | Helper text font weight |
| `--mjo-input-helper-color`       | `var(--mjo-foreground-color-low, currentColor)` | Helper text color       |

### Option Styling

| Property                                           | Default                                        | Description                      |
| -------------------------------------------------- | ---------------------------------------------- | -------------------------------- |
| `--mjo-select-option-padding`                      | `5px`                                          | Option padding                   |
| `--mjo-select-option-font-size`                    | `0.8em`                                        | Option font size                 |
| `--mjo-select-option-preselected-background-color` | `var(--mjo-background-color-hover, #eeeeee)`   | Pre-selected option background   |
| `--mjo-select-option-preselected-color`            | `var(--mjo-foreground-color, currentColor)`    | Pre-selected option text color   |
| `--mjo-select-option-selected-primary-color`       | `var(--mjo-primary-foreground-color, white)`   | Selected option text (primary)   |
| `--mjo-select-option-selected-secondary-color`     | `var(--mjo-secondary-foreground-color, white)` | Selected option text (secondary) |

### Search Styling (when searchable is enabled)

| Property                          | Default                                                      | Description                 |
| --------------------------------- | ------------------------------------------------------------ | --------------------------- |
| `--mjo-dropdown-background-color` | `var(--mjo-background-color-low, white)`                     | Search container background |
| `--mjo-dropdown-box-shadow`       | `var(--mjo-box-shadow-1, 0px 2px 3px rgba(50, 50, 50, 0.5))` | Search container shadow     |

### Global Color Variables

These are used as fallbacks throughout the component:

| Property                          | Default   | Description           |
| --------------------------------- | --------- | --------------------- |
| `--mjo-color-error`               | `#d31616` | Error state color     |
| `--mjo-primary-color`             | `#1aa8ed` | Primary theme color   |
| `--mjo-secondary-color`           | `#7dc717` | Secondary theme color |
| `--mjo-foreground-color`          | `#222222` | Default text color    |
| `--mjo-background-color-card-low` | `#ffffff` | Default background    |
| `--mjo-border-color`              | `#dddddd` | Default border color  |

### CSS Parts

| Part                          | Description                                         |
| ----------------------------- | --------------------------------------------------- |
| `container`                   | The main select input container                     |
| `input`                       | The native input element (hidden for display)       |
| `label-container`             | The label container (via exportparts)               |
| `label-truncate-container`    | The label truncate container (via exportparts)      |
| `label-truncate-wrapper`      | The label truncate wrapper (via exportparts)        |
| `prefix-text`                 | Container for prefix text                           |
| `suffix-text`                 | Container for suffix text                           |
| `start-icon-container`        | Container for start icon                            |
| `start-icon`                  | The start icon element (via exportparts)            |
| `end-icon-container`          | Container for end icon                              |
| `end-icon`                    | The end icon element (via exportparts)              |
| `end-icon-option-container`   | Container for end icon from selected option         |
| `end-option-icon`             | The end icon from selected option (via exportparts) |
| `start-image-container`       | Container for start image                           |
| `start-image`                 | The start image element                             |
| `end-image-container`         | Container for end image                             |
| `end-image`                   | The end image element                               |
| `end-image-option-container`  | Container for end image from selected option        |
| `end-option-image`            | The end image from selected option                  |
| `select-dropdown-icon`        | The dropdown arrow icon                             |
| `helper-container`            | Helper container (via exportparts)                  |
| `helper-text-container`       | Helper text container (via exportparts)             |
| `helper-text-typography`      | Helper text typography (via exportparts)            |
| `helper-text-error-message`   | Error message element (via exportparts)             |
| `helper-text-success-message` | Success message element (via exportparts)           |
| `helper-text-icon`            | Helper text icon element (via exportparts)          |

## Technical Notes

- **Form Integration**: Automatically integrates with `mjo-form` for validation and data collection
- **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, and Tab
- **Search Functionality**: Built-in filtering when `searchable` is enabled
- **Dynamic Options**: Options can be added/removed dynamically with automatic re-rendering
- **Accessibility**: Full ARIA support with proper labeling and keyboard navigation
- **Performance**: Uses efficient option rendering with change detection
- **Theme Inheritance**: Options automatically inherit theme from parent select

## Accessibility

- Full keyboard navigation support (Arrow keys, Enter, Escape, Tab)
- Proper ARIA attributes for screen readers
- Focus management and visual indicators
- Support for assistive technologies
- Semantic HTML structure with proper labeling

## Best Practices

- Always provide meaningful labels for accessibility
- Use helper text to guide users when needed
- Enable search for lists with more than 10-15 options
- Use icons and images to enhance option recognition
- Implement proper validation when used in forms
- Consider using clearable functionality for optional selections
- Group related options logically
- Provide default selections when appropriate

For additional theming options, see the [Theming Guide](./theming.md).
