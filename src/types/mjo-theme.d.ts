export type MjoThemeModes = "light" | "dark";

export interface MjoThemeChangeEvent extends CustomEvent {
    detail: {
        theme: MjoThemeModes;
    };
}

export interface MjoThemeConfig {
    /** --mjo-radius-small */
    radiusSmall?: string;
    /** --mjo-radius-medium */
    radiusMedium?: string;
    /** --mjo-radius-large */
    radiusLarge?: string;
    /** --mjo-font-family */
    fontFamily?: string;
    /** --mjo-font-size-small */
    fontSizeSmall?: string;
    /** --mjo-font-size-xsmall */
    fontSizeXsmall?: string;
    /** --mjo-font-size-xxsmall */
    fontSizeXxsmall?: string;
    /** --mjo-font-size */
    fontSizeMedium?: string;
    /** --mjo-font-size-large */
    fontSizeLarge?: string;
    /** --mjo-font-size-xlarge */
    fontSizeXlarge?: string;
    /** --mjo-font-size-xxlarge */
    fontSizeXxlarge?: string;
    /** --mjo-font-size-title1 */
    fontSizeTitle1?: string;
    /** --mjo-font-size-title2 */
    fontSizeTitle2?: string;
    /** --mjo-font-size-title3 */
    fontSizeTitle3?: string;
    /** --mjo-font-weight-light */
    fontWeightLight?: string;
    /** --mjo-font-weight-regular */
    fontWeightRegular?: string;
    /** --mjo-font-weight-medium */
    fontWeightMedium?: string;
    /** --mjo-font-weight-bold */
    fontWeightBold?: string;
    /** --mjo-space-xxsmall */
    spaceXxsmall?: string;
    /** --mjo-space-xsmall */
    spaceXsmall?: string;
    /** --mjo-space-small */
    spaceSmall?: string;
    /** --mjo-space */
    spaceMedium?: string;
    /** --mjo-space-large */
    spaceLarge?: string;
    /** --mjo-space-xlarge */
    spaceXlarge?: string;
    /** --mjo-space-xxlarge */
    spaceXxlarge?: string;
    components?: {
        mjoAccordion?: MjoAccordionTheme;
        mjoAlert?: MjoAlertTheme;
        mjoAvatar?: MjoAvatarTheme;
        mjoBadge?: MjoBadgeTheme;
        mjoBreadcrumbs?: MjoBreadcrumbsTheme;
        mjoButton?: MjoButtonTheme;
        mjoCalendar?: MjoCalendarTheme;
        mjoCard?: MjoCardTheme;
        mjoCheckbox?: MjoCheckboxTheme;
        mjoChip?: MjoChipTheme;
        mjoColorPicker?: MjoColorPickerTheme;
        mjoDatePicker?: MjoDatePickerTheme;
        mjoDrawer?: MjoDrawerTheme;
        mjoDropdown?: MjoDropdownTheme;
        mjoIcon?: MjoIconTheme;
        mjoImage?: MjoImageTheme;
        mjoLink?: MjoLinkTheme;
        mjoListbox?: MjoListboxTheme;
        mjoMenuButton?: MjoMenuButtonTheme;
        mjoMessage?: MjoMessageTheme;
        mjoModal?: MjoModalTheme;
        mjoNotification?: MjoNotificationTheme;
        mjoPagination?: MjoPaginationTheme;
        mjoProgress?: MjoProgressTheme;
        mjoRadio?: MjoRadioTheme;
        mjoRipple?: MjoRippleTheme;
        mjoScrollshadow?: MjoScrollshadowTheme;
        mjoSelect?: MjoSelectTheme;
        mjoSlider?: MjoSliderTheme;
        mjoSwitch?: MjoSwitchTheme;
        mjoTable?: MjoTableTheme;
        mjoTabs?: MjoTabsTheme;
        mjoTextarea?: MjoTextareaTheme;
        mjoInput?: MjoInputTheme;
        mjoTypography?: TypographyTheme;
    };
    colors?: {
        /** --mjo-color-white */
        white?: string;
        /** --mjo-color-black */
        black?: string;
        /** --mjo-color-error */
        error?: string;
        /** --mjo-color-error-foreground */
        errorForeground?: string;
        /** --mjo-color-success */
        success?: string;
        /** --mjo-color-success-foreground */
        successForeground?: string;
        /** --mjo-color-warning */
        warning?: string;
        /** --mjo-color-warning-foreground */
        warningForeground?: string;
        /** --mjo-color-info */
        info?: string;
        /** --mjo-color-info-foreground */
        infoForeground?: string;
        /** --mjo-color-default */
        default?: string;
        /** --mjo-color-default-foreground */
        defaultForeground?: string;
        /** --mjo-color-gradient */
        gradient?: string;
        /** --mjo-color-gradient1 */
        gradient1?: string;
        /** --mjo-color-gradient2 */
        gradient2?: string;
        /** --mjo-color-gradient3 */
        gradient3?: string;
        /** --mjo-color-blue, --mjo-color-blue-[50-900] */
        blue?: MjoThemeShadeStructure;
        /** --mjo-color-red, --mjo-color-red-[50-900] */
        red?: MjoThemeShadeStructure;
        /** --mjo-color-green, --mjo-color-green-[50-900] */
        green?: MjoThemeShadeStructure;
        /** --mjo-color-yellow, --mjo-color-yellow-[50-900] */
        yellow?: MjoThemeShadeStructure;
        /** --mjo-color-purple, --mjo-color-purple-[50-900] */
        purple?: MjoThemeShadeStructure;
        /** --mjo-color-cyan, --mjo-color-cyan-[50-900] */
        cyan?: MjoThemeShadeStructure;
        /** --mjo-color-pink, --mjo-color-pink-[50-900] */
        pink?: MjoThemeShadeStructure;
        /** --mjo-color-gray, --mjo-color-gray-[50-900] */
        gray?: MjoThemeShadeStructure;
    };
    /** --mjo-primary-color, --mjo-primary-color-hover, --mjo-primary-color-[50-900] */
    primaryColor?: (MjoThemeShadeStructure & { hover?: string }) | string;
    /** --mjo-primary-foreground-color */
    primaryForegroundColor?: string;
    /** --mjo-secondary-color, --mjo-secondary-color-hover, --mjo-secondary-color-[50-900] */
    secondaryColor?: (MjoThemeShadeStructure & { hover?: string }) | string;
    /** --mjo-secondary-foreground-color */
    secondaryForegroundColor?: string;
    dark?: MjoThemeMode;
    light?: MjoThemeMode;
}

