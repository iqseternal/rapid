/**
 * ==================================================================================
 * 该文件用于创建整个 App 中可以调整的 Css 样式列表
 * ==================================================================================
 */

import { mrcvp } from './make';

const colorVariablesSheet = {
  /** 主要背景色 */
  primaryBackgroundColor: mrcvp('--rapid-primary-background-color', '#ffffff', '主要背景色'),
  /** 二级次背景色 */
  secondaryBackgroundColor: mrcvp('--rapid-secondary-background-color', '#f7f7f7', '二级次背景色'),
  /** 三级次要背景色 */
  thirdBackgroundColor: mrcvp('--rapid-third-background-color', '#eeeeee', '三级次要背景色'),
  /** 四级次要背景色 */
  fourthBackgroundColor: mrcvp('--rapid-fourth-background-color', '#e5e5e5', '四级次要背景色'),

  /** 主题色 */
  primaryColor: mrcvp('--rapid-primary-color', '#007bff', '主题色'),

  primaryTextColor: mrcvp('--rapid-primary-text-color', '#333333', '主要文本颜色'),
  secondaryTextColor: mrcvp('--rapid-secondary-text-color', '#666666', '次要文本颜色'),
  placeholderTextColor: mrcvp('--rapid-placeholder-text-color', '#999999', '提示文本颜色'),

  linkTextColor: mrcvp('--rapid-link-text-color', '#1a73e8', '链接文本颜色'),
} as const;

const widgetVariablesSheet = {
  /** 控件宽度 */
  widgetWidth: mrcvp('--rapid-widget-width', '26px', '控件宽度'),
  /** 控件高度 */
  widgetHeight: mrcvp('--rapid-widget-height', '26px', '控件高度'),
  /** 控件颜色 */
  widgetColor: mrcvp('--rapid-widget-color', '#212529', '控件颜色'),
  /** 控件Hover */
  widgetHoverBackgroundColor: mrcvp('--rapid-widget-hover-background-color', 'rgba(0, 0, 0, .1)', '控件悬浮背景色'),
  /** 控件圆角 */
  widgetBorderRadius: mrcvp('--rapid-widget-border-radius', '4px', '控件圆角')
} as const;

const navbarVariablesSheet = {
  /** 标题栏高度 */
  captionBarHeight: mrcvp('--rapid-caption-bar-height', '32px', '标题栏高度'),
  /** 标题栏背景色 */
  captionBarBackgroundColor: mrcvp('--rapid-caption-bar-background-color', colorVariablesSheet.secondaryBackgroundColor.value, '标题栏背景色'),

  navigationBarWidth: mrcvp('--rapid-navigation-bar-width', '32px', '纵向导航栏宽度'),
  navigationBarBackgroundColor: mrcvp('--rapid-navigation-bar-background-color', colorVariablesSheet.secondaryBackgroundColor.value, '导航栏背景色')
} as const;

const buttonVariablesSheet = {
  /** 所有按钮 */
  buttonBackgroundColor: mrcvp('--rapid-button-background-color', colorVariablesSheet.primaryBackgroundColor.value, ''),
  buttonTextColor: mrcvp('--rapid-button-text-color', colorVariablesSheet.primaryTextColor.value, '按钮文字颜色'),
  buttonBorderRadius: mrcvp('--rapid-button-border-radius', '10px', '按钮的圆角尺寸'),

  /** 主按钮 */
  primaryButtonBackgroundColor: mrcvp('--rapid-primary-button-background-color', '#1677ff', '主要按钮颜色'),
  primaryButtonTextColor: mrcvp('--rapid-primary-button-text-color', '#FFF', '主要按钮文字颜色'),

  /** 带边线的按钮 */
  dashedButtonBackgroundColor: mrcvp('--rapid-dashed-button-background-color', colorVariablesSheet.primaryBackgroundColor.value, '带边框按钮背景色'),
  dashedButtonTextColor: mrcvp('--rapid-dashed-button-text-color', colorVariablesSheet.primaryTextColor.value, '带边框按钮文字颜色'),

  /** 默认的按钮 */
  defaultButtonBackgroundColor: mrcvp('--rapid-default-button-background-color', colorVariablesSheet.primaryBackgroundColor.value, '带边框按钮背景色'),
  defaultButtonTextColor: mrcvp('--rapid-default-button-text-color', colorVariablesSheet.primaryTextColor.value, '带边框按钮文字颜色'),

  /** 链接按钮 */
  linkButtonBackgroundColor: mrcvp('--rapid-link-button-background-color', 'unset', '带边框按钮背景色'),
  linkButtonTextColor: mrcvp('--rapid-link-button-text-color', colorVariablesSheet.linkTextColor.value, '带边框按钮文字颜色'),

  /** 文本按钮 */
  textButtonBackgroundColor: mrcvp('--rapid-text-button-background-color', colorVariablesSheet.primaryBackgroundColor.value, '带边框按钮背景色'),
  textButtonTextColor: mrcvp('--rapid-text-button-text-color', colorVariablesSheet.primaryTextColor.value, '带边框按钮文字颜色'),
} as const;

