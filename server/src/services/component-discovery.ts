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
    demoPath: string;
    hasVariants: boolean;
    tags: string[];
    isSystemComponent?: boolean;
}

/**
 * Detección inteligente de componentes de sistema basada en nombre
 */
function isSystemComponent(componentName: string): boolean {
    const systemKeywords = ["theme", "ionic"];
    return systemKeywords.some((keyword) => componentName.includes(keyword));
}

/**
 * Categorización inteligente basada en nombre del componente
 */
function getComponentCategory(componentName: string): string {
    if (isSystemComponent(componentName)) return "System";

    // Categorías basadas en patrones de nombres
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
 * Auto-genera metadatos para componentes basándose en archivos en /src/
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

            // Generar metadata completamente automática
            const baseMetadata: ComponentMetadata = {
                name: componentName,
                fileName: file,
                displayName: cleanName.replace(/^\w/, (c) => c.toUpperCase()),
                description: `Componente ${componentName}`,
                category: category,
                path: isSystem ? "" : `/component/${cleanName}`,
                demoPath: isSystem ? "" : `/component/${cleanName}`,
                hasVariants: !isSystem,
                tags: [cleanName],
                isSystemComponent: isSystem,
            };

            componentMetadata[componentName] = baseMetadata;
        }

        console.log(`🔧 Auto-generados ${Object.keys(componentMetadata).length} componentes`);
    } catch (error) {
        console.warn(`⚠️ Error auto-generando componentes: ${error}`);
        // Fallback mínimo si falla la auto-generación
        return {};
    }

    return componentMetadata;
}

/**
 * Metadatos de componentes (completamente auto-generados)
 */
const COMPONENT_METADATA: Record<string, ComponentMetadata> = autoGenerateComponentMetadata();

export class ComponentDiscovery {
    private components: ComponentMetadata[] = [];

    constructor() {
        this.loadComponentMetadata();
    }

    /**
     * Carga los metadatos de los componentes (auto-generados)
     */
    private loadComponentMetadata(): void {
        this.components = Object.values(COMPONENT_METADATA);

        const uiComponents = this.components.filter((c) => !c.isSystemComponent);
        const systemComponents = this.components.filter((c) => c.isSystemComponent);

        console.log(`🔍 Componentes UI descubiertos: ${uiComponents.map((c) => c.name).join(", ")}`);
        if (systemComponents.length > 0) {
            console.log(`🔧 Componentes Sistema: ${systemComponents.map((c) => c.name).join(", ")}`);
        }
        console.log(`📊 Total componentes: ${this.components.length} (${uiComponents.length} UI + ${systemComponents.length} Sistema)`);
    }

    /**
     * Obtiene todos los componentes disponibles
     */
    getComponents(): ComponentMetadata[] {
        return [...this.components];
    }

    /**
     * Obtiene solo componentes UI (excluye componentes de sistema)
     */
    getUIComponents(): ComponentMetadata[] {
        return this.components.filter((c) => !c.isSystemComponent);
    }

    /**
     * Obtiene solo componentes de sistema
     */
    getSystemComponents(): ComponentMetadata[] {
        return this.components.filter((c) => c.isSystemComponent);
    }

    /**
     * Obtiene un componente específico por nombre
     */
    getComponent(name: string): ComponentMetadata | undefined {
        return this.components.find((c) => c.name === name);
    }

    /**
     * Obtiene componentes por categoría
     */
    getComponentsByCategory(category: string): ComponentMetadata[] {
        return this.components.filter((c) => c.category === category);
    }

    /**
     * Busca componentes por etiquetas
     */
    searchComponentsByTag(tag: string): ComponentMetadata[] {
        return this.components.filter((c) => c.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())));
    }

    /**
     * Obtiene todas las categorías disponibles
     */
    getCategories(): string[] {
        return [...new Set(this.components.map((c) => c.category))];
    }

    /**
     * Verifica si un componente existe
     */
    hasComponent(name: string): boolean {
        return this.components.some((c) => c.name === name);
    }

    /**
     * Obtiene estadísticas de los componentes
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
     * Genera el índice de navegación para la página principal (solo componentes UI)
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
 * Instancia singleton del discovery service
 */
export const componentDiscovery = new ComponentDiscovery();