type MjoThemeMode = {
    /** --mjo-muted-color, --mjo-border-color-[low|high] */
    mutedColor?: MjoThemeColorContrasts | string;
    /** --mjo-muted-foreground, --mjo-border-color-[low|high] */
    mutedColorForeground?: MjoThemeColorContrasts | string;
    /** --mjo-border-color, --mjo-border-color-[low|high] */
    borderColor?: MjoThemeColorContrasts | string;
    /** --mjo-background-color, --mjo-background-color-hover, --mjo-background-color-[low|high] */
    backgroundColor?: ({ hover?: string } & MjoThemeColorContrasts) | string;
    /** --mjo-background-color-card, --mjo-background-color-card-[low|high] */
    backgroundColorCard?: MjoThemeColorContrasts | string;
    /** --mjo-foreground-color, --mjo-foreground-color-[low|high] */
    foregroundColor?: MjoThemeColorContrasts | string;
    /** --mjo-box-shadow, --mjo-box-shadow-[1-5] */
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
    "950"?: string;
};

type MjoThemeColorSmall = {
    default?: string;
    light?: string;
    dark?: string;
};

type MjoThemeColorContrasts = {
    default?: string;
    low?: string;
    high?: string;
};

type MjoThemeBoxShadow = {
    default?: string;
    "1"?: string;
    "2"?: string;
    "3"?: string;
    "4"?: string;
    "5"?: string;
};

