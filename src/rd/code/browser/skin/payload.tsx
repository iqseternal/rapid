/**
 * ==================================================================================
 * 该文件用于创建整个 App 中可以调整的 Css 样式列表
 * ==================================================================================
 */

import { mrcvp } from 'rd/base/browser/service/Skin';

const colorVariablesPayloadSheet = {
  /** 主要背景色 */
  primaryBackgroundColor: mrcvp('--rd-primary-background-color', '#ffffff', '主要背景色'),
  /** 二级次背景色 */
  secondaryBackgroundColor: mrcvp('--rd-secondary-background-color', '#f7f7f7', '二级次背景色'),
  /** 三级次要背景色 */
  thirdBackgroundColor: mrcvp('--rd-third-background-color', '#eeeeee', '三级次要背景色'),
  /** 四级次要背景色 */
  fourthBackgroundColor: mrcvp('--rd-fourth-background-color', '#e5e5e5', '四级次要背景色'),

  /** 主题色 */
  primaryColor: mrcvp('--rd-primary-color', '#007bff', '主题色'),

  primaryTextColor: mrcvp('--rd-primary-text-color', '#333333', '主要文本颜色'),
  secondaryTextColor: mrcvp('--rd-secondary-text-color', '#666666', '次要文本颜色'),
  placeholderTextColor: mrcvp('--rd-placeholder-text-color', '#999999', '提示文本颜色'),

  linkTextColor: mrcvp('--rd-link-text-color', '#1a73e8', '链接文本颜色'),
} as const;

const widgetVariablesPayloadSheet = {
  /** 控件宽度 */
  widgetWidth: mrcvp('--rd-widget-width', '26px', '控件宽度'),
  /** 控件高度 */
  widgetHeight: mrcvp('--rd-widget-height', '26px', '控件高度'),
  /** 控件颜色 */
  widgetColor: mrcvp('--rd-widget-color', '#212529', '控件颜色'),
  /** 控件Hover */
  widgetHoverBackgroundColor: mrcvp('--rd-widget-hover-background-color', 'rgba(0, 0, 0, .1)', '控件悬浮背景色'),
  /** 控件圆角 */
  widgetBorderRadius: mrcvp('--rd-widget-border-radius', '4px', '控件圆角')
} as const;

const navbarVariablesPayloadSheet = {
  /** 标题栏高度 */
  captionBarHeight: mrcvp('--rd-caption-bar-height', '32px', '标题栏高度'),
  /** 标题栏背景色 */
  captionBarBackgroundColor: mrcvp('--rd-caption-bar-background-color', colorVariablesPayloadSheet.secondaryBackgroundColor.value, '标题栏背景色'),

  navigationBarWidth: mrcvp('--rd-navigation-bar-width', '32px', '纵向导航栏宽度'),
  navigationBarBackgroundColor: mrcvp('--rd-navigation-bar-background-color', colorVariablesPayloadSheet.secondaryBackgroundColor.value, '导航栏背景色')
} as const;

const buttonVariablesPayloadSheet = {
  /** 所有按钮 */
  buttonBackgroundColor: mrcvp('--rd-button-background-color', colorVariablesPayloadSheet.primaryBackgroundColor.value, ''),
  buttonTextColor: mrcvp('--rd-button-text-color', colorVariablesPayloadSheet.primaryTextColor.value, '按钮文字颜色'),
  buttonBorderRadius: mrcvp('--rd-button-border-radius', '10px', '按钮的圆角尺寸'),

  /** 主按钮 */
  primaryButtonBackgroundColor: mrcvp('--rd-primary-button-background-color', '#1677ff', '主要按钮颜色'),
  primaryButtonTextColor: mrcvp('--rd-primary-button-text-color', '#FFF', '主要按钮文字颜色'),

  /** 带边线的按钮 */
  dashedButtonBackgroundColor: mrcvp('--rd-dashed-button-background-color', colorVariablesPayloadSheet.primaryBackgroundColor.value, '带边框按钮背景色'),
  dashedButtonTextColor: mrcvp('--rd-dashed-button-text-color', colorVariablesPayloadSheet.primaryTextColor.value, '带边框按钮文字颜色'),

  /** 默认的按钮 */
  defaultButtonBackgroundColor: mrcvp('--rd-default-button-background-color', colorVariablesPayloadSheet.primaryBackgroundColor.value, '带边框按钮背景色'),
  defaultButtonTextColor: mrcvp('--rd-default-button-text-color', colorVariablesPayloadSheet.primaryTextColor.value, '带边框按钮文字颜色'),

  /** 链接按钮 */
  linkButtonBackgroundColor: mrcvp('--rd-link-button-background-color', 'unset', '带边框按钮背景色'),
  linkButtonTextColor: mrcvp('--rd-link-button-text-color', colorVariablesPayloadSheet.linkTextColor.value, '带边框按钮文字颜色'),

  /** 文本按钮 */
  textButtonBackgroundColor: mrcvp('--rd-text-button-background-color', colorVariablesPayloadSheet.primaryBackgroundColor.value, '带边框按钮背景色'),
  textButtonTextColor: mrcvp('--rd-text-button-text-color', colorVariablesPayloadSheet.primaryTextColor.value, '带边框按钮文字颜色'),
} as const;