const messageVariablesSheet = {
  messageBorderRadius: mrcvp('--rapid-message-border-radius', '8px', 'message圆角'),

  /** 成功按钮颜色 */
  successMessageColor: mrcvp('--rapid-success-message-color', '#28a745', '成功按钮颜色'),
  /** 警告按钮颜色 */
  warningMessageColor: mrcvp('--rapid-warning-message-color', '#ffc107', '警告按钮颜色'),
  /** 错误按钮颜色 */
  errorMessageColor: mrcvp('--rapid-error-message-color', '#dc3545', '错误按钮颜色'),
} as const;

const cardVariablesSheet = {
  cardBorderRadius: mrcvp('--rapid-card-border-radius', '12px', '卡片圆角'),

  /* 卡片内边距 */
  cardPadding: mrcvp('--rapid-card-padding', '16px', '卡片内边距')

} as const;

const dropdownVariablesSheet = {
  dropdownBackgroundColor: mrcvp('--rapid-dropdown-background-color', colorVariablesSheet.secondaryBackgroundColor.value, '下拉菜单的背景颜色'),
  dropdownTextColor: mrcvp('--rapid-dropdown-text-color', colorVariablesSheet.primaryTextColor.value, '下拉菜单的文字颜色'),
  dropdownBorderRadius: mrcvp('--rapid-dropdown-border-radius', '10px', '下拉菜单圆角大小'),
  dropdownItemBorderRadius: mrcvp('--rapid-dropdown-item-border-radius', '5px', '下拉菜单项圆角大小'),

  dropdownMenuBackgroundColor: mrcvp('--rapid-dropdown-menu-background-color', colorVariablesSheet.secondaryBackgroundColor.value, '下拉文件菜单背景颜色'),
  dropdownMenuTextColor: mrcvp('--rapid-dropdown-menu-text-color', colorVariablesSheet.primaryTextColor.value, '下拉文件菜单文字颜色'),
  dropdownMenuBorderRadius: mrcvp('--rapid-dropdown-menu-border-radius', '8px', '下拉文件菜单圆角大小'),
  dropdownMenuItemBorderRadius: mrcvp('--rapid-dropdown-menu-item-border-radius', '8px', '下拉菜单项圆角大小'),
} as const;



const tldrawVariablesSheet = {
  tldrawShapeItemParentSelectedBg: mrcvp('--rapid-tldraw-shape-item-parent-selected-bg', '#f5f5f5', 'tldraw 图形项父项选中背景色'),
  tldrawShapeItemChildSelectedBg: mrcvp('--rapid-tldraw-shape-item-child-selected-bg', '#f5f5f5', 'tldraw 图形项子项选中背景色'),
  tldrawShapeItemSelectedBg: mrcvp('--rapid-tldraw-shape-item-selected-bg', '#e5e5e5', 'tldraw 图形项选中背景色'),

  tldrawShapeItemPaddingLeft: mrcvp('--rapid-tldraw-shape-item-padding-left', '10px', 'tldraw 图形项左侧内边距'),


} as const;








const sizeVariablesSheet = {

  /* 正文字体大小 */
  bodyFontSize: mrcvp('--rapid-body-font-size', '16px', '正文字体大小'),
  /* 标题字体大小 */
  headingFontSize: mrcvp('--rapid-heading-font-size', '24px', '标题字体大小'),
  /* 小标题字体大小 */
  subheadingFontSize: mrcvp('--rapid-subheading-font-size', '20px', '小标题字体大小'),
  /* 按钮字体大小 */
  buttonFontSize: mrcvp('--rapid-button-font-size', '14px', '按钮字体大小'),
  /* 表单标签字体大小 */
  formLabelFontSize: mrcvp('--rapid-form-label-font-size', '14px', '表单标签字体大小'),
  /* 工具提示字体大小 */
  tooltipFontSize: mrcvp('--rapid-tooltip-font-size', '12px', '工具提示字体大小'),

  /* 下拉菜单项高度 */
  dropdownMenuItemHeight: mrcvp('--rapid-dropdown-menu-item-height', '40px', '下拉菜单项高度'),

  /* 页脚高度 */
  footerHeight: mrcvp('--rapid-footer-height', '80px', '页脚高度'),



  /* 按钮内边距 */
  buttonPadding: mrcvp('--rapid-button-padding', '10px 20px', '按钮内边距'),
  /* 输入框内边距 */
  inputPadding: mrcvp('--rapid-input-padding', '10px 15px', '输入框内边距'),
  /* 工具提示内边距 */
  tooltipPadding: mrcvp('--rapid-tooltip-padding', '8px 12px', '工具提示内边距')
} as const;