export interface MjoAccordionTheme {
    backgroundColor?: string;
    borderColor?: string;
    padding?: string;
    paddingCompact?: string;
    borderRadius?: string;
    boxShadow?: string;
    gap?: string;
    itemTitlePadding?: string;
    itemTitlePaddingCompact?: string;
    itemTitleFontSize?: string;
    itemTitleColor?: string;
    itemTitleColorHover?: string;
    itemSubtitleColor?: string;
    itemContentPadding?: string;
    itemFocusColor?: string;
}

export interface MjoAlertTheme {
    borderWidth?: string;
    messageFontWeight?: string;
}

export interface MjoAvatarTheme {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: string;
    fallbackColor?: string;
    fallbackSizeSmall?: string;
    fallbackSizeMedium?: string;
    fallbackSizeLarge?: string;
    nameColor?: string;
    nameAutoBackgroundColor?: string;
    nameAutoForegroundColor?: string;
    radiusSmall?: string;
    radiusMedium?: string;
    radiusLarge?: string;
    sizeSmall?: string;
    sizeMedium?: string;
    sizeLarge?: string;
}

export interface MjoBadgeTheme {
    borderWidth?: string;
    fontSizeSmall?: string;
    fontSizeMedium?: string;
    fontSizeLarge?: string;
    animationDuration?: string;
    backgroundColor?: string;
    color?: string;
    boxShadow?: string;
}

export interface MjoButtonTheme {
    backgroundColor?: string;
    backgroundColorHover?: string;
    border?: string;
    borderRadius?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    gap?: string;
    loadingColor?: string;
    opacityHover?: string;
    padding?: string;
}

export interface MjoCheckboxTheme {
    borderColor?: string;
    checkedColor?: string;
    checkedBorderColor?: string;
    checkedIconColor?: string;
    disabledOpacity?: string;
    errorBackgroundColor?: string;
    errorBorderColor?: string;
    errorIconColor?: string;
    errorLabelColor?: string;
    focusColor?: string;
    focusOutlineColor?: string;
    helperColor?: string;
    helperFontSize?: string;
    helperFontWeight?: string;
    indeterminateBackgroundColor?: string;
    indeterminateBorderColor?: string;
    indeterminateColor?: string;
    indeterminateIconColor?: string;
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
    foregroundColor?: string;
    borderRadius?: string;
    boxShadow?: string;
}

export interface MjoIconTheme {
    transition?: string;
    sizeSmall?: string;
    sizeMedium?: string;
    sizeLarge?: string;
    sizeXl?: string;
    disabledOpacity?: string;
    clickableHoverScale?: string;
    clickableFocusOutline?: string;
    loadingSpinDuration?: string;
}

export interface MjoImageTheme {
    errorBackgroundColor?: string;
    errorRadius?: string;
    loadingBackgroundColor?: string;
    loadingSize?: string;
    loadingColor?: string;
    focusOutline?: string;
    disabledOpacity?: string;
    clickableHoverScale?: string;
    clickableCursor?: string;
}

export interface MjoLinkTheme {
    colorPrimary?: string;
    colorSecondary?: string;
    colorDefault?: string;
    colorDisabled?: string;
    fontFamily?: string;
    fontWeight?: string;
    textDecoration?: string;
    textDecorationHover?: string;
    focusOutline?: string;
    focusOutlineColor?: string;
    focusOutlineWidth?: string;
    focusOutlineOffset?: string;
    transition?: string;
}

export interface MjoListboxTheme {
    backgroundColor?: string;
    borderRadius?: string;
    itemGap?: string;
    itemMargin?: string;
    itemPadding?: string;
    itemCursor?: string;
    itemBorderRadius?: string;
    itemHoverBackgroundColor?: string;
    itemHoverForegroundColor?: string;
    iconTop?: string;
    sectionBorderColor?: string;
    sectionColor?: string;
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
    primaryColor?: string;
    secondaryColor?: string;
    borderRadius?: string;
}