const messageVariablesPayloadSheet = {
  messageBorderRadius: mrcvp('--rd-message-border-radius', '8px', 'message圆角'),

  /** 成功按钮颜色 */
  successMessageColor: mrcvp('--rd-success-message-color', '#28a745', '成功按钮颜色'),
  /** 警告按钮颜色 */
  warningMessageColor: mrcvp('--rd-warning-message-color', '#ffc107', '警告按钮颜色'),
  /** 错误按钮颜色 */
  errorMessageColor: mrcvp('--rd-error-message-color', '#dc3545', '错误按钮颜色'),
} as const;

const cardVariablesPayloadSheet = {
  cardBorderRadius: mrcvp('--rd-card-border-radius', '12px', '卡片圆角'),

  /* 卡片内边距 */
  cardPadding: mrcvp('--rd-card-padding', '16px', '卡片内边距')

} as const;

const dropdownVariablesPayloadSheet = {
  dropdownBackgroundColor: mrcvp('--rd-dropdown-background-color', colorVariablesPayloadSheet.secondaryBackgroundColor.value, '下拉菜单的背景颜色'),
  dropdownTextColor: mrcvp('--rd-dropdown-text-color', colorVariablesPayloadSheet.primaryTextColor.value, '下拉菜单的文字颜色'),
  dropdownBorderRadius: mrcvp('--rd-dropdown-border-radius', '10px', '下拉菜单圆角大小'),
  dropdownItemBorderRadius: mrcvp('--rd-dropdown-item-border-radius', '5px', '下拉菜单项圆角大小'),

  dropdownMenuBackgroundColor: mrcvp('--rd-dropdown-menu-background-color', colorVariablesPayloadSheet.secondaryBackgroundColor.value, '下拉文件菜单背景颜色'),
  dropdownMenuTextColor: mrcvp('--rd-dropdown-menu-text-color', colorVariablesPayloadSheet.primaryTextColor.value, '下拉文件菜单文字颜色'),
  dropdownMenuBorderRadius: mrcvp('--rd-dropdown-menu-border-radius', '8px', '下拉文件菜单圆角大小'),
  dropdownMenuItemBorderRadius: mrcvp('--rd-dropdown-menu-item-border-radius', '8px', '下拉菜单项圆角大小'),
} as const;



const tldrawVariablesPayloadSheet = {
  tldrawShapeItemParentSelectedBg: mrcvp('--rd-tldraw-shape-item-parent-selected-bg', '#f5f5f5', 'tldraw 图形项父项选中背景色'),
  tldrawShapeItemChildSelectedBg: mrcvp('--rd-tldraw-shape-item-child-selected-bg', '#f5f5f5', 'tldraw 图形项子项选中背景色'),
  tldrawShapeItemSelectedBg: mrcvp('--rd-tldraw-shape-item-selected-bg', '#e5e5e5', 'tldraw 图形项选中背景色'),

  tldrawShapeItemPaddingLeft: mrcvp('--rd-tldraw-shape-item-padding-left', '10px', 'tldraw 图形项左侧内边距'),


} as const;








const sizeVariablesPayloadSheet = {

  /* 正文字体大小 */
  bodyFontSize: mrcvp('--rd-body-font-size', '16px', '正文字体大小'),
  /* 标题字体大小 */
  headingFontSize: mrcvp('--rd-heading-font-size', '24px', '标题字体大小'),
  /* 小标题字体大小 */
  subheadingFontSize: mrcvp('--rd-subheading-font-size', '20px', '小标题字体大小'),
  /* 按钮字体大小 */
  buttonFontSize: mrcvp('--rd-button-font-size', '14px', '按钮字体大小'),
  /* 表单标签字体大小 */
  formLabelFontSize: mrcvp('--rd-form-label-font-size', '14px', '表单标签字体大小'),
  /* 工具提示字体大小 */
  tooltipFontSize: mrcvp('--rd-tooltip-font-size', '12px', '工具提示字体大小'),

  /* 下拉菜单项高度 */
  dropdownMenuItemHeight: mrcvp('--rd-dropdown-menu-item-height', '40px', '下拉菜单项高度'),

  /* 页脚高度 */
  footerHeight: mrcvp('--rd-footer-height', '80px', '页脚高度'),



  /* 按钮内边距 */
  buttonPadding: mrcvp('--rd-button-padding', '10px 20px', '按钮内边距'),
  /* 输入框内边距 */
  inputPadding: mrcvp('--rd-input-padding', '10px 15px', '输入框内边距'),
  /* 工具提示内边距 */
  tooltipPadding: mrcvp('--rd-tooltip-padding', '8px 12px', '工具提示内边距')
} as const;

