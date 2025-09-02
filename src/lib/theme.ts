import { MjoInputTheme, MjoThemeConfig, MjoThemeModes, MjoThemeShadeStructure } from "../types/mjo-theme";

import { defaultTheme } from "../theme/default-theme.js";

export const MjoThemeSSRGenerator = ({ userConfig = {}, themeMode = "light" }: { userConfig?: MjoThemeConfig; themeMode: MjoThemeModes }) => {
    const mergedConfig = structuredClone(defaultTheme);

    mergeConfig(mergedConfig, userConfig);

    let cssStyles = ":root {";
    cssStyles += applyThemeToCssVars({ config: mergedConfig, themeMode });
    cssStyles += "}";

    return `<style id="mjo-theme">${cssStyles}</style>`;
};

export const applyThemeToCssVars = ({
    config,
    prefix = "--mjo-",
    themeMode = "dark",
}: {
    config: MjoThemeConfig | MjoThemeConfig["colors"] | MjoThemeConfig["dark"];
    prefix?: string;
    themeMode: MjoThemeModes;
}) => {
    let cssStyles = "";

    for (const key in config) {
        const value = (config as MjoThemeConfig)[key as keyof MjoThemeConfig];
        if ((key === "dark" || key === "light") && themeMode !== key) {
            continue;
        }

        if (key === "colors") {
            cssStyles += applyColorsPaletteToCssVars(value as MjoThemeConfig["colors"]);
            continue;
        }

        if (typeof value === "object" && (value as MjoThemeShadeStructure)["default"]) {
            cssStyles += applyStylesFromObject(value as MjoThemeShadeStructure, `${prefix}${kamelCaseToKebabCase(key)}`);
            continue;
        }

        if (key === "components") {
            cssStyles += applyComponentsStyles(value as MjoThemeConfig["components"]);
            continue;
        }

        if (typeof value === "object") {
            cssStyles += applyThemeToCssVars({ config: value as MjoThemeConfig, themeMode });
            continue;
        }

        const cssVar = `${prefix}${kamelCaseToKebabCase(key)}`;

        cssStyles += `${cssVar}: ${value};`;
    }

    return cssStyles;
};

export const mergeConfig = (defaultConfig: MjoThemeConfig, userConfig: MjoThemeConfig) => {
    for (const key in userConfig) {
        if (typeof userConfig[key as keyof MjoThemeConfig] === "object" && defaultConfig[key as keyof MjoThemeConfig]) {
            mergeConfig(defaultConfig[key as keyof MjoThemeConfig] as MjoThemeConfig, userConfig[key as keyof MjoThemeConfig] as MjoThemeConfig);
        } else {
            defaultConfig[key as keyof MjoThemeConfig["colors"]] = userConfig[key as keyof MjoThemeConfig["colors"]];
        }
    }
};

const applyColorsPaletteToCssVars = (colors: MjoThemeConfig["colors"]) => {
    let cssStyles = "";
    for (const key in colors) {
        const value = colors[key as keyof MjoThemeConfig["colors"]] as string | MjoThemeConfig["colors"];

        if (typeof value === "object") {
            cssStyles += applyStylesFromObject(value as MjoThemeShadeStructure, `--mjo-color-${kamelCaseToKebabCase(key)}`);
        } else {
            cssStyles += `--mjo-color-${kamelCaseToKebabCase(key)}: ${value};`;
        }
    }

    return cssStyles;
};

const applyStylesFromObject = (color: MjoThemeShadeStructure, prefix: string) => {
    let cssStyles = "";
    for (const key in color) {
        let cssVar = `${prefix}-${kamelCaseToKebabCase(key)}`;
        if (key === "default") cssVar = `${prefix}`;

        cssStyles += `${cssVar}: ${color[key as keyof typeof color]};`;
    }

    return cssStyles;
};

const applyComponentsStyles = (components: MjoThemeConfig["components"]) => {
    let cssStyles = "";
    for (const key in components) {
        const component = components[key as keyof MjoThemeConfig["components"]] as MjoInputTheme;
        for (const componentKey in component) {
            const value = component[componentKey as keyof typeof component];
            cssStyles += `--${kamelCaseToKebabCase(key)}-${kamelCaseToKebabCase(componentKey)}: ${value};`;
        }
    }

    return cssStyles;
};

const kamelCaseToKebabCase = (str: string) => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};
