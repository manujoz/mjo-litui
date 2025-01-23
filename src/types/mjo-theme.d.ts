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
    spaceXSmall?: string;
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
        mjoAlert?: MjoAlertTheme;
        mjoAvatar?: MjoAvatarTheme;
        mjoButton?: MjoButtonTheme;
        mjoCard?: MjoCardTheme;
        mjoCheckbox?: MjoCheckboxTheme;
        mjoChip?: MjoChipTheme;
        mjoColorPicker?: MjoColorPickerTheme;
        mjoDropdown?: MjoDropdownTheme;
        mjoIcon?: MjoIconTheme;
        mjoImage?: MjoImageTheme;
        mjoIonic?: MjoIonicTheme;
        mjoMessage?: MjoMessageTheme;
        mjoModal?: MjoModalTheme;
        mjoNotification?: MjoNotificationTheme;
        mjoRadio?: MjoRadioTheme;
        mjoRipple?: MjoRippleTheme;
        mjoSelect?: MjoSelectTheme;
        mjoSlider?: MjoSliderTheme;
        mjoSwitch?: MjoSwitchTheme;
        mjoTable?: MjoTableTheme;
        mjoTextarea?: MjoTextaraTheme;
        mjoTextfield?: MjoInputTheme;
        mjoTypography?: TypographyTheme;
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
    primaryForegroundColor?: MjoThemeColorSmall | string;
    /** --mjo-secondary-color, -mjo-secondary-color-hover, --mjo-secondary-color-[50-900] */
    secondaryColor?: (MjoThemeShadeStructure & { hover?: string }) | string;
    /** --mjo-secondary-foreground-color */
    secondaryForegroundColor?: MjoThemeColorSmall | string;
    /** --mjo-border-color, --mjo-border-color-light, --mjo-border-color-dark */
    borderColor?: MjoThemeColorSmall | string;
    /** --mjo-background-color, --mjo-background-color-light, --mjo-background-color-dark */
    backgroundColor?: ({ hover: string } & MjoThemeColorContrasts) | string;
    /** --mjo-background-color, --mjo-background-color-light, --mjo-background-color-dark */
    backgroundColorCard?: MjoThemeColorContrasts | string;
    /** --mjo-foreground-color, --mjo-foreground-color-light, --mjo-foreground-color-dark */
    foregroundColor?: MjoThemeColorContrasts | string;
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

type MjoThemeColorContrasts = {
    default?: string;
    xlow?: string;
    low?: string;
    high?: string;
    xhigh?: string;
};

type MjoThemeBoxShadow = {
    default?: string;
    "1"?: string;
    "2"?: string;
    "3"?: string;
    "4"?: string;
    "5"?: string;
};

export interface MjoAlertTheme {
    space?: string;
}

export interface MjoAvatarTheme {
    backgroundColor?: string;
    borderWidth?: string;
    fallbackColor?: string;
    fallbackSizeSmall?: string;
    fallbackSizeMedium?: string;
    fallbackSizeLarge?: string;
    nameColor?: string;
    radiusSmall?: string;
    radiusMedium?: string;
    radiusLarge?: string;
    sizeSmall?: string;
    sizeMedium?: string;
    sizeLarge?: string;
}

export interface MjoButtonTheme {
    disabledBackgroundColor?: string;
    disabledForegroundColor?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    padding?: string;
    pirmaryColor?: string;
    primaryBorder?: string;
    primaryColorHover?: string;
    primaryForegroundColor?: string;
    radius?: string;
    secondaryBorder?: string;
    secondaryColor?: string;
    secondaryColorHover?: string;
    secondaryForegroundColor?: string;
    flatPrimaryBackgroundColor?: string;
    flatPrimaryBackgroundColorHover?: string;
    flatPrimaryForegroundColor?: string;
    flatPrimaryForegroundColorHover?: string;
    flatSecondaryBackgroundColor?: string;
    flatSecondaryBackgroundColorHover?: string;
    flatSecondaryForegroundColor?: string;
    flatSecondaryForegroundColorHover?: string;
}

export interface MjoCheckboxTheme {
    borderColor?: string;
    checkedColor?: string;
    checkedBorderColor?: string;
    helperColor?: string;
    helperFontSize?: string;
    helperFontWeight?: string;
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
}