const colorsVariablesPayloadSheet = {


  /* 辅助色 */
  secondaryColor: mrcvp('--rd-secondary-color', '#6c757d', '辅助色'),

  /* 链接颜色 */
  linkColor: mrcvp('--rd-link-color', '#007bff', '链接颜色'),
  /* 正文文本颜色 */
  bodyTextColor: mrcvp('--rd-body-text-color', '#212529', '正文文本颜色'),
  /* 标题文本颜色 */
  headingTextColor: mrcvp('--rd-heading-text-color', '#343a40', '标题文本颜色'),
  /* 边框颜色 */
  borderColor: mrcvp('--rd-border-color', '#dee2e6', '边框颜色'),
  /* 输入框背景色 */
  inputBackgroundColor: mrcvp('--rd-input-background-color', '#ffffff', '输入框背景色'),
  /* 输入框文本颜色 */
  inputTextColor: mrcvp('--rd-input-text-color', '#495057', '输入框文本颜色'),
  /* 占位符文本颜色 */
  placeholderTextColor: mrcvp('--rd-placeholder-text-color', '#6c757d', '占位符文本颜色'),
  /* 禁用元素颜色 */
  disabledElementColor: mrcvp('--rd-disabled-element-color', '#6c757d', '禁用元素颜色'),
  /* 强调色 */
  accentColor: mrcvp('--rd-accent-color', '#17a2b8', '强调色'),

  /* 页脚背景色 */
  footerBackgroundColor: mrcvp('--rd-footer-background-color', '#343a40', '页脚背景色'),
  /* 面包屑颜色 */
  breadcrumbColor: mrcvp('--rd-breadcrumb-color', '#6c757d', '面包屑颜色'),
  /* 下拉菜单背景色 */
  dropdownMenuBackgroundColor: mrcvp('--rd-dropdown-menu-background-color', '#ffffff', '下拉菜单背景色'),
  /* 下拉菜单文本颜色 */
  dropdownMenuTextColor: mrcvp('--rd-dropdown-menu-text-color', '#212529', '下拉菜单文本颜色'),
  /* 工具提示背景色 */
  tooltipBackgroundColor: mrcvp('--rd-tooltip-background-color', '#343a40', '工具提示背景色'),
  /* 工具提示文本颜色 */
  tooltipTextColor: mrcvp('--rd-tooltip-text-color', '#ffffff', '工具提示文本颜色'),
  /* 表单标签颜色 */
  formLabelColor: mrcvp('--rd-form-label-color', '#495057', '表单标签颜色'),
  /* 卡片背景色 */
  cardBackgroundColor: mrcvp('--rd-card-background-color', '#ffffff', '卡片背景色'),
  /* 卡片边框颜色 */
  cardBorderColor: mrcvp('--rd-card-border-color', '#dee2e6', '卡片边框颜色'),
  /* 按钮悬停颜色 */
  buttonHoverColor: mrcvp('--rd-button-hover-color', '#0056b3', '按钮悬停颜色'),
  /* 按钮激活颜色 */
  buttonActiveColor: mrcvp('--rd-button-active-color', '#004085', '按钮激活颜色'),
  /* 图标颜色 */
  iconColor: mrcvp('--rd-icon-color', '#6c757d', '图标颜色'),
  /* 菜单项悬停颜色 */
  menuItemHoverColor: mrcvp('--rd-menu-item-hover-color', '#f8f9fa', '菜单项悬停颜色'),
  /* 菜单项激活颜色 */
  menuItemActiveColor: mrcvp('--rd-menu-item-active-color', '#e9ecef', '菜单项激活颜色'),
  /* 面板背景色 */
  panelBackgroundColor: mrcvp('--rd-panel-background-color', '#ffffff', '面板背景色'),
  /* 面板边框颜色 */
  panelBorderColor: mrcvp('--rd-panel-border-color', '#dee2e6', '面板边框颜色')
} as const;

export const cssVariablesPayloadSheet = {
  ...widgetVariablesPayloadSheet,
  ...navbarVariablesPayloadSheet,
  ...colorVariablesPayloadSheet,
  ...buttonVariablesPayloadSheet,
  ...messageVariablesPayloadSheet,
  ...cardVariablesPayloadSheet,
  ...dropdownVariablesPayloadSheet,
  ...tldrawVariablesPayloadSheet,

  ...colorsVariablesPayloadSheet,
  ...sizeVariablesPayloadSheet
} as const;