const colorsVariablesSheet = {


  /* 辅助色 */
  secondaryColor: mrcvp('--rapid-secondary-color', '#6c757d', '辅助色'),

  /* 链接颜色 */
  linkColor: mrcvp('--rapid-link-color', '#007bff', '链接颜色'),
  /* 正文文本颜色 */
  bodyTextColor: mrcvp('--rapid-body-text-color', '#212529', '正文文本颜色'),
  /* 标题文本颜色 */
  headingTextColor: mrcvp('--rapid-heading-text-color', '#343a40', '标题文本颜色'),
  /* 边框颜色 */
  borderColor: mrcvp('--rapid-border-color', '#dee2e6', '边框颜色'),
  /* 输入框背景色 */
  inputBackgroundColor: mrcvp('--rapid-input-background-color', '#ffffff', '输入框背景色'),
  /* 输入框文本颜色 */
  inputTextColor: mrcvp('--rapid-input-text-color', '#495057', '输入框文本颜色'),
  /* 占位符文本颜色 */
  placeholderTextColor: mrcvp('--rapid-placeholder-text-color', '#6c757d', '占位符文本颜色'),
  /* 禁用元素颜色 */
  disabledElementColor: mrcvp('--rapid-disabled-element-color', '#6c757d', '禁用元素颜色'),
  /* 强调色 */
  accentColor: mrcvp('--rapid-accent-color', '#17a2b8', '强调色'),

  /* 页脚背景色 */
  footerBackgroundColor: mrcvp('--rapid-footer-background-color', '#343a40', '页脚背景色'),
  /* 面包屑颜色 */
  breadcrumbColor: mrcvp('--rapid-breadcrumb-color', '#6c757d', '面包屑颜色'),
  /* 下拉菜单背景色 */
  dropdownMenuBackgroundColor: mrcvp('--rapid-dropdown-menu-background-color', '#ffffff', '下拉菜单背景色'),
  /* 下拉菜单文本颜色 */
  dropdownMenuTextColor: mrcvp('--rapid-dropdown-menu-text-color', '#212529', '下拉菜单文本颜色'),
  /* 工具提示背景色 */
  tooltipBackgroundColor: mrcvp('--rapid-tooltip-background-color', '#343a40', '工具提示背景色'),
  /* 工具提示文本颜色 */
  tooltipTextColor: mrcvp('--rapid-tooltip-text-color', '#ffffff', '工具提示文本颜色'),
  /* 表单标签颜色 */
  formLabelColor: mrcvp('--rapid-form-label-color', '#495057', '表单标签颜色'),
  /* 卡片背景色 */
  cardBackgroundColor: mrcvp('--rapid-card-background-color', '#ffffff', '卡片背景色'),
  /* 卡片边框颜色 */
  cardBorderColor: mrcvp('--rapid-card-border-color', '#dee2e6', '卡片边框颜色'),
  /* 按钮悬停颜色 */
  buttonHoverColor: mrcvp('--rapid-button-hover-color', '#0056b3', '按钮悬停颜色'),
  /* 按钮激活颜色 */
  buttonActiveColor: mrcvp('--rapid-button-active-color', '#004085', '按钮激活颜色'),
  /* 图标颜色 */
  iconColor: mrcvp('--rapid-icon-color', '#6c757d', '图标颜色'),
  /* 菜单项悬停颜色 */
  menuItemHoverColor: mrcvp('--rapid-menu-item-hover-color', '#f8f9fa', '菜单项悬停颜色'),
  /* 菜单项激活颜色 */
  menuItemActiveColor: mrcvp('--rapid-menu-item-active-color', '#e9ecef', '菜单项激活颜色'),
  /* 面板背景色 */
  panelBackgroundColor: mrcvp('--rapid-panel-background-color', '#ffffff', '面板背景色'),
  /* 面板边框颜色 */
  panelBorderColor: mrcvp('--rapid-panel-border-color', '#dee2e6', '面板边框颜色')
} as const;

export const cssVariablesSheet = {
  ...widgetVariablesSheet,
  ...navbarVariablesSheet,
  ...colorVariablesSheet,
  ...buttonVariablesSheet,
  ...messageVariablesSheet,
  ...cardVariablesSheet,
  ...dropdownVariablesSheet,
  ...tldrawVariablesSheet,

  ...colorsVariablesSheet,
  ...sizeVariablesSheet
} as const;