export interface MjoRadioTheme {
    /** --mjo-radio-border-color */
    borderColor?: string;
    /** --mjo-radio-checked-color */
    checkedColor?: string;
    /** --mjo-radio-checked-border-color */
    checkedBorderColor?: string;
    /** --mjo-radio-checked-icon-color */
    checkedIconColor?: string;
    /** --mjo-radio-disabled-opacity */
    disabledOpacity?: string;
    /** --mjo-radio-error-background-color */
    errorBackgroundColor?: string;
    /** --mjo-radio-error-border-color */
    errorBorderColor?: string;
    /** --mjo-radio-error-icon-color */
    errorIconColor?: string;
    /** --mjo-radio-error-label-color */
    errorLabelColor?: string;
    /** --mjo-radio-focus-color */
    focusColor?: string;
    /** --mjo-radio-focus-outline-color */
    focusOutlineColor?: string;
    /** --mjo-radio-helper-color */
    helperColor?: string;
    /** --mjo-radio-helper-font-size */
    helperFontSize?: string;
    /** --mjo-radio-helper-font-weight */
    helperFontWeight?: string;
    /** --mjo-radio-label-color */
    labelColor?: string;
    /** --mjo-radio-label-font-size */
    labelFontSize?: string;
    /** --mjo-radio-label-font-weight */
    labelFontWeight?: string;
}

export interface MjoRippleTheme {
    color?: string;
    opacity?: string;
}

export interface MjoScrollshadowTheme {
    color?: string;
    size?: string;
    scrollbarThumbColor?: string;
    scrollbarTrack?: string;
    scrollbarWidth?: string;
}

