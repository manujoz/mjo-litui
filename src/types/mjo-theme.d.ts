export interface MjoThemeConfig {
    /** --mjo-radius-large */
    radiusSmall?: string;
    /** --mjo-radius-medium */
    radiusMedium?: string;
    /** --mjo-radius-small */
    radiusLarge?: string;
    /** --mjo-font-size-small */
    fontSizeSmall?: string;
    /** --mjo-font-size */
    fontSizeMedium?: string;
    /** --mjo-font-size-large */
    fontSizeLarge?: string;
    /** --mjo-font-weight-light */
    fontWeightLight?: string;
    /** --mjo-font-weight-regular */
    fontWeightRegular?: string;
    /** --mjo-font-weight-medium */
    fontWeightMedium?: string;
    /** --mjo-font-weight-bold */
    fontWeightBold?: string;
    /** --mjo-space-small */
    spaceSmall?: string;
    /** --mjo-space */
    spaceMedium?: string;
    /** --mjo-space-large */
    spaceLarge?: string;
    /** --mjo-space-xlarge */
    spaceXLarge?: string;
    /** --mjo-space-xxlarge */
    spaceXXLarge?: string;
    components?: {
        mjoTextfield?: MjoInputTheme;
        mjoSelect?: MjoSelectTheme;
        mjoTextarea?: MjoTextaraTheme;
        mjoButton?: MjoButtonTheme;
        mjoDropdown?: MjoDropdownTheme;
        mjoIcon?: MjoIconTheme;
        mjoRipple?: MjoRippleTheme;
        mjoSlider?: MjoSliderTheme;
        mjoIonic?: MjoIonicTheme;
    };
    colors?: {
        /** --mjo-color-white */
        white?: string;
        /** --mjo-color-black */
        black?: string;
        /** --mjo-color-error */
        error: string;
        /** --mjo-color-success */
        success: string;
        /** --mjo-color-warning */
        warning: string;
        /** --mjo-color-info */
        info: string;
        /** --mjo-color-blue, --mjo-color-blue-[50-900] */
        blue?: MjoThemeShadeStructure;
        /** --mjo-color-cyan, --mjo-color-cyan-[50-900] */
        red?: MjoThemeShadeStructure;
        /** --mjo-color-red, --mjo-color-red-[50-900] */
        green?: MjoThemeShadeStructure;
        /** --mjo-color-green, --mjo-color-green-[50-900] */
        yellow?: MjoThemeShadeStructure;
        /** --mjo-color-yellow, --mjo-color-yellow-[50-900] */
        purple?: MjoThemeShadeStructure;
        /** --mjo-color-purple, --mjo-color-purple-[50-900] */
        cyan?: MjoThemeShadeStructure;
        /** --mjo-color-cyan, --mjo-color-cyan-[50-900] */
        pink?: MjoThemeShadeStructure;
        /** --mjo-color-cyan, --mjo-color-cyan-[50-900] */
        gray?: MjoThemeShadeStructure;
    };
    dark?: MjoThemeMode;
    light?: MjoThemeMode;
}

type MjoThemeMode = {
    /** --mjo-primary-color, --mjo-primary-color-hover, --mjo-primary-color-[50-900] */
    primaryColor?: (MjoThemeShadeStructure & { hover?: string }) | string;
    /** --mjo-primary-foreground-color */
    primaryForegroundColor?: string;
    /** --mjo-secondary-color, -mjo-secondary-color-hover, --mjo-secondary-color-[50-900] */
    secondaryColor?: (MjoThemeShadeStructure & { hover?: string }) | string;
    /** --mjo-secondary-foreground-color */
    secondaryForegroundColor?: string;
    /** --mjo-border-color, --mjo-border-color-light, --mjo-border-color-dark */
    borderColor?: MjoThemeColorSmall | string;
    /** --mjo-background-color, --mjo-background-color-light, --mjo-background-color-dark */
    backgroundColor?: MjoThemeColorSmall | string;
    /** --mjo-foreground-color, --mjo-foreground-color-light, --mjo-foreground-color-dark */
    foregroundColor?: MjoThemeColorSmall | string;
    /** --mjo-box-shadow, --mjo-box-shadow-[215] */
    boxShadow?: MjoThemeBoxShadow;
    /** --mjo-disabled-color */
    disabledColor?: string;
    /** --mjo-disabled-foreground-color */
    disabledForegroundColor?: string;
};

type MjoThemeShadeStructure = {
    default?: string;
    alpha0?: string;
    alpha1?: string;
    alpha2?: string;
    alpha3?: string;
    alpha4?: string;
    alpha5?: string;
    alpha6?: string;
    alpha7?: string;
    alpha8?: string;
    alpha9?: string;
    "50"?: string;
    "100"?: string;
    "200"?: string;
    "300"?: string;
    "400"?: string;
    "500"?: string;
    "600"?: string;
    "700"?: string;
    "800"?: string;
    "900"?: string;
};

type MjoThemeColorSmall = {
    default?: string;
    light?: string;
    dark?: string;
};

type MjoThemeBoxShadow = {
    default?: string;
    "1"?: string;
    "2"?: string;
    "3"?: string;
    "4"?: string;
    "5"?: string;
};

