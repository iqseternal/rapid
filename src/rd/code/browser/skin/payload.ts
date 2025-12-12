/**
 * ==================================================================================
 * 该文件用于创建整个 App 中可以调整的 Css 样式列表
 * ==================================================================================
 */

import { mrvp } from 'rd/base/browser/service/Skin';

// ==================================================================================
// Global: 全局
// ==================================================================================
export const colorPrimary = mrvp('--rd-global-color-primary', '#3498db', '全局主题色');
export const colorSuccess = mrvp('--rd-global-color-success', '#2ecc71', '全局成功色');
export const colorWarning = mrvp('--rd-global-color-warning', '#f1c40f', '全局警告色');
export const colorError = mrvp('--rd-global-color-danger', '#e74c3c', '全局危险色');

export const colorNeutral0 = mrvp('--rd-global-color-neutral-0', '#ffffff', '全局中性色');
export const colorNeutral50 = mrvp('--rd-global-color-neutral-50', '#fafafa', '全局中性色');
export const colorNeutral100 = mrvp('--rd-global-color-neutral-100', '#f5f5f5', '全局中性色');
export const colorNeutral200 = mrvp('--rd-global-color-neutral-200', '#eeeeee', '全局中性色');
export const colorNeutral300 = mrvp('--rd-global-color-neutral-300', '#e0e0e0', '全局中性色');
export const colorNeutral400 = mrvp('--rd-global-color-neutral-400', '#bdbdbd', '全局中性色');
export const colorNeutral500 = mrvp('--rd-global-color-neutral-500', '#9e9e9e', '全局中性色');
export const colorNeutral600 = mrvp('--rd-global-color-neutral-600', '#757575', '全局中性色');
export const colorNeutral700 = mrvp('--rd-global-color-neutral-700', '#616161', '全局中性色');
export const colorNeutral800 = mrvp('--rd-global-color-neutral-800', '#424242', '全局中性色');
export const colorNeutral900 = mrvp('--rd-global-color-neutral-900', '#212121', '全局中性色');

export const spacingUnit = mrvp('--rd-global-spacing-unit', '2px', '全局间距单位');
export const spacingXs = mrvp('--rd-global-spacing-xs-unit', `calc(1 * var(${spacingUnit.variable}))`, '全局超小间距');  // 修复变量名和描述
export const spacingSm = mrvp('--rd-global-spacing-sm-unit', `calc(2 * var(${spacingUnit.variable}))`, '全局小间距');  // 修复变量名和描述
export const spacingMd = mrvp('--rd-global-spacing-md-unit', `calc(4 * var(${spacingUnit.variable}))`, '全局中等间距');  // 修复变量名和描述
export const spacingLg = mrvp('--rd-global-spacing-lg-unit', `calc(5 * var(${spacingUnit.variable}))`, '全局大间距');  // 修复变量名和描述
export const spacingXl = mrvp('--rd-global-spacing-xl-unit', `calc(6 * var(${spacingUnit.variable}))`, '全局超大间距');  // 修复变量名和描述

export const borderRadiusUnit = mrvp('--rd-global-border-radius-unit', '4px', '全局圆角单位');
export const borderRadiusXs = mrvp('--rd-global-border-radius-small-unit', `calc(0.5 * var(${borderRadiusUnit.variable}))`, '全局圆角单位');
export const borderRadiusSm = mrvp('--rd-global-border-radius-small-unit', `calc(1 * var(${borderRadiusUnit.variable}))`, '全局圆角单位');
export const borderRadiusMd = mrvp('--rd-global-border-radius-small-unit', `calc(2 * var(${borderRadiusUnit.variable}))`, '全局圆角单位');
export const borderRadiusLg = mrvp('--rd-global-border-radius-small-unit', `calc(3 * var(${borderRadiusUnit.variable}))`, '全局圆角单位');
export const borderRadiusXl = mrvp('--rd-global-border-radius-small-unit', `calc(4 * var(${borderRadiusUnit.variable}))`, '全局圆角单位');
export const borderRadiusFull = mrvp('--rd-global-border-radius-full', '9999px', '全局圆角单位');