export interface MjoSliderTheme {
    /** --mjo-slider-background-color */
    backgroundColor?: string;
    /** --mjo-slider-border-radius */
    borderRadius?: string;
    /** --mjo-slider-progress-color (deprecated: use primaryColor) */
    progressColor?: string;
    /** --mjo-slider-primary-color */
    primaryColor?: string;
    /** --mjo-slider-secondary-color */
    secondaryColor?: string;
    /** --mjo-slider-label-color */
    labelColor?: string;
    /** --mjo-slider-label-font-size */
    labelFontSize?: string;
    /** --mjo-slider-label-font-weight */
    labelFontWeight?: string;
    /** --mjo-slider-primary-foreground-color */
    primaryForegroundColor?: string;
    /** --mjo-slider-secondary-foreground-color */
    secondaryForegroundColor?: string;
    /** --mjo-slider-value-color */
    valueColor?: string;
    /** --mjo-slider-value-font-size */
    valueFontSize?: string;
    /** --mjo-slider-value-font-weight */
    valueFontWeight?: string;
    /** --mjo-slider-focus-outline-color */
    focusOutlineColor?: string;
    /** --mjo-slider-focus-outline-width */
    focusOutlineWidth?: string;
    /** --mjo-slider-focus-outline-offset */
    focusOutlineOffset?: string;
    /** --mjo-slider-focus-outline-radius */
    focusOutlineRadius?: string;
    /** --mjo-slider-handle-focus-ring-color */
    handleFocusRingColor?: string;
    /** --mjo-slider-handle-focus-ring-width */
    handleFocusRingWidth?: string;
    /** --mjo-slider-handle-disabled-color */
    handleDisabledColor?: string;
    /** --mjo-slider-tooltip-background-color (deprecated: use tooltipTextColor) */
    tooltipBackgroundColor?: string;
    /** --mjo-slider-tooltip-text-color (deprecated: use primaryForegroundColor/secondaryForegroundColor) */
    tooltipTextColor?: string;
    /** --mjo-slider-tooltip-radius */
    tooltipRadius?: string;
    /** --mjo-slider-tooltip-box-shadow */
    tooltipBoxShadow?: string;
    /** --mjo-slider-disabled-opacity */
    disabledOpacity?: string;
    /** --mjo-slider-background-color-high-contrast */
    backgroundColorHighContrast?: string;
    /** --mjo-slider-border-color-high-contrast */
    borderColorHighContrast?: string;
    /** --mjo-slider-primary-color-high-contrast */
    primaryColorHighContrast?: string;
    /** --mjo-slider-secondary-color-high-contrast */
    secondaryColorHighContrast?: string;
    /** --mjo-slider-focus-outline-width-high-contrast */
    focusOutlineWidthHighContrast?: string;
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

export interface MjoDatePickerTheme {
    panelBackgroundColor?: string;
    panelRadius?: string;
    panelBoxShadow?: string;
    panelPadding?: string;
    clearButtonColor?: string;
    highContrastBorder?: string;
}

export interface MjoTableTheme {
    backgroundColor?: string;
    foregroundColor?: string;
    borderRadius?: string;
    scrollbarThumbColor?: string;
    headerFontSize?: string;
    headerForegroundColor?: string;
    headerBorderColor?: string;
    headerPadding?: string;
    headerBackgroundColorStuck?: string;
    headerForegroundColorStuck?: string;
    bodyFontSize?: string;
    cellForegroundColor?: string;
    rowBackgroundColorEven?: string;
    rowForegroundColorEven?: string;
    rowBorderColor?: string;
    rowBackgroundColorHighlight?: string;
    rowForegroundColorHighlight?: string;
    rowBackgroundColorHover?: string;
    noDataPadding?: string;
    noDataForegroundColor?: string;
    captionFontSize?: string;
    captionForegroundColor?: string;
    captionPaddingBottom?: string;
}

export interface MjoTextareaTheme {
    /** --mjo-textarea-background-color */
    backgroundColor?: string;
    /** --mjo-textarea-border-color */
    borderColor?: string;
    /** --mjo-textarea-border-color-hover */
    borderColorHover?: string;
    /** --mjo-textarea-border-style */
    borderStyle?: string;
    /** --mjo-textarea-border-style-focus */
    borderStyleFocus?: string;
    /** --mjo-textarea-border-style-hover */
    borderStyleHover?: string;
    /** --mjo-textarea-border-width */
    borderWidth?: string;
    /** --mjo-textarea-border-width-focus */
    borderWidthFocus?: string;
    /** --mjo-textarea-border-width-hover */
    borderWidthHover?: string;
    /** --mjo-textarea-box-shadow */
    boxShadow?: string;
    /** --mjo-textarea-color */
    color?: string;
    /** --mjo-textarea-font-family */
    fontFamily?: string;
    /** --mjo-textarea-font-size */
    fontSize?: string;
    /** --mjo-textarea-font-weight */
    fontWeight?: string;
    /** --mjo-textarea-padding */
    padding?: string;
    /** --mjo-textarea-padding-small */
    paddingSmall?: string;
    /** --mjo-textarea-padding-large */
    paddingLarge?: string;
    /** --mjo-textarea-primary-color */
    primaryColor?: string;
    /** --mjo-textarea-radius */
    radius?: string;
    /** --mjo-textarea-secondary-color */
    secondaryColor?: string;
}

export interface MjoColorPickerTheme {
    sizeSmall?: string;
    sizeMedium?: string;
    sizeLarge?: string;
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: string;
    borderColorFocus?: string;
    borderRadius?: string;
    boxShadow?: string;
    boxShadowFocus?: string;
    transition?: string;
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
    valueColor?: string;
    valueFontSize?: string;
    valueFontWeight?: string;
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
    borderRadius?: string;
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: string;
    helperColor?: string;
    helperFontSize?: string;
    helperFontWeight?: string;
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
    focusColor?: string;
    focusOutlineColor?: string;
    disabledOpacity?: string;
}

export interface MjoMessageTheme {
    backgroundColor?: string;
    boxShadow?: string;
    marginTop?: string;
    top?: string;
    borderRadius?: string;
}

export interface MjoNotificationTheme {
    backgroundColor?: string;
    boxShadow?: string;
    borderRadius?: string;
    margin?: string;
    titleFontSize?: string;
    titleFontWeight?: string;
    titleColor?: string;
    closeHoverBackgroundColor?: string;
    messageFontSize?: string;
    messageColor?: string;
    focusOutline?: string;
    spaceVertical?: string;
    spaceHorizontal?: string;
}

export interface MjoCardTheme {
    border?: string;
    borderColor?: string;
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
    backdropBackgroundColor?: string;
    backdropFilter?: string;
    iconCloseSize?: string;
    iconCloseOffset?: string;
    iconCloseBackgroundColorHover?: string;
    titleBorderColor?: string;
    backgroundColor?: string;
    borderRadius?: string;
    boxShadow?: string;
    width?: string;
}

export interface MjoCalendarTheme {
    fontFamily?: string;
    background?: string;
    border?: string;
    borderRadius?: string;
    shadow?: string;
    padding?: string;
    paddingCompact?: string;
    weekDayColor?: string;
    weekDayFontWeight?: string;
    dayBorderRadius?: string;
    dayHoverBackground?: string;
    focusOutline?: string;
    todayBackground?: string;
    todayColor?: string;
    selectedBackground?: string;
    selectedColor?: string;
    rangeEndpointBackground?: string;
    rangeEndpointColor?: string;
    rangeBackground?: string;
    rangeColor?: string;
    disabledColor?: string;
    disabledBackground?: string;
    todayBackgroundSecondary?: string;
    todayColorSecondary?: string;
    selectedBackgroundSecondary?: string;
    selectedColorSecondary?: string;
    rangeBackgroundSecondary?: string;
    rangeColorSecondary?: string;
    pickerBackground?: string;
    pickerRadius?: string;
    pickerButtonBackground?: string;
    pickerButtonBorder?: string;
    pickerButtonRadius?: string;
    pickerButtonColor?: string;
    pickerButtonHoverBackground?: string;
    pickerButtonHoverBorder?: string;
    pickerButtonFocusOutline?: string;
    pickerButtonSelectedBackground?: string;
    pickerButtonSelectedBorder?: string;
    pickerButtonSelectedColor?: string;
    navBackground?: string;
    navBorder?: string;
    navRadius?: string;
    navColor?: string;
    navHoverBackground?: string;
    navHoverBorder?: string;
    navFocusOutline?: string;
    decadeLabelColor?: string;
    navButtonBorder?: string;
    navButtonColor?: string;
    selectorButtonHighlightColor?: string;
    eventOffset?: string;
    eventBackgroundColor?: string;
    eventForegroundColor?: string;
    eventSingleSize?: string;
    eventMultipleSize?: string;
    eventFontSize?: string;
    eventFontWeight?: string;
    foregroundColor?: string;
    foregroundColorLow?: string;
}

export interface MjoMenuButtonTheme {
    colorHover?: string;
}

export interface MjoPaginationTheme {
    /** --mjo-pagination-gap */
    gap?: string;
    /** --mjo-pagination-items-gap */
    itemsGap?: string;
    /** --mjo-pagination-container-padding */
    containerPadding?: string;
    /** --mjo-pagination-container-border-radius */
    containerBorderRadius?: string;
    /** --mjo-pagination-container-border */
    containerBorder?: string;
    /** --mjo-pagination-background-color */
    backgroundColor?: string;
    /** --mjo-pagination-font-family */
    fontFamily?: string;
    /** --mjo-pagination-font-size */
    fontSize?: string;
    /** --mjo-pagination-font-weight */
    fontWeight?: string;
    /** --mjo-pagination-active-font-weight */
    activeFontWeight?: string;
    /** --mjo-pagination-small-font-size */
    smallFontSize?: string;
    /** --mjo-pagination-large-font-size */
    largeFontSize?: string;
    /** --mjo-pagination-item-width */
    itemWidth?: string;
    /** --mjo-pagination-color */
    color?: string;
    /** --mjo-pagination-primary-color */
    primaryColor?: string;
    /** --mjo-pagination-secondary-color */
    secondaryColor?: string;
    /** --mjo-pagination-primary-foreground-color */
    primaryForegroundColor?: string;
    /** --mjo-pagination-secondary-foreground-color */
    secondaryForegroundColor?: string;
    /** --mjo-pagination-disabled-color */
    disabledColor?: string;
    /** --mjo-pagination-hover-background-color */
    hoverBackgroundColor?: string;
    /** --mjo-pagination-primary-color-hover */
    primaryColorHover?: string;
    /** --mjo-pagination-secondary-color-hover */
    secondaryColorHover?: string;
    /** --mjo-pagination-secondary-color-alpha1 */
    secondaryColorAlpha1?: string;
    /** --mjo-pagination-indicator-border-radius */
    indicatorBorderRadius?: string;
    /** --mjo-pagination-animation-duration */
    animationDuration?: string;
    /** --mjo-pagination-animation-timing */
    animationTiming?: string;
    /** --mjo-pagination-primary-color-alpha */
    primaryColorAlpha?: string;
    /** --mjo-pagination-secondary-color-alpha */
    secondaryColorAlpha?: string;
    /** --mjo-pagination-ellipsis-color */
    ellipsisColor?: string;
    /** --mjo-pagination-ellipsis-font-weight */
    ellipsisFontWeight?: string;
    /** --mjo-pagination-border-radius */
    borderRadius?: string;
    /** --mjo-pagination-nav-color */
    navColor?: string;
    /** --mjo-pagination-nav-min-width */
    navMinWidth?: string;
    /** --mjo-pagination-nav-padding */
    navPadding?: string;
    /** --mjo-pagination-nav-disabled-color */
    navDisabledColor?: string;
    /** --mjo-pagination-small-min-width */
    smallMinWidth?: string;
    /** --mjo-pagination-page-size-gap */
    pageSizeGap?: string;
    /** --mjo-pagination-page-size-font-size */
    pageSizeFontSize?: string;
    /** --mjo-pagination-page-size-color */
    pageSizeColor?: string;
    /** --mjo-pagination-select-background-color */
    selectBackgroundColor?: string;
    /** --mjo-pagination-select-border-color */
    selectBorderColor?: string;
    /** --mjo-pagination-select-border-radius */
    selectBorderRadius?: string;
    /** --mjo-pagination-select-color */
    selectColor?: string;
    /** --mjo-pagination-select-padding */
    selectPadding?: string;
}

export interface MjoProgressTheme {
    labelGap?: string;
    fontSize?: string;
    fontWeight?: string;
    fontSizeSmall?: string;
    fontSizeMedium?: string;
    fontSizeLarge?: string;
    background?: string;
    color?: string;
    barBorderRadius?: string;
    barBorderRadiusSmall?: string;
    barBorderRadiusLarge?: string;
    animationDuration?: string;
    circleDash?: string;
    circleDashSmall?: string;
    circleDashLarge?: string;
}

export interface MjoDrawerTheme {
    width?: string;
    height?: string;
    backgroundColor?: string;
    boxShadow?: string;
    titleBorderColor?: string;
    backdropBackgroundColor?: string;
    backdropFilter?: string;
    closeIconColor?: string;
    closeIconBorderRadius?: string;
    focusOutlineColor?: string;
    focusOutlineWidth?: string;
    focusOutlineOffset?: string;
    borderWidth?: string;
    borderColor?: string;
}

export interface MjoBreadcrumbsTheme {
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: string;
    padding?: string;
    textColor?: string;
    linkHoverColor?: string;
    currentColor?: string;
    currentFontWeight?: string;
    separatorColor?: string;
    focusOutline?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
}

export interface MjoTabsTheme {
    /** --mjo-tabs-border-color */
    borderColor?: string;
    /** --mjo-tabs-button-font-weight */
    buttonFontWeight?: string;
    /** --mjo-tabs-button-padding */
    buttonPadding?: string;
    /** --mjo-tabs-button-border-radius */
    buttonBorderRadius?: string;
}
