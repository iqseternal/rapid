import { mRapidC } from './make';

const colorVarsSheet = {
  /* 主要背景色 */
  primaryBackgroundColor: mRapidC('--rapid-primary-background-color', '#ffffff', '主要背景色'),
  /* 二级次背景色 */
  secondaryBackgroundColor: mRapidC('--rapid-secondary-background-color', '#f7f7f7', '二级次背景色'),
  /* 三级次要背景色 */
  thirdBackgroundColor: mRapidC('--rapid-third-background-color', '#eeeeee', '三级次要背景色'),
  /* 四级次要背景色 */
  fourthBackgroundColor: mRapidC('--rapid-fourth-background-color', '#e5e5e5', '四级次要背景色'),

  /* 主题色 */
  primaryColor: mRapidC('--rapid-primary-color', '#007bff', '主题色'),

  primaryTextColor: mRapidC('--rapid-primary-text-color', '#333333', '主要文本颜色'),
  secondaryTextColor: mRapidC('--rapid-secondary-text-color', '#666666', '次要文本颜色'),
  placeholderTextColor: mRapidC('--rapid-placeholder-text-color', '#999999', '提示文本颜色'),

  linkTextColor: mRapidC('--rapid-link-text-color', '#1a73e8', '链接文本颜色'),
} as const;

const widgetVarsSheet = {
  /** 控件宽度 */
  widgetWidth: mRapidC('--rapid-widget-width', '20px', '控件宽度'),
  /** 控件高度 */
  widgetHeight: mRapidC('--rapid-widget-height', '20px', '控件高度'),
  /** 控件颜色 */
  widgetColor: mRapidC('--rapid-widget-color', '#212529', '控件颜色'),
  /** 控件Hover */
  widgetHoverBackgroundColor: mRapidC('--rapid-widget-hover-background-color', 'rgba(0, 0, 0, .1)', '控件悬浮背景色'),
  /** 控件圆角 */
  widgetBorderRadius: mRapidC('--rapid-widget-border-radius', '4px', '控件圆角')
} as const;

const navbarVarsSheet = {
  /* 导航栏高度 */
  navbarHeight: mRapidC('--rapid-navbar-height', '28px', '导航栏高度'),
  /* 导航栏背景色 */
  navbarBackgroundColor: mRapidC('--rapid-navbar-background-color', colorVarsSheet.secondaryBackgroundColor.value, '导航栏背景色'),
} as const;

const buttonVarsSheet = {
  /** 所有按钮 */
  buttonBackgroundColor: mRapidC('--rapid-button-background-color', colorVarsSheet.primaryBackgroundColor.value, ''),
  buttonTextColor: mRapidC('--rapid-button-text-color', colorVarsSheet.primaryTextColor.value, '按钮文字颜色'),
  buttonBorderRadius: mRapidC('--rapid-button-border-radius', '10px', '按钮的圆角尺寸'),

  /** 主按钮 */
  primaryButtonBackgroundColor: mRapidC('--rapid-primary-button-background-color', '#1677ff', '主要按钮颜色'),
  primaryButtonTextColor: mRapidC('--rapid-primary-button-text-color', '#FFF', '主要按钮文字颜色'),

  /** 带边线的按钮 */
  dashedButtonBackgroundColor: mRapidC('--rapid-dashed-button-background-color', colorVarsSheet.primaryBackgroundColor.value, '带边框按钮背景色'),
  dashedButtonTextColor: mRapidC('--rapid-dashed-button-text-color', colorVarsSheet.primaryTextColor.value, '带边框按钮文字颜色'),

  /** 默认的按钮 */
  defaultButtonBackgroundColor: mRapidC('--rapid-default-button-background-color', colorVarsSheet.primaryBackgroundColor.value, '带边框按钮背景色'),
  defaultButtonTextColor: mRapidC('--rapid-default-button-text-color', colorVarsSheet.primaryTextColor.value, '带边框按钮文字颜色'),

  /** 链接按钮 */
  linkButtonBackgroundColor: mRapidC('--rapid-link-button-background-color', 'unset', '带边框按钮背景色'),
  linkButtonTextColor: mRapidC('--rapid-link-button-text-color', colorVarsSheet.linkTextColor.value, '带边框按钮文字颜色'),

  /** 文本按钮 */
  textButtonBackgroundColor: mRapidC('--rapid-text-button-background-color', colorVarsSheet.primaryBackgroundColor.value, '带边框按钮背景色'),
  textButtonTextColor: mRapidC('--rapid-text-button-text-color', colorVarsSheet.primaryTextColor.value, '带边框按钮文字颜色'),
} as const;

