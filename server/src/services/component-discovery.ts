import { readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

export interface ComponentMetadata {
    name: string;
    fileName: string;
    displayName: string;
    description: string;
    category: string;
    path: string;
    hasVariants: boolean;
    tags: string[];
    isSystemComponent?: boolean;
}

/**
 * Intelligent detection of system components based on name
 */
function isSystemComponent(componentName: string): boolean {
    const systemKeywords = ["theme", "ionic"];
    return systemKeywords.some((keyword) => componentName.includes(keyword));
}

/**
 * Intelligent categorization based on component name
 */
function getComponentCategory(componentName: string): string {
    if (isSystemComponent(componentName)) return "System";

    // Categories based on name patterns
    if (componentName.includes("avatar")) return "Display";
    if (componentName.includes("chip")) return "Input";
    if (componentName.includes("button")) return "Input";
    if (componentName.includes("card")) return "Display";
    if (componentName.includes("modal") || componentName.includes("drawer")) return "Overlay";
    if (
        componentName.includes("form") ||
        componentName.includes("textfield") ||
        componentName.includes("textarea") ||
        componentName.includes("select") ||
        componentName.includes("checkbox") ||
        componentName.includes("radio")
    )
        return "Input";
    if (componentName.includes("table") || componentName.includes("grid")) return "Display";
    if (componentName.includes("notification") || componentName.includes("alert") || componentName.includes("message")) return "Feedback";

    return "Components";
}

/**
 * Auto-generates metadata for components based on files in /src/
 */
function autoGenerateComponentMetadata(): Record<string, ComponentMetadata> {
    const srcPath = join(__dirname, "../../../src");
    const componentMetadata: Record<string, ComponentMetadata> = {};

    try {
        const files = readdirSync(srcPath);
        const componentFiles = files.filter((file) => file.startsWith("mjo-") && file.endsWith(".ts") && file !== "mjo-ionic.ts");

        for (const file of componentFiles) {
            const componentName = file.replace(".ts", "");
            const cleanName = componentName.replace("mjo-", "");
            const isSystem = isSystemComponent(componentName);
            const category = getComponentCategory(componentName);

            // Fully automatic metadata generation
            const baseMetadata: ComponentMetadata = {
                name: componentName,
                fileName: file,
                displayName: cleanName.replace(/^\w/, (c) => c.toUpperCase()),
                description: `Component ${componentName}`,
                category: category,
                path: isSystem ? "" : `/component/${componentName}`,
                hasVariants: !isSystem,
                tags: [cleanName],
                isSystemComponent: isSystem,
            };

            componentMetadata[componentName] = baseMetadata;
        }
    } catch (error) {
        console.warn(`⚠️ Error auto-generating components: ${error}`);
        // Minimal fallback if auto-generation fails
        return {};
    }

    return componentMetadata;
}

/**
 * Component metadata (fully auto-generated)
 */
const COMPONENT_METADATA: Record<string, ComponentMetadata> = autoGenerateComponentMetadata();

export class ComponentDiscovery {
    private components: ComponentMetadata[] = [];

    constructor() {
        this.loadComponentMetadata();
    }

    /**
     * Loads the component metadata (auto-generated)
     */
    private loadComponentMetadata(): void {
        this.components = Object.values(COMPONENT_METADATA);
    }

    /**
     * Gets all available components
     */
    getComponents(): ComponentMetadata[] {
        return [...this.components];
    }

    /**
     * Gets only UI components (excludes system components)
     */
    getUIComponents(): ComponentMetadata[] {
        return this.components.filter((c) => !c.isSystemComponent);
    }

    /**
     * Gets only system components
     */
    getSystemComponents(): ComponentMetadata[] {
        return this.components.filter((c) => c.isSystemComponent);
    }

    /**
     * Gets a specific component by name
     */
    getComponent(name: string): ComponentMetadata | undefined {
        return this.components.find((c) => c.name === name);
    }

    getNextComponent(name: string): ComponentMetadata | undefined {
        const index = this.components.findIndex((c) => c.name === name);
        return index >= 0 && index < this.components.length - 1 ? this.components[index + 1] : this.components[0];
    }

    getPreviousComponent(name: string): ComponentMetadata | undefined {
        const index = this.components.findIndex((c) => c.name === name);
        return index > 0 ? this.components[index - 1] : this.components[this.components.length - 1];
    }

    /**
     * Gets components by category
     */
    getComponentsByCategory(category: string): ComponentMetadata[] {
        return this.components.filter((c) => c.category === category);
    }

    /**
     * Searches components by tags
     */
    searchComponentsByTag(tag: string): ComponentMetadata[] {
        return this.components.filter((c) => c.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())));
    }

    /**
     * Gets all available categories
     */
    getCategories(): string[] {
        return [...new Set(this.components.map((c) => c.category))];
    }

    /**
     * Checks if a component exists
     */
    hasComponent(name: string): boolean {
        return this.components.some((c) => c.name === name);
    }

    /**
     * Gets statistics about the components
     */
    getStats(): {
        totalComponents: number;
        componentsByCategory: Record<string, number>;
        componentsWithVariants: number;
    } {
        const componentsByCategory: Record<string, number> = {};

        this.components.forEach((c) => {
            componentsByCategory[c.category] = (componentsByCategory[c.category] || 0) + 1;
        });

        return {
            totalComponents: this.components.length,
            componentsByCategory,
            componentsWithVariants: this.components.filter((c) => c.hasVariants).length,
        };
    }

    /**
     * Generates the navigation index for the main page (UI components only)
     */
    generateNavigationIndex(): {
        categories: Array<{
            name: string;
            components: ComponentMetadata[];
        }>;
        allComponents: ComponentMetadata[];
    } {
        const uiComponents = this.getUIComponents();
        const categories = [...new Set(uiComponents.map((c) => c.category))];
        const categorizedComponents = categories.map((category) => ({
            name: category,
            components: uiComponents.filter((c) => c.category === category),
        }));

        return {
            categories: categorizedComponents,
            allComponents: uiComponents,
        };
    }
}

/**
 * Singleton instance of the discovery service
 */
export const componentDiscovery = new ComponentDiscovery();