export const shadowXs = mrvp('--rd-global-shadow-xs', '0 1px 2px rgba(0,0,0,0.05)', '全局阴影');
export const shadowSm = mrvp('--rd-global-shadow-sm', '0 2px 4px rgba(0,0,0,0.05)', '全局阴影');
export const shadowMd = mrvp('--rd-global-shadow-md', '0 4px 8px rgba(0,0,0,0.05)', '全局阴影');
export const shadowLg = mrvp('--rd-global-shadow-lg', '0 8px 16px rgba(0,0,0,0.05)', '全局阴影');
export const shadowXl = mrvp('--rd-global-shadow-xl', '0 16px 32px rgba(0,0,0,0.05)', '全局阴影');

export const fontSizeXs = mrvp('--rd-global-font-size-xs', '0.75rem', '全局字体大小');
export const fontSizeSm = mrvp('--rd-global-font-size-sm', '0.875rem', '全局字体大小');
export const fontSizeMd = mrvp('--rd-global-font-size-md', '1rem', '全局字体大小');
export const fontSizeLg = mrvp('--rd-global-font-size-lg', '1.125rem', '全局字体大小');
export const fontSizeXl = mrvp('--rd-global-font-size-xl', '1.25rem', '全局字体大小');
export const fontSize2Xl = mrvp('--rd-global-font-size-xxl', '1.5rem', '全局字体大小');

export const fontWeightLight = mrvp('--rd-global-font-weight-light', '300', '全局细体字重');  // 修改描述
export const fontWeightRegular = mrvp('--rd-global-font-weight-regular', '400', '全局常规字重');  // 修改描述
export const fontWeightMedium = mrvp('--rd-global-font-weight-medium', '500', '全局中等字重');  // 修改描述
export const fontWeightBold = mrvp('--rd-global-font-weight-bold', '700', '全局粗体字重');  // 修改描述

export const colorTextPrimary = mrvp('--rd-global-color-text-primary', `var(${colorNeutral900.variable})`, '全局主要文本色');  // 修改描述
export const colorTextSecondary = mrvp('--rd-global-color-text-secondary', `var(${colorNeutral700.variable})`, '全局次要文本色');  // 修改描述
export const colorTextTertiary = mrvp('--rd-global-color-text-tertiary', `var(${colorNeutral500.variable})`, '全局第三文本色');  // 修改描述
export const colorTextDisabled = mrvp('--rd-global-color-text-disabled', `var(${colorNeutral400.variable})`, '全局禁用文本色');  // 修改描述
export const colorTextInverse = mrvp('--rd-global-color-text-inverse', `var(${colorNeutral50.variable})`, '全局反色文本');  // 修改描述

export const colorTextLink = mrvp('--rd-global-color-text-link', `var(${colorPrimary.variable})`, '全局链接文本色');  // 修改描述
export const colorTextSuccess = mrvp('--rd-global-color-text-success', `var(${colorSuccess.variable})`, '全局成功文本色');  // 修改描述
export const colorTextWarning = mrvp('--rd-global-color-text-warning', `var(${colorWarning.variable})`, '全局警告文本色');  // 修改描述
export const colorTextError = mrvp('--rd-global-color-text-danger', `var(${colorError.variable})`, '全局错误文本色');  // 修改描述

export const surfacePrimary = mrvp('--rd-global-surface-primary', `var(${colorNeutral100.variable})`, '全局主要表面色');  // 修改描述
export const surfaceSecondary = mrvp('--rd-global-surface-secondary', `var(${colorNeutral50.variable})`, '全局次要表面色');  // 修改描述
export const surfaceTertiary = mrvp('--rd-global-surface-tertiary', `var(${colorNeutral200.variable})`, '全局第三表面色');  // 修改描述

export const borderPrimary = mrvp('--rd-global-border-primary', `1px solid var(${colorNeutral300.variable})`, '全局主要边框');  // 修改描述
export const borderSecondary = mrvp('--rd-global-border-secondary', `1px solid var(${colorNeutral200.variable})`, '全局次要边框');  // 修改描述
export const borderTertiary = mrvp('--rd-global-border-tertiary', `1px solid var(${colorNeutral100.variable})`, '全局第三边框');  // 修改描述
export const borderFocus = mrvp('--rd-global-border-focus', `1px solid var(${colorPrimary.variable})`, '全局聚焦边框');  // 修改描述
export const borderError = mrvp('--rd-global-border-error', `1px solid var(${colorError.variable})`, '全局错误边框');  // 修改描述