export interface MjoChipTheme {
    borderWidthSizeSmall?: string;
    borderWidthSizeMedium?: string;
    borderWidthSizeLarge?: string;
    fontSizeSmallSize?: string;
    fontSizeMediumSize?: string;
    fontSizeLargeSize?: string;
    gap?: string;
    lineHeightSmallSize?: string;
    lineHeightMediumSize?: string;
    lineHeightLargeSize?: string;
    padding?: string;
}

export interface MjoDropdownTheme {
    backgroundColor?: string;
    radius?: string;
    boxShadow?: string;
}

export interface MjoIconTheme {
    transition?: string;
}

export interface MjoImageTheme {
    errorBackgroundColor?: string;
    errorRadius?: string;
}

export interface MjoIonicTheme {
    colorOne?: string;
    colorTwo?: string;
    colorThree?: string;
    radius?: string;
}

export interface MjoInputTheme {
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

export interface MjoRadioTheme {
    borderColor?: string;
    checkedColor?: string;
    checkedBorderColor?: string;
    helperColor?: string;
    helperFontSize?: string;
    helperFontWeight?: string;
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
}

export interface MjoRippleTheme {
    color?: string;
    opacity?: string;
}

export interface MjoSliderTheme {
    backgroundColor?: string;
    radius?: string;
    progressColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
    primaryColor?: string;
    primaryForegroundColor?: string;
    secondaryColor?: string;
    secondaryForegroundColor?: string;
}

export interface MjoSelectTheme extends MjoInputTheme {
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

export interface MjoTableTheme {
    backgroundColor?: string;
    foregroundColor?: string;
    headerFontSize?: string;
    bodyFontSize?: string;
    cellForegroundColor?: string;
    cellEvenBackgroundColor?: string;
    cellEvenForegroundColor?: string;
    cellHeaderBackgroundColor?: string;
    cellHeaderForegroundColor?: string;
    footerBackgroundColor?: string;
    footerColor?: string;
    footerFontSize?: string;
    footerRowSelectedColor?: string;
    noDataOpacity?: string;
    noDataWidth?: string;
}

export interface MjoTextaraTheme extends MjoInputTheme {
    padding?: string;
    paddingSmall?: string;
    paddingLarge?: string;
}

export interface MjoColorPickerTheme {
    height?: string;
    sizeSmall?: string;
    sizeMedium?: string;
    sizeLarge?: string;
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: string;
    radius?: string;
    boxShadow?: string;
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
}

export interface TypographyTheme {
    h1FontSize?: string;
    h1LineHeight?: string;
    h2FontSize?: string;
    h2LineHeight?: string;
    h3FontSize?: string;
    h3LineHeight?: string;
    baseFontSize?: string;
    baseLineHeight?: string;
    body1FontSize?: string;
    body1LineHeight?: string;
    body2FontSize?: string;
    body2LineHeight?: string;
    body3FontSize?: string;
    body3LineHeight?: string;
    fontWeightLight?: string;
    fontWeightRegular?: string;
    fontWeightMedium?: string;
    fontWeightBold?: string;
}

export interface MjoSwitchTheme {
    sizeMedium?: string;
    sizeSmall?: string;
    sizeLarge?: string;
    backgroundColor?: string;
    backgroundColorChecked?: string;
    ballBackgroundColor?: string;
    ballBackgroundColorChecked?: string;
    radius?: string;
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: string;
    helperColor?: string;
    helperFontSize?: string;
    helperFontWeight?: string;
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
}

export interface MjoMessageTheme {
    backgroundColor?: string;
    boxShadow?: string;
    marginTop?: string;
    top?: string;
    radius?: string;
}

export interface MjoNotificationTheme {
    backgroundColor?: string;
    boxShadow?: string;
    radius?: string;
    margin?: string;
    titleFontSize?: string;
    titleFontWeight?: string;
    titleColor?: string;
    closeHoverBackgroundColor?: string;
    messageFontSize?: string;
    messageColor?: string;
}

export interface MjoCardTheme {
    backgroundColor?: string;
    backgroundColorLow?: string;
    backgroundColorHigh?: string;
    radiusSmall?: string;
    radiusMedium?: string;
    radiusLarge?: string;
    padding?: string;
    boxShadow?: string;
}

export interface MjoModalTheme {
    iconCloseSize?: string;
    titleBorderColor?: string;
    backgroundColor?: string;
    radius?: string;
    boxShadow?: string;
    width?: string;
}