interface MjoInputTheme {
    /** --mjo-input-background-color */
    backgroundColor?: string;
    /** --mjo-input-border-color */
    borderColor?: string;
    /** --mjo-input-border-color-hover */
    borderColorHover?: string;
    /** --mjo-input-border-style */
    borderStyle?: string;
    /** --mjo-input-border-style-focus */
    borderStyleFocus?: string;
    /** --mjo-input-border-style-hover */
    borderStyleHover?: string;
    /** --mjo-input-border-width */
    borderWidth?: string;
    /** --mjo-input-border-width-focus */
    borderWidthFocus?: string;
    /** --mjo-input-border-width-hover */
    borderWidthHover?: string;
    /** --mjo-input-box-shadow */
    boxShadow?: string;
    /** --mjo-input-color */
    color?: string;
    /** --mjo-input-font-family */
    fontFamily?: string;
    /** --mjo-input-font-size */
    fontSize?: string;
    /** --mjo-input-font-weight */
    fontWeight?: string;
    /** --mjo-input-helper-color */
    helperColor?: string;
    /** --mjo-input-helper-font-size */
    helperFontSize?: string;
    /** --mjo-input-helper-font-weight */
    helperFontWeight?: string;
    /** --mjo-input-label-color */
    labelColor?: string;
    /** --mjo-input-label-font-size */
    labelFontSize?: string;
    /** --mjo-input-label-font-weight */
    labelFontWeight?: string;
    /** --mjo-input-padding */
    padding?: string;
    /** --mjo-input-padding-small */
    paddingSmall?: string;
    /** --mjo-input-padding-large */
    paddingLarge?: string;
    /** --mjo-input-prefix-text-background-color */
    prefixTextBackgroundColor?: string;
    /** --mjo-input-prefix-text-color */
    prefixTextColor?: string;
    /** --mjo-input-radius */
    radius?: string;
}

interface MjoSelectTheme {
    /** --mjo-select-arrow-color */
    arrowColor?: string;
    /** --mjo-select-option-padding */
    optionPadding?: string;
    /** --mjo-select-preselected-background-color */
    optionPreselectedBackgroundColor?: string;
    /** --mjo-select-preselected-color */
    optionPreselectedColor?: string;
    /** --mjo-select-selected-primary-color */
    optionSelectedPrimaryColor?: string;
    /** --mjo-select-selected-secondary-color */
    optionSelectedSecondaryColor?: string;
    /** --mjo-select-font-size */
    optionFontSize?: string;
}

interface MjoTextaraTheme {
    /** --mjo-textarea-padding */
    padding?: string;
    /** --mjo-textarea-padding-small */
    paddingSmall?: string;
    /** --mjo-textarea-padding-large */
    paddingLarge?: string;
}

interface MjoButtonTheme {
    /** --mjo-button-disabled-background-color */
    disabledBackgroundColor?: string;
    /** --mjo-button-disabled-foreground-color */
    disabledForegroundColor?: string;
    /** --mjo-button-font-family */
    fontFamily?: string;
    /** --mjo-button-font-size */
    fontSize?: string;
    /** --mjo-button-font-weight */
    fontWeight?: string;
    /** --mjo-button-padding */
    padding?: string;
    /** --mjo-button-primary-color */
    pirmaryColor?: string;
    /** --mjo-button-primary-border */
    primaryBorder?: string;
    /** --mjo-button-primary-color-hover */
    primaryColorHover?: string;
    /** --mjo-button-primary-foreground-color */
    primaryForegroundColor?: string;
    /** --mjo-button-radius */
    radius?: string;
    /** --mjo-button-secondary-border */
    secondaryBorder?: string;
    /** --mjo-button-secondary-color */
    secondaryColor?: string;
    /** --mjo-button-secondary-color-hover */
    secondaryColorHover?: string;
    /** --mjo-button-secondary-foreground-color */
    secondaryForegroundColor?: string;
}

interface MjoDropdownTheme {
    /** --mjo-dropdown-background-color */
    backgroundColor?: string;
    /** --mjo-dropdown-radius */
    radius?: string;
    /** --mjo-dropdown-box-shadow */
    boxShadow?: string;
}

interface MjoIconTheme {
    /** --mjo-icon-transition */
    transition?: string;
}

interface MjoRippleTheme {
    /** --mjo-ripple-color */
    color?: string;
    /** --mjo-ripple-opacity */
    opacity?: string;
}

interface MjoSliderTheme {
    /** --mjo-slider-background-color */
    backgroundColor?: string;
    /** --mjo-slider-radius */
    radius?: string;
    /** --mjo-slider-progress-color */
    progressColor?: string;
}

interface MjoIonicTheme {
    /** --mjo-ionic-color-one */
    colorOne?: string;
    /** --mjo-ionic-color-two */
    colorTwo?: string;
    /** --mjo-ionic-color-three */
    colorThree?: string;
    /** --mjo-ionic-radius */
    radius?: string;
}

interface MjoAvatarTheme {
    /** --mjo-avatar-background-color */
    backgroundColor?: string;
    /** --mjo-avatar-border-width */
    borderWith?: string;
    /** --mjo-avatar-fallback-color */
    fallbackColor?: string;
    /** --mjo-avatar-fallback-size-small */
    fallbackSizeSmall?: string;
    /** --mjo-avatar-fallback-size-medium */
    fallbackSizeMedium?: string;
    /** --mjo-avatar-fallback-size-large */
    fallbackSizeLarge?: string;
    /** --mjo-avatar-name-color */
    nameColor?: string;
    /** --mjo-avatar-radius-small */
    radiusSmall?: string;
    /** --mjo-avatar-radius-medium */
    radiusMedium?: string;
    /** --mjo-avatar-radius-large */
    radiusLarge?: string;
    /** --mjo-avatar-size-small */
    sizeSmall?: string;
    /** --mjo-avatar-size-medium */
    sizeMedium?: string;
    /** --mjo-avatar-size-large */
    sizeLarge?: string;
}