const messageVarsSheet = {
  messageBorderRadius: mRapidC('--rapid-message-border-radius', '8px', 'message圆角'),

  /* 成功按钮颜色 */
  successMessageColor: mRapidC('--rapid-success-message-color', '#28a745', '成功按钮颜色'),
  /* 警告按钮颜色 */
  warningMessageColor: mRapidC('--rapid-warning-message-color', '#ffc107', '警告按钮颜色'),
  /* 错误按钮颜色 */
  errorMessageColor: mRapidC('--rapid-error-message-color', '#dc3545', '错误按钮颜色'),
} as const;

const cardVarsSheet = {
  cardBorderRadius: mRapidC('--rapid-card-border-radius', '12px', '卡片圆角'),
  cardPadding: mRapidC('--rapid-card-padding', '16px', '卡片内边距')

} as const;

const dropdownVarsSheet = {
  dropdownBackgroundColor: mRapidC('--rapid-dropdown-background-color', colorVarsSheet.secondaryBackgroundColor.value, '下拉菜单的背景颜色'),
  dropdownTextColor: mRapidC('--rapid-dropdown-text-color', colorVarsSheet.primaryTextColor.value, '下拉菜单的文字颜色'),
  dropdownBorderRadius: mRapidC('--rapid-dropdown-border-radius', '10px', '下拉菜单圆角大小'),
  dropdownItemBorderRadius: mRapidC('--rapid-dropdown-item-border-radius', '5px', '下拉菜单项圆角大小'),

  dropdownMenuBackgroundColor: mRapidC('--rapid-dropdown-menu-background-color', colorVarsSheet.secondaryBackgroundColor.value, '下拉文件菜单背景颜色'),
  dropdownMenuTextColor: mRapidC('--rapid-dropdown-menu-text-color', colorVarsSheet.primaryTextColor.value, '下拉文件菜单文字颜色'),
  dropdownMenuBorderRadius: mRapidC('--rapid-dropdown-menu-border-radius', '6px', '下拉文件菜单圆角大小'),
  dropdownMenuItemBorderRadius: mRapidC('--rapid-dropdown-menu-item-border-radius', '6px', '下拉菜单项圆角大小'),
} as const;

const sizeVarsSheet = {

  /* 正文字体大小 */
  bodyFontSize: mRapidC('--rapid-body-font-size', '16px', '正文字体大小'),
  /* 标题字体大小 */
  headingFontSize: mRapidC('--rapid-heading-font-size', '24px', '标题字体大小'),
  /* 小标题字体大小 */
  subheadingFontSize: mRapidC('--rapid-subheading-font-size', '20px', '小标题字体大小'),
  /* 按钮字体大小 */
  buttonFontSize: mRapidC('--rapid-button-font-size', '14px', '按钮字体大小'),
  /* 表单标签字体大小 */
  formLabelFontSize: mRapidC('--rapid-form-label-font-size', '14px', '表单标签字体大小'),
  /* 工具提示字体大小 */
  tooltipFontSize: mRapidC('--rapid-tooltip-font-size', '12px', '工具提示字体大小'),

  /* 下拉菜单项高度 */
  dropdownMenuItemHeight: mRapidC('--rapid-dropdown-menu-item-height', '40px', '下拉菜单项高度'),

  /* 页脚高度 */
  footerHeight: mRapidC('--rapid-footer-height', '80px', '页脚高度'),

  /* 卡片内边距 */
  cardPadding: mRapidC('--rapid-card-padding', '20px', '卡片内边距'),
  /* 按钮内边距 */
  buttonPadding: mRapidC('--rapid-button-padding', '10px 20px', '按钮内边距'),
  /* 输入框内边距 */
  inputPadding: mRapidC('--rapid-input-padding', '10px 15px', '输入框内边距'),
  /* 工具提示内边距 */
  tooltipPadding: mRapidC('--rapid-tooltip-padding', '8px 12px', '工具提示内边距')
} as const;

