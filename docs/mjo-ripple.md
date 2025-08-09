# mjo-ripple

A visual feedback component that creates Material Design-style ripple effects on click interactions.

## Overview

The `mjo-ripple` component provides smooth, animated ripple effects that emanate from the point where a user clicks. It's commonly used to enhance user interactions and provide visual feedback in buttons, cards, and other interactive elements. The ripple automatically positions itself to fill its parent container and responds to click events.

## Basic Usage

### HTML

```html
<div style="position: relative; padding: 2rem; border: 1px solid #ccc;">
    Click me for ripple effect
    <mjo-ripple></mjo-ripple>
</div>
```

### Lit Element Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-ripple";

@customElement("example-ripple-basic")
export class ExampleRippleBasic extends LitElement {
    render() {
        return html`
            <div class="interactive-card">
                <h3>Basic Ripple Effect</h3>
                <p>Click anywhere on this card to see the ripple effect in action.</p>
                <mjo-ripple></mjo-ripple>
            </div>
        `;
    }

    static styles = css`
        .interactive-card {
            position: relative;
            padding: 2rem;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            transition: box-shadow 0.2s ease;
        }

        .interactive-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
    `;
}
```

## Ripple Color Variants

Customize ripple colors to match your design theme:

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-ripple";

@customElement("example-ripple-colors")
export class ExampleRippleColors extends LitElement {
    render() {
        return html`
            <div class="grid">
                <!-- Default Ripple -->
                <div class="card default">
                    <h4>Default Ripple</h4>
                    <p>Uses currentColor with default opacity</p>
                    <mjo-ripple></mjo-ripple>
                </div>

                <!-- Blue Ripple -->
                <div class="card blue">
                    <h4>Blue Ripple</h4>
                    <p>Custom blue color with enhanced opacity</p>
                    <mjo-ripple style="--mo-ripple-color: #2563eb; --mo-ripple-opacity: 0.3;"></mjo-ripple>
                </div>

                <!-- Green Ripple -->
                <div class="card green">
                    <h4>Green Ripple</h4>
                    <p>Success color theme</p>
                    <mjo-ripple style="--mo-ripple-color: #059669; --mo-ripple-opacity: 0.25;"></mjo-ripple>
                </div>

                <!-- Red Ripple -->
                <div class="card red">
                    <h4>Red Ripple</h4>
                    <p>Error/warning color theme</p>
                    <mjo-ripple style="--mo-ripple-color: #dc2626; --mo-ripple-opacity: 0.35;"></mjo-ripple>
                </div>

                <!-- Purple Ripple -->
                <div class="card purple">
                    <h4>Purple Ripple</h4>
                    <p>Custom branded color</p>
                    <mjo-ripple style="--mo-ripple-color: #7c3aed; --mo-ripple-opacity: 0.28;"></mjo-ripple>
                </div>

                <!-- White Ripple on Dark -->
                <div class="card dark">
                    <h4>White Ripple</h4>
                    <p>Perfect for dark backgrounds</p>
                    <mjo-ripple style="--mo-ripple-color: white; --mo-ripple-opacity: 0.2;"></mjo-ripple>
                </div>
            </div>
        `;
    }

    static styles = css`
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }

        .card {
            position: relative;
            padding: 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            transition:
                transform 0.2s ease,
                box-shadow 0.2s ease;
            overflow: hidden;
        }

        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .card h4 {
            margin: 0 0 0.5rem 0;
            font-weight: 600;
        }

        .card p {
            margin: 0;
            font-size: 0.9rem;
            opacity: 0.8;
        }

        .default {
            background: #f8f9fa;
            color: #495057;
            border: 1px solid #dee2e6;
        }

        .blue {
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            color: #1e40af;
            border: 1px solid #93c5fd;
        }

        .green {
            background: linear-gradient(135deg, #d1fae5, #a7f3d0);
            color: #065f46;
            border: 1px solid #6ee7b7;
        }

        .red {
            background: linear-gradient(135deg, #fee2e2, #fecaca);
            color: #991b1b;
            border: 1px solid #f87171;
        }

        .purple {
            background: linear-gradient(135deg, #ede9fe, #ddd6fe);
            color: #5b21b6;
            border: 1px solid #c4b5fd;
        }

        .dark {
            background: linear-gradient(135deg, #374151, #4b5563);
            color: white;
            border: 1px solid #6b7280;
        }
    `;
}
```

## Interactive Elements with Ripple

Add ripple effects to various UI components:

```ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { AiFillHeart, AiOutlineHeart, AiFillStar, AiOutlineStar } from "mjo-icons/ai";
import "mjo-litui/mjo-ripple";
import "mjo-litui/mjo-icon";

@customElement("example-ripple-interactive")
export class ExampleRippleInteractive extends LitElement {
    @state()
    private liked = false;

    @state()
    private starred = false;

    @state()
    private selectedChip = "";

    private chips = [
        { id: "javascript", label: "JavaScript", color: "#f7df1e" },
        { id: "typescript", label: "TypeScript", color: "#3178c6" },
        { id: "react", label: "React", color: "#61dafb" },
        { id: "vue", label: "Vue", color: "#4fc08d" },
        { id: "angular", label: "Angular", color: "#dd0031" },
    ];

    private toggleLike() {
        this.liked = !this.liked;
    }

    private toggleStar() {
        this.starred = !this.starred;
    }

    private selectChip(chipId: string) {
        this.selectedChip = this.selectedChip === chipId ? "" : chipId;
    }

    render() {
        return html`
            <div class="container">
                <!-- Action Buttons -->
                <div class="section">
                    <h4>Action Buttons</h4>
                    <div class="action-buttons">
                        <button class="action-btn ${this.liked ? "liked" : ""}" @click=${this.toggleLike}>
                            <mjo-icon src=${this.liked ? AiFillHeart : AiOutlineHeart}></mjo-icon>
                            <span>${this.liked ? "Liked" : "Like"}</span>
                            <mjo-ripple style="--mo-ripple-color: #dc2626;"></mjo-ripple>
                        </button>

                        <button class="action-btn ${this.starred ? "starred" : ""}" @click=${this.toggleStar}>
                            <mjo-icon src=${this.starred ? AiFillStar : AiOutlineStar}></mjo-icon>
                            <span>${this.starred ? "Starred" : "Star"}</span>
                            <mjo-ripple style="--mo-ripple-color: #fbbf24;"></mjo-ripple>
                        </button>
                    </div>
                </div>

                <!-- Chip Selection -->
                <div class="section">
                    <h4>Technology Chips</h4>
                    <div class="chips">
                        ${this.chips.map(
                            (chip) => html`
                                <div
                                    class="chip ${this.selectedChip === chip.id ? "selected" : ""}"
                                    @click=${() => this.selectChip(chip.id)}
                                    style="--chip-color: ${chip.color};"
                                >
                                    ${chip.label}
                                    <mjo-ripple style="--mo-ripple-color: ${chip.color}; --mo-ripple-opacity: 0.3;"></mjo-ripple>
                                </div>
                            `,
                        )}
                    </div>
                </div>

                <!-- Card Grid -->
                <div class="section">
                    <h4>Interactive Cards</h4>
                    <div class="card-grid">
                        <div class="feature-card">
                            <div class="feature-icon">🚀</div>
                            <h5>Performance</h5>
                            <p>Lightning fast rendering with optimized animations</p>
                            <mjo-ripple style="--mo-ripple-color: #3b82f6;"></mjo-ripple>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon">🎨</div>
                            <h5>Customizable</h5>
                            <p>Fully themeable with CSS custom properties</p>
                            <mjo-ripple style="--mo-ripple-color: #8b5cf6;"></mjo-ripple>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon">♿</div>
                            <h5>Accessible</h5>
                            <p>Built with accessibility best practices in mind</p>
                            <mjo-ripple style="--mo-ripple-color: #10b981;"></mjo-ripple>
                        </div>
                    </div>
                </div>

                <!-- List Items -->
                <div class="section">
                    <h4>Menu List</h4>
                    <div class="menu-list">
                        <div class="menu-item">
                            <span class="menu-icon">📊</span>
                            <span class="menu-text">Dashboard</span>
                            <mjo-ripple></mjo-ripple>
                        </div>
                        <div class="menu-item">
                            <span class="menu-icon">⚙️</span>
                            <span class="menu-text">Settings</span>
                            <mjo-ripple></mjo-ripple>
                        </div>
                        <div class="menu-item">
                            <span class="menu-icon">👤</span>
                            <span class="menu-text">Profile</span>
                            <mjo-ripple></mjo-ripple>
                        </div>
                        <div class="menu-item">
                            <span class="menu-icon">📈</span>
                            <span class="menu-text">Analytics</span>
                            <mjo-ripple></mjo-ripple>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        .container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            max-width: 800px;
        }

        .section h4 {
            margin: 0 0 1rem 0;
            color: #374151;
        }

        /* Action Buttons */
        .action-buttons {
            display: flex;
            gap: 1rem;
        }

        .action-btn {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            transition: all 0.2s ease;
            overflow: hidden;
        }

        .action-btn:hover {
            border-color: #d1d5db;
            transform: translateY(-1px);
        }

        .action-btn.liked {
            border-color: #dc2626;
            color: #dc2626;
        }

        .action-btn.starred {
            border-color: #fbbf24;
            color: #fbbf24;
        }

        /* Chips */
        .chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .chip {
            position: relative;
            padding: 0.5rem 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            background: white;
            cursor: pointer;
            transition: all 0.2s ease;
            overflow: hidden;
            font-size: 0.875rem;
        }

        .chip:hover {
            border-color: var(--chip-color);
            transform: translateY(-1px);
        }

        .chip.selected {
            background: var(--chip-color);
            color: white;
            border-color: var(--chip-color);
        }

        /* Feature Cards */
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }

        .feature-card {
            position: relative;
            padding: 1.5rem;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: white;
            cursor: pointer;
            transition: all 0.2s ease;
            overflow: hidden;
            text-align: center;
        }

        .feature-card:hover {
            border-color: #d1d5db;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .feature-card h5 {
            margin: 0 0 0.5rem 0;
            font-weight: 600;
            color: #1f2937;
        }

        .feature-card p {
            margin: 0;
            font-size: 0.875rem;
            color: #6b7280;
            line-height: 1.4;
        }

        /* Menu List */
        .menu-list {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
            background: white;
        }

        .menu-item {
            position: relative;
            display: flex;
            align-items: center;
            padding: 1rem;
            cursor: pointer;
            transition: background-color 0.2s ease;
            border-bottom: 1px solid #f3f4f6;
            overflow: hidden;
        }

        .menu-item:last-child {
            border-bottom: none;
        }

        .menu-item:hover {
            background-color: #f9fafb;
        }

        .menu-icon {
            margin-right: 0.75rem;
            font-size: 1.125rem;
        }

        .menu-text {
            font-weight: 500;
            color: #374151;
        }
    `;
}
```

## Performance Optimization

Control ripple behavior for better performance:

```ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-ripple";

@customElement("example-ripple-performance")
export class ExampleRipplePerformance extends LitElement {
    @state()
    private fastClicks = 0;

    @state()
    private lastClickTime = 0;

    private handleFastClick() {
        const now = Date.now();
        const timeDiff = now - this.lastClickTime;

        this.fastClicks++;
        this.lastClickTime = now;

        console.log(`Click #${this.fastClicks}, Time since last: ${timeDiff}ms`);
    }

    private resetCounter() {
        this.fastClicks = 0;
    }

    render() {
        return html`
            <div class="container">
                <!-- Fast Click Test -->
                <div class="section">
                    <h4>Performance Test</h4>
                    <p>Test rapid clicking to see how ripple handles multiple fast interactions:</p>

                    <div class="test-area">
                        <button class="performance-btn" @click=${this.handleFastClick}>
                            Fast Click Test (${this.fastClicks} clicks)
                            <mjo-ripple style="--mo-ripple-color: #3b82f6; --mo-ripple-opacity: 0.2;"></mjo-ripple>
                        </button>

                        <button class="reset-btn" @click=${this.resetCounter}>
                            Reset Counter
                            <mjo-ripple style="--mo-ripple-color: #6b7280;"></mjo-ripple>
                        </button>
                    </div>
                </div>

                <!-- Multiple Ripples Demo -->
                <div class="section">
                    <h4>Multiple Simultaneous Ripples</h4>
                    <p>Click multiple areas quickly to see overlapping ripple effects:</p>

                    <div class="multi-ripple-container">
                        <div class="ripple-zone zone-1">
                            <span>Zone 1</span>
                            <mjo-ripple style="--mo-ripple-color: #ef4444;"></mjo-ripple>
                        </div>
                        <div class="ripple-zone zone-2">
                            <span>Zone 2</span>
                            <mjo-ripple style="--mo-ripple-color: #10b981;"></mjo-ripple>
                        </div>
                        <div class="ripple-zone zone-3">
                            <span>Zone 3</span>
                            <mjo-ripple style="--mo-ripple-color: #8b5cf6;"></mjo-ripple>
                        </div>
                        <div class="ripple-zone zone-4">
                            <span>Zone 4</span>
                            <mjo-ripple style="--mo-ripple-color: #f59e0b;"></mjo-ripple>
                        </div>
                    </div>
                </div>

                <!-- Optimized Large List -->
                <div class="section">
                    <h4>Optimized List Performance</h4>
                    <p>Large list with efficient ripple handling:</p>

                    <div class="large-list">
                        ${Array.from(
                            { length: 20 },
                            (_, i) => html`
                                <div class="list-item" data-index=${i}>
                                    <div class="item-content">
                                        <span class="item-number">${i + 1}</span>
                                        <span class="item-text">List Item ${i + 1}</span>
                                        <span class="item-badge">Badge</span>
                                    </div>
                                    <mjo-ripple style="--mo-ripple-color: currentColor; --mo-ripple-opacity: 0.1;"></mjo-ripple>
                                </div>
                            `,
                        )}
                    </div>
                </div>

                <!-- Performance Tips -->
                <div class="section">
                    <h4>Performance Best Practices</h4>
                    <div class="tips">
                        <div class="tip"><strong>✅ Automatic Cleanup:</strong> Ripples automatically remove themselves after animation</div>
                        <div class="tip"><strong>✅ Event Optimization:</strong> Uses efficient event delegation and cleanup</div>
                        <div class="tip"><strong>✅ CSS Animations:</strong> Hardware-accelerated CSS transforms for smooth performance</div>
                        <div class="tip"><strong>✅ Memory Management:</strong> Proper timeout cleanup prevents memory leaks</div>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        .container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            max-width: 600px;
        }

        .section h4 {
            margin: 0 0 0.5rem 0;
            color: #1f2937;
        }

        .section p {
            margin: 0 0 1rem 0;
            color: #6b7280;
        }

        /* Performance Test */
        .test-area {
            display: flex;
            gap: 1rem;
        }

        .performance-btn,
        .reset-btn {
            position: relative;
            padding: 1rem 2rem;
            border: 2px solid #3b82f6;
            border-radius: 8px;
            background: white;
            color: #3b82f6;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s ease;
            overflow: hidden;
        }

        .reset-btn {
            border-color: #6b7280;
            color: #6b7280;
        }

        .performance-btn:hover,
        .reset-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Multiple Ripples */
        .multi-ripple-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .ripple-zone {
            position: relative;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 600;
            color: white;
            transition: transform 0.2s ease;
            overflow: hidden;
        }

        .ripple-zone:hover {
            transform: scale(1.05);
        }

        .zone-1 {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        .zone-2 {
            background: linear-gradient(135deg, #10b981, #059669);
        }
        .zone-3 {
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }
        .zone-4 {
            background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        /* Large List */
        .large-list {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
            max-height: 300px;
            overflow-y: auto;
        }

        .list-item {
            position: relative;
            cursor: pointer;
            transition: background-color 0.2s ease;
            overflow: hidden;
        }

        .list-item:hover {
            background-color: #f9fafb;
        }

        .list-item:not(:last-child) {
            border-bottom: 1px solid #f3f4f6;
        }

        .item-content {
            display: flex;
            align-items: center;
            padding: 1rem;
            gap: 1rem;
        }

        .item-number {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            background: #f3f4f6;
            border-radius: 50%;
            font-size: 0.875rem;
            font-weight: 600;
            color: #6b7280;
        }

        .item-text {
            flex: 1;
            font-weight: 500;
            color: #374151;
        }

        .item-badge {
            padding: 0.25rem 0.75rem;
            background: #dbeafe;
            color: #1e40af;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        /* Tips */
        .tips {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .tip {
            padding: 1rem;
            background: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            border-radius: 4px;
            font-size: 0.875rem;
            line-height: 1.5;
        }
    `;
}
```

## Theme Customization

### Using mjo-theme

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-ripple";

@customElement("example-ripple-theming")
export class ExampleRippleTheming extends LitElement {
    render() {
        return html`
            <mjo-theme
                .theme=${{
                    ripple: {
                        color: "#8b5cf6",
                        opacity: "0.3",
                    },
                }}
            >
                <div class="themed-container">
                    <h3>Global Themed Ripples</h3>
                    <p>All ripples within this theme context use the same styling</p>

                    <div class="button-group">
                        <button class="themed-button">
                            Primary Action
                            <mjo-ripple></mjo-ripple>
                        </button>

                        <button class="themed-button secondary">
                            Secondary Action
                            <mjo-ripple></mjo-ripple>
                        </button>

                        <button class="themed-button outline">
                            Outline Action
                            <mjo-ripple></mjo-ripple>
                        </button>
                    </div>

                    <div class="card-container">
                        <div class="themed-card">
                            <h4>Themed Card 1</h4>
                            <p>Consistent ripple styling</p>
                            <mjo-ripple></mjo-ripple>
                        </div>

                        <div class="themed-card">
                            <h4>Themed Card 2</h4>
                            <p>Same ripple theme applied</p>
                            <mjo-ripple></mjo-ripple>
                        </div>
                    </div>
                </div>
            </mjo-theme>
        `;
    }

    static styles = css`
        .themed-container {
            padding: 2rem;
        }

        .themed-container h3 {
            margin: 0 0 0.5rem 0;
            color: #1f2937;
        }

        .themed-container p {
            margin: 0 0 2rem 0;
            color: #6b7280;
        }

        .button-group {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .themed-button {
            position: relative;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            background: #8b5cf6;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            overflow: hidden;
        }

        .themed-button:hover {
            background: #7c3aed;
            transform: translateY(-1px);
        }

        .themed-button.secondary {
            background: #6b7280;
        }

        .themed-button.secondary:hover {
            background: #4b5563;
        }

        .themed-button.outline {
            background: transparent;
            border: 2px solid #8b5cf6;
            color: #8b5cf6;
        }

        .themed-button.outline:hover {
            background: #8b5cf6;
            color: white;
        }

        .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }

        .themed-card {
            position: relative;
            padding: 1.5rem;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: white;
            cursor: pointer;
            transition: all 0.2s ease;
            overflow: hidden;
        }

        .themed-card:hover {
            border-color: #8b5cf6;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.15);
        }

        .themed-card h4 {
            margin: 0 0 0.5rem 0;
            color: #1f2937;
        }

        .themed-card p {
            margin: 0;
            color: #6b7280;
            font-size: 0.875rem;
        }
    `;
}
```

### Using ThemeMixin

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { ThemeMixin } from "mjo-litui/mixins";
import "mjo-litui/mjo-ripple";

@customElement("example-ripple-theme-mixin")
export class ExampleRippleThemeMixin extends ThemeMixin(LitElement) {
    render() {
        return html`
            <div class="container">
                <h3>Component-Level Ripple Theming</h3>

                <div class="examples">
                    <!-- Custom Red Theme -->
                    <div class="example-card">
                        <h4>Error Theme</h4>
                        <p>Custom red ripple for error states</p>
                        <mjo-ripple
                            .theme=${{
                                color: "#dc2626",
                                opacity: "0.4",
                            }}
                        >
                        </mjo-ripple>
                    </div>

                    <!-- Custom Success Theme -->
                    <div class="example-card">
                        <h4>Success Theme</h4>
                        <p>Green ripple for success actions</p>
                        <mjo-ripple
                            .theme=${{
                                color: "#059669",
                                opacity: "0.35",
                            }}
                        >
                        </mjo-ripple>
                    </div>

                    <!-- Custom Warning Theme -->
                    <div class="example-card">
                        <h4>Warning Theme</h4>
                        <p>Orange ripple for warning states</p>
                        <mjo-ripple
                            .theme=${{
                                color: "#d97706",
                                opacity: "0.3",
                            }}
                        >
                        </mjo-ripple>
                    </div>

                    <!-- Custom Subtle Theme -->
                    <div class="example-card">
                        <h4>Subtle Theme</h4>
                        <p>Low opacity for subtle interactions</p>
                        <mjo-ripple
                            .theme=${{
                                color: "#374151",
                                opacity: "0.15",
                            }}
                        >
                        </mjo-ripple>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        .container {
            padding: 2rem;
        }

        .container h3 {
            margin: 0 0 1.5rem 0;
            color: #1f2937;
        }

        .examples {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }

        .example-card {
            position: relative;
            padding: 1.5rem;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            background: white;
            cursor: pointer;
            transition: all 0.2s ease;
            overflow: hidden;
            text-align: center;
        }

        .example-card:hover {
            border-color: #d1d5db;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .example-card h4 {
            margin: 0 0 0.5rem 0;
            font-weight: 600;
            color: #1f2937;
        }

        .example-card p {
            margin: 0;
            font-size: 0.875rem;
            color: #6b7280;
            line-height: 1.4;
        }
    `;
}
```

## Integration with Other Components

Examples of ripple working with mjo-litui components:

```ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";
import "mjo-litui/mjo-ripple";

@customElement("example-ripple-integration")
export class ExampleRippleIntegration extends LitElement {
    @state()
    private showRipple = true;

    private toggleRipple() {
        this.showRipple = !this.showRipple;
    }

    render() {
        return html`
            <div class="container">
                <!-- Button Integration -->
                <div class="section">
                    <h4>Button Ripple Integration</h4>
                    <p>mjo-button automatically includes ripple effects:</p>

                    <div class="button-examples">
                        <mjo-button color="primary">Button with Ripple</mjo-button>
                        <mjo-button color="secondary" variant="ghost">Ghost Button</mjo-button>
                        <mjo-button color="success" variant="flat">Flat Button</mjo-button>
                        <mjo-button color="error" noink>Button without Ripple</mjo-button>
                    </div>
                </div>

                <!-- Manual Ripple Toggle -->
                <div class="section">
                    <h4>Manual Ripple Control</h4>
                    <p>Toggle ripple effects on custom elements:</p>

                    <div class="toggle-demo">
                        <button class="control-btn" @click=${this.toggleRipple}>${this.showRipple ? "Disable" : "Enable"} Ripple</button>

                        <div class="custom-element">
                            <span>Custom Interactive Element</span>
                            <span class="status">${this.showRipple ? "Ripple Enabled" : "Ripple Disabled"}</span>
                            ${this.showRipple ? html`<mjo-ripple></mjo-ripple>` : ""}
                        </div>
                    </div>
                </div>

                <!-- Card Integration -->
                <div class="section">
                    <h4>Card with Ripple</h4>
                    <p>Add interactive feedback to card components:</p>

                    <div class="card-grid">
                        <div class="interactive-card">
                            <div class="card-header">
                                <h5>Project Alpha</h5>
                                <span class="card-badge">Active</span>
                            </div>
                            <div class="card-body">
                                <p>A cutting-edge web application built with modern technologies and best practices.</p>
                                <div class="card-stats">
                                    <span>75% Complete</span>
                                    <span>Due: Dec 15</span>
                                </div>
                            </div>
                            <mjo-ripple style="--mo-ripple-color: #3b82f6; --mo-ripple-opacity: 0.2;"></mjo-ripple>
                        </div>

                        <div class="interactive-card">
                            <div class="card-header">
                                <h5>Project Beta</h5>
                                <span class="card-badge warning">Pending</span>
                            </div>
                            <div class="card-body">
                                <p>Mobile-first responsive design with advanced user interface components.</p>
                                <div class="card-stats">
                                    <span>45% Complete</span>
                                    <span>Due: Jan 20</span>
                                </div>
                            </div>
                            <mjo-ripple style="--mo-ripple-color: #f59e0b; --mo-ripple-opacity: 0.25;"></mjo-ripple>
                        </div>
                    </div>
                </div>

                <!-- Usage Guidelines -->
                <div class="section">
                    <h4>Integration Guidelines</h4>
                    <div class="guidelines">
                        <div class="guideline"><strong>✅ Do:</strong> Use ripple on interactive elements like buttons, cards, and list items</div>
                        <div class="guideline"><strong>✅ Do:</strong> Match ripple color to your design theme</div>
                        <div class="guideline"><strong>✅ Do:</strong> Ensure parent element has position: relative and overflow: hidden</div>
                        <div class="guideline"><strong>❌ Don't:</strong> Use ripple on non-interactive elements like text or images</div>
                        <div class="guideline"><strong>❌ Don't:</strong> Overuse high opacity ripples that might distract users</div>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        .container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            max-width: 800px;
        }

        .section h4 {
            margin: 0 0 0.5rem 0;
            color: #1f2937;
        }

        .section p {
            margin: 0 0 1rem 0;
            color: #6b7280;
        }

        /* Button Examples */
        .button-examples {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
        }

        /* Toggle Demo */
        .toggle-demo {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .control-btn {
            position: relative;
            align-self: flex-start;
            padding: 0.5rem 1rem;
            border: 1px solid #3b82f6;
            border-radius: 6px;
            background: white;
            color: #3b82f6;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
            overflow: hidden;
        }

        .control-btn:hover {
            background: #3b82f6;
            color: white;
        }

        .custom-element {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border: 2px dashed #d1d5db;
            border-radius: 8px;
            background: #f9fafb;
            cursor: pointer;
            transition: all 0.2s ease;
            overflow: hidden;
        }

        .custom-element:hover {
            border-color: #9ca3af;
            background: #f3f4f6;
        }

        .status {
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 500;
        }

        /* Card Grid */
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
        }

        .interactive-card {
            position: relative;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: white;
            cursor: pointer;
            transition: all 0.2s ease;
            overflow: hidden;
        }

        .interactive-card:hover {
            border-color: #d1d5db;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1rem 0.5rem;
        }

        .card-header h5 {
            margin: 0;
            font-weight: 600;
            color: #1f2937;
        }

        .card-badge {
            padding: 0.25rem 0.75rem;
            background: #dcfce7;
            color: #166534;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .card-badge.warning {
            background: #fef3c7;
            color: #92400e;
        }

        .card-body {
            padding: 0.5rem 1rem 1rem;
        }

        .card-body p {
            margin: 0 0 1rem 0;
            color: #6b7280;
            font-size: 0.875rem;
            line-height: 1.5;
        }

        .card-stats {
            display: flex;
            justify-content: space-between;
            font-size: 0.75rem;
            color: #9ca3af;
            font-weight: 500;
        }

        /* Guidelines */
        .guidelines {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .guideline {
            padding: 1rem;
            border-radius: 6px;
            font-size: 0.875rem;
            line-height: 1.5;
        }

        .guideline:has(strong:contains("✅")) {
            background: #f0fdf4;
            border-left: 4px solid #22c55e;
        }

        .guideline:has(strong:contains("❌")) {
            background: #fef2f2;
            border-left: 4px solid #ef4444;
        }
    `;
}
```

## Properties

| Name    | Type             | Default | Description                               |
| ------- | ---------------- | ------- | ----------------------------------------- |
| `theme` | `MjoRippleTheme` | `{}`    | Theme configuration for the ripple effect |

## Methods

| Method                           | Description                                                          |
| -------------------------------- | -------------------------------------------------------------------- |
| `handleClick(event: MouseEvent)` | Internal method that handles click events and creates ripple effects |

## Events

The ripple component doesn't emit custom events, but responds to click events on its parent element.

## CSS Custom Properties

| Property              | Default        | Description                                   |
| --------------------- | -------------- | --------------------------------------------- |
| `--mo-ripple-color`   | `currentColor` | Color of the ripple effect                    |
| `--mo-ripple-opacity` | `0.25`         | Opacity of the ripple effect during animation |

## Theme Interface

```ts
interface MjoRippleTheme {
    color?: string;
    opacity?: string;
}
```

## Technical Notes

-   **Automatic Positioning**: The ripple automatically positions itself to cover the entire parent element
-   **Click Origin**: Ripple effects emanate from the exact point where the user clicks
-   **Performance**: Uses CSS animations for hardware-accelerated performance
-   **Memory Management**: Automatically cleans up ripple elements after animation completes
-   **Event Handling**: Listens to parent click events and manages event delegation efficiently
-   **Parent Requirements**: Parent element should have `position: relative` and `overflow: hidden` for proper visual containment

## Accessibility

-   **Non-intrusive**: Purely visual effect that doesn't interfere with keyboard navigation
-   **Performance**: Lightweight animation that doesn't impact screen readers
-   **Optional**: Can be easily disabled for users who prefer reduced motion
-   **Semantic**: Doesn't change the semantic meaning of interactive elements

## Best Practices

-   Always ensure the parent element has `position: relative` and `overflow: hidden`
-   Use appropriate ripple colors that match your design theme
-   Keep opacity values reasonable (0.1 - 0.4) to avoid overwhelming the user
-   Consider disabling ripples on very small interactive elements
-   Use consistent ripple styling across similar interactive elements
-   Test performance with multiple rapid clicks to ensure smooth operation
-   Consider user preferences for reduced motion and provide disable options when needed

For additional theming options, see the [Theming Guide](./theming.md).