export const interactivePrimary = mrvp('--rd-global-interactive-primary', `var(${colorPrimary.variable})`, '全局主要交互色');  // 修改描述
export const interactivePrimaryHover = mrvp('--rd-global-interactive-primary-hover', '#2980b9', '全局主要交互悬停色');  // 修改描述
export const interactivePrimaryActive = mrvp('--rd-global-interactive-primary-active', '#1d6fa5', '全局主要交互激活色');  // 修改描述
export const interactivePrimaryDisabled = mrvp('--rd-global-interactive-primary-disabled', `var(${colorNeutral300.variable})`, '全局主要交互禁用色');  // 修改描述

export const interactiveSecondary = mrvp('--rd-global-interactive-secondary', `var(${colorNeutral400.variable})`, '全局次要交互色');  // 修改描述
export const interactiveSecondaryHover = mrvp('--rd-global-interactive-secondary-hover', `var(${colorNeutral500.variable})`, '全局次要交互悬停色');  // 修改描述
export const interactiveSecondaryActive = mrvp('--rd-global-interactive-secondary-active', `var(${colorNeutral600.variable})`, '全局次要交互激活色');  // 修改描述
export const interactiveSecondaryDisabled = mrvp('--rd-global-interactive-secondary-disabled', `var(${colorNeutral200.variable})`, '全局次要交互禁用色');  // 修改描述

// ==================================================================================
// PLATS: 器件
// ==================================================================================

export const uiWidgetWidth = mrvp('--rd-ui-widget-width', '26px', '控件宽度');
export const uiWidgetHeight = mrvp('--rd-ui-widget-height', '26px', '控件高度');
export const uiWidgetColorPrimary = mrvp('--rd-ui-widget-color-primary', `var(${colorNeutral700.variable})`, '控件颜色');
export const uiWidgetBackgroundPrimary = mrvp('--rd-ui-widget-background-primary', `var(${colorNeutral50.variable})`, '控件颜色');
export const uiWidgetHoverBackgroundPrimary = mrvp('--rd-ui-widget-hover-background-primary', `var(${colorNeutral100.variable})`, '控件颜色');
export const uiWidgetBorderRadius = mrvp('--rd-ui-widget-border-radius', '4px', '控件圆角半径');

// ==================================================================================
// UI: Components/器件
// ==================================================================================

export const uiDefaultButtonBackground = mrvp('--rd-ui-default-button-background', `var(${colorNeutral50.variable})`, '默认按钮背景色');
export const uiDefaultButtonTextColor = mrvp('--rd-ui-default-button-text-color', `var(${colorNeutral700.variable})`, '默认按钮文本色');
export const uiDefaultButtonRadius = mrvp('--rd-ui-default-button-radius', '10px', '默认按钮圆角半径');

export const uiCaptionBarHeight = mrvp('--rd-ui-caption-bar-height', '32px', '标题栏高度');
export const uiCaptionBarBackground = mrvp('--rd-ui-caption-bar-background', `var(${colorNeutral0.variable})`, '标题栏背景色');

export const uiNavigationBarWidth = mrvp('--rd-ui-navigation-bar-width', '32px', '纵向导航栏宽度');
export const uiNavigationBarBackground = mrvp('--rd-ui-navigation-bar-background', `var(${colorNeutral0.variable})`, '导航栏背景色');

export const uiAutoMenuBackground = mrvp('--rd-ui-auto-menu-background', `var(${colorNeutral0.variable})`, '自动菜单背景色');
export const uiAutoMenuTextColor = mrvp('--rd-ui-auto-menu-text-color', `var(${colorNeutral700.variable})`, '自动菜单文本色');
export const uiAutoMenuRadius = mrvp('--rd-ui-auto-menu-radius', '10px', '自动菜单圆角半径');


// ==================================================================================
// UI: Pages
// ==================================================================================