const colorsVarsSheet = {


  /* 辅助色 */
  secondaryColor: mRapidC('--rapid-secondary-color', '#6c757d', '辅助色'),

  /* 链接颜色 */
  linkColor: mRapidC('--rapid-link-color', '#007bff', '链接颜色'),
  /* 正文文本颜色 */
  bodyTextColor: mRapidC('--rapid-body-text-color', '#212529', '正文文本颜色'),
  /* 标题文本颜色 */
  headingTextColor: mRapidC('--rapid-heading-text-color', '#343a40', '标题文本颜色'),
  /* 边框颜色 */
  borderColor: mRapidC('--rapid-border-color', '#dee2e6', '边框颜色'),
  /* 输入框背景色 */
  inputBackgroundColor: mRapidC('--rapid-input-background-color', '#ffffff', '输入框背景色'),
  /* 输入框文本颜色 */
  inputTextColor: mRapidC('--rapid-input-text-color', '#495057', '输入框文本颜色'),
  /* 占位符文本颜色 */
  placeholderTextColor: mRapidC('--rapid-placeholder-text-color', '#6c757d', '占位符文本颜色'),
  /* 禁用元素颜色 */
  disabledElementColor: mRapidC('--rapid-disabled-element-color', '#6c757d', '禁用元素颜色'),
  /* 强调色 */
  accentColor: mRapidC('--rapid-accent-color', '#17a2b8', '强调色'),

  /* 页脚背景色 */
  footerBackgroundColor: mRapidC('--rapid-footer-background-color', '#343a40', '页脚背景色'),
  /* 面包屑颜色 */
  breadcrumbColor: mRapidC('--rapid-breadcrumb-color', '#6c757d', '面包屑颜色'),
  /* 下拉菜单背景色 */
  dropdownMenuBackgroundColor: mRapidC('--rapid-dropdown-menu-background-color', '#ffffff', '下拉菜单背景色'),
  /* 下拉菜单文本颜色 */
  dropdownMenuTextColor: mRapidC('--rapid-dropdown-menu-text-color', '#212529', '下拉菜单文本颜色'),
  /* 工具提示背景色 */
  tooltipBackgroundColor: mRapidC('--rapid-tooltip-background-color', '#343a40', '工具提示背景色'),
  /* 工具提示文本颜色 */
  tooltipTextColor: mRapidC('--rapid-tooltip-text-color', '#ffffff', '工具提示文本颜色'),
  /* 表单标签颜色 */
  formLabelColor: mRapidC('--rapid-form-label-color', '#495057', '表单标签颜色'),
  /* 卡片背景色 */
  cardBackgroundColor: mRapidC('--rapid-card-background-color', '#ffffff', '卡片背景色'),
  /* 卡片边框颜色 */
  cardBorderColor: mRapidC('--rapid-card-border-color', '#dee2e6', '卡片边框颜色'),
  /* 按钮悬停颜色 */
  buttonHoverColor: mRapidC('--rapid-button-hover-color', '#0056b3', '按钮悬停颜色'),
  /* 按钮激活颜色 */
  buttonActiveColor: mRapidC('--rapid-button-active-color', '#004085', '按钮激活颜色'),
  /* 图标颜色 */
  iconColor: mRapidC('--rapid-icon-color', '#6c757d', '图标颜色'),
  /* 菜单项悬停颜色 */
  menuItemHoverColor: mRapidC('--rapid-menu-item-hover-color', '#f8f9fa', '菜单项悬停颜色'),
  /* 菜单项激活颜色 */
  menuItemActiveColor: mRapidC('--rapid-menu-item-active-color', '#e9ecef', '菜单项激活颜色'),
  /* 面板背景色 */
  panelBackgroundColor: mRapidC('--rapid-panel-background-color', '#ffffff', '面板背景色'),
  /* 面板边框颜色 */
  panelBorderColor: mRapidC('--rapid-panel-border-color', '#dee2e6', '面板边框颜色')
} as const;

export const themeCssVarsSheet = {
  ...widgetVarsSheet,
  ...navbarVarsSheet,
  ...colorVarsSheet,
  ...buttonVarsSheet,
  ...messageVarsSheet,
  ...cardVarsSheet,
  ...dropdownVarsSheet,

  ...colorsVarsSheet,
  ...sizeVarsSheet
} as const;
