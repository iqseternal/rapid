import * as _suey_pkg_utils from '@suey/pkg-utils';
import { AxiosError, RequestConfig, ApiPromiseResultTypeBuilder, AxiosResponse, ExtractNever, CutHead, RPromiseLike, Ansi, apiGet, apiPost, apiPut, apiDelete, request, createApiRequest, createRequest, aesEncrypt, aesDecrypt, aesEncryptAlgorithm, aesDecryptAlgorithm, jose, cryptoTs, jsr, toNil, toNils, toWaitPromise } from '@suey/pkg-utils';
import * as _meta2d_core from '@meta2d/core';
import * as react from 'react';
import { ComponentType, HTMLAttributes, ReactNode, Component, FC, LazyExoticComponent, ForwardRefExoticComponent, MemoExoticComponent, ReactElement } from 'react';
import * as _vue_reactivity from '@vue/reactivity';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as antd from 'antd';
import { TooltipProps, PopoverProps } from 'antd';
import * as iconInstance from '@ant-design/icons';
import iconInstance__default from '@ant-design/icons';
import * as react_i18next from 'react-i18next';
import i18n from 'i18next';
import * as zustand_middleware from 'zustand/middleware';
import * as zustand from 'zustand';
import * as moment from 'moment';
import * as react_transition_group from 'react-transition-group';
import * as _react_spring_web from '@react-spring/web';
import { IpcRenderer as IpcRenderer$1, WebFrame, NodeProcess } from '@electron-toolkit/preload';
import { IpcMainInvokeEvent, IpcMainEvent, BrowserWindow, BrowserWindowConstructorOptions, OpenDevToolsOptions } from 'electron';

interface RApiHConfig {
    readonly needAuth?: boolean;
}
interface RApiBasicResponse {
    readonly code: 0 | number;
    readonly message: string;
    readonly data: any;
    readonly more?: {
        readonly pako?: boolean;
    };
}
interface RApiSuccessResponse extends RApiBasicResponse {
}
interface RApiFailResponse extends RApiBasicResponse {
    readonly INNER: {
        readonly stack: string;
        readonly name: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['name'];
        readonly config: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['config'];
        readonly request: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['request'];
        readonly response: AxiosError<Omit<RApiFailResponse, 'INNER'>, any>['response'];
    };
}
declare const rApiGet: <SuccessResponse = unknown, FailResponse = unknown>(url: string, apiConfig?: RequestConfig<RApiHConfig>) => ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, SuccessResponse, FailResponse, "data">;
declare const rApiPost: <SuccessResponse = unknown, FailResponse = unknown>(url: string, apiConfig?: RequestConfig<RApiHConfig>) => ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, SuccessResponse, FailResponse, "data">;
declare const rRequest: _suey_pkg_utils.RequestFunction<RApiHConfig, RApiSuccessResponse, RApiFailResponse, "data">;
declare const rCreateApi: (method: _suey_pkg_utils.Method) => <SuccessResponse = unknown, FailResponse = unknown>(url: string, apiConfig?: RequestConfig<RApiHConfig>) => ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, SuccessResponse, FailResponse, "data">;
declare const rApiPut: <SuccessResponse = unknown, FailResponse = unknown>(url: string, apiConfig?: RequestConfig<RApiHConfig>) => ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, SuccessResponse, FailResponse, "data">;
declare const rApiDelete: <SuccessResponse = unknown, FailResponse = unknown>(url: string, apiConfig?: RequestConfig<RApiHConfig>) => ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, SuccessResponse, FailResponse, "data">;
declare const rApiPatch: <SuccessResponse = unknown, FailResponse = unknown>(url: string, apiConfig?: RequestConfig<RApiHConfig>) => ApiPromiseResultTypeBuilder<RApiSuccessResponse, RApiFailResponse, SuccessResponse, FailResponse, "data">;

declare global {

  /**
   * 事件总线相关的类型定义
   */
  export namespace Rapid.Bus {
    /**
     * 事件总线 Emitter 的入口映射关系
     */
    export type BusEmitterEntries = {

    }

    /**
     * 事件总线 Invoker 的入口映射关系
     */
    export type BusInvokerEntries = {
      /**
       * api-err 分发器
       */
      'r-api-err-distributor': (response: AxiosResponse<RApiSuccessResponse, RApiFailResponse>) => Promise<RApiBasicResponse>;

      /**
       * rx-api-err: 资源访问没有权限
       */
      'r-api-err:unauthorized-resource': (response: AxiosResponse<RApiSuccessResponse, RApiFailResponse>) => Promise<RApiBasicResponse>;

      /**
       * rx-api-err: 用户凭证访问没有权限
       */
      'r-api-err:unauthorized-credential': (response: AxiosResponse<RApiSuccessResponse, RApiFailResponse>) => Promise<RApiBasicResponse>;

      /**
       * invoker: 获取 store access_token
       */
      'data-getter:from-store:access-token': () => Promise<string | null>;

      /**
       * invoker: 获取 store refresh_token
       */
      'data-getter:from-store:refresh-token': () => Promise<string | null>;
    }
  }
}

type CssVariable = `--rd-${string}`;
type CssVariableValue = string;
type CssVariableTip = string;
interface CssVariablePayload<Variable extends CssVariable = CssVariable, Value extends CssVariableValue = CssVariableValue, Tip extends CssVariableTip = CssVariableTip> {
    readonly variable: Variable;
    value: Value;
    readonly tip: Tip;
}
type ExtractCssVariableFromPayload<Payload extends CssVariablePayload> = Payload['variable'];
type ExtractCssVariableValueFromPayload<Payload extends CssVariablePayload> = Payload['value'];
type CssVariablePayloadSheet = Record<string, CssVariablePayload>;
type CssVar<Payload extends CssVariablePayload> = `var(${ExtractCssVariableFromPayload<Payload>}, ${ExtractCssVariableValueFromPayload<Payload>})`;
type CssVars<Sheet extends CssVariablePayloadSheet> = {
    readonly [Key in keyof Sheet]: CssVar<Sheet[Key]>;
};
type CssVariablesDeclaration<PayloadSheet extends CssVariablePayloadSheet> = {
    [Key in (keyof PayloadSheet) as ExtractCssVariableFromPayload<PayloadSheet[Key]>]: (ExtractCssVariableValueFromPayload<PayloadSheet[Key]> extends number ? number : string);
};
declare const makeCssVarPayload: <CssVar_1 extends `--rd-${string}`, CssVarValue extends string, CssTip extends string>(cssVariableName: CssVar_1, cssVariableValue: CssVarValue, cssVariableTip: CssTip) => CssVariablePayload<CssVar_1, CssVarValue, CssTip>;
declare const mrvp: <CssVar_1 extends `--rd-${string}`, CssVarValue extends string, CssTip extends string>(cssVariableName: CssVar_1, cssVariableValue: CssVarValue, cssVariableTip: CssTip) => CssVariablePayload<CssVar_1, CssVarValue, CssTip>;
declare class Skin<PayloadSheet extends CssVariablePayloadSheet> {
    private readonly runtimeContext;
    private readonly presetCssVariablesPayloadSheet;
    cssVariablesPayloadSheet: PayloadSheet;
    constructor(cssVariablesPayloadSheet: PayloadSheet);
    private cloneCssVariablesPayloadSheet;
    resetCssVarsSheet(): void;
    toCssVariablesDeclaration(): CssVariablesDeclaration<PayloadSheet>;
    toCssVar<Payload extends CssVariablePayload>(selector: (sheet: CssVariablePayloadSheet) => Payload): CssVar<Payload>;
    toCssVars(): CssVars<PayloadSheet>;
    transformer(transformer: (sheet: PayloadSheet) => void): void;
    transformers(transformers: ((sheet: PayloadSheet) => void)[]): void;
    install(): void;
    uninstall(): void;
}

declare const colorPrimary: CssVariablePayload<"--rd-global-color-primary", "#3498db", "全局主题色">;
declare const colorSuccess: CssVariablePayload<"--rd-global-color-success", "#2ecc71", "全局成功色">;
declare const colorWarning: CssVariablePayload<"--rd-global-color-warning", "#f1c40f", "全局警告色">;
declare const colorError: CssVariablePayload<"--rd-global-color-danger", "#e74c3c", "全局危险色">;
declare const colorNeutral0: CssVariablePayload<"--rd-global-color-neutral-0", "#ffffff", "全局中性色">;
declare const colorNeutral50: CssVariablePayload<"--rd-global-color-neutral-50", "#fafafa", "全局中性色">;
declare const colorNeutral100: CssVariablePayload<"--rd-global-color-neutral-100", "#f5f5f5", "全局中性色">;
declare const colorNeutral200: CssVariablePayload<"--rd-global-color-neutral-200", "#eeeeee", "全局中性色">;
declare const colorNeutral300: CssVariablePayload<"--rd-global-color-neutral-300", "#e0e0e0", "全局中性色">;
declare const colorNeutral400: CssVariablePayload<"--rd-global-color-neutral-400", "#bdbdbd", "全局中性色">;
declare const colorNeutral500: CssVariablePayload<"--rd-global-color-neutral-500", "#9e9e9e", "全局中性色">;
declare const colorNeutral600: CssVariablePayload<"--rd-global-color-neutral-600", "#757575", "全局中性色">;
declare const colorNeutral700: CssVariablePayload<"--rd-global-color-neutral-700", "#616161", "全局中性色">;
declare const colorNeutral800: CssVariablePayload<"--rd-global-color-neutral-800", "#424242", "全局中性色">;
declare const colorNeutral900: CssVariablePayload<"--rd-global-color-neutral-900", "#212121", "全局中性色">;
declare const spacingUnit: CssVariablePayload<"--rd-global-spacing-unit", "2px", "全局间距单位">;
declare const spacingXs: CssVariablePayload<"--rd-global-spacing-xs-unit", "calc(1 * var(--rd-global-spacing-unit))", "全局超小间距">;
declare const spacingSm: CssVariablePayload<"--rd-global-spacing-sm-unit", "calc(2 * var(--rd-global-spacing-unit))", "全局小间距">;
declare const spacingMd: CssVariablePayload<"--rd-global-spacing-md-unit", "calc(4 * var(--rd-global-spacing-unit))", "全局中等间距">;
declare const spacingLg: CssVariablePayload<"--rd-global-spacing-lg-unit", "calc(5 * var(--rd-global-spacing-unit))", "全局大间距">;
declare const spacingXl: CssVariablePayload<"--rd-global-spacing-xl-unit", "calc(6 * var(--rd-global-spacing-unit))", "全局超大间距">;
declare const borderRadiusUnit: CssVariablePayload<"--rd-global-border-radius-unit", "4px", "全局圆角单位">;
declare const borderRadiusXs: CssVariablePayload<"--rd-global-border-radius-small-unit", "calc(0.5 * var(--rd-global-border-radius-unit))", "全局圆角单位">;
declare const borderRadiusSm: CssVariablePayload<"--rd-global-border-radius-small-unit", "calc(1 * var(--rd-global-border-radius-unit))", "全局圆角单位">;
declare const borderRadiusMd: CssVariablePayload<"--rd-global-border-radius-small-unit", "calc(2 * var(--rd-global-border-radius-unit))", "全局圆角单位">;
declare const borderRadiusLg: CssVariablePayload<"--rd-global-border-radius-small-unit", "calc(3 * var(--rd-global-border-radius-unit))", "全局圆角单位">;
declare const borderRadiusXl: CssVariablePayload<"--rd-global-border-radius-small-unit", "calc(4 * var(--rd-global-border-radius-unit))", "全局圆角单位">;
declare const borderRadiusFull: CssVariablePayload<"--rd-global-border-radius-full", "9999px", "全局圆角单位">;
declare const shadowXs: CssVariablePayload<"--rd-global-shadow-xs", "0 1px 2px rgba(0,0,0,0.05)", "全局阴影">;
declare const shadowSm: CssVariablePayload<"--rd-global-shadow-sm", "0 2px 4px rgba(0,0,0,0.05)", "全局阴影">;
declare const shadowMd: CssVariablePayload<"--rd-global-shadow-md", "0 4px 8px rgba(0,0,0,0.05)", "全局阴影">;
declare const shadowLg: CssVariablePayload<"--rd-global-shadow-lg", "0 8px 16px rgba(0,0,0,0.05)", "全局阴影">;
declare const shadowXl: CssVariablePayload<"--rd-global-shadow-xl", "0 16px 32px rgba(0,0,0,0.05)", "全局阴影">;
declare const fontSizeXs: CssVariablePayload<"--rd-global-font-size-xs", "0.75rem", "全局字体大小">;
declare const fontSizeSm: CssVariablePayload<"--rd-global-font-size-sm", "0.875rem", "全局字体大小">;
declare const fontSizeMd: CssVariablePayload<"--rd-global-font-size-md", "1rem", "全局字体大小">;
declare const fontSizeLg: CssVariablePayload<"--rd-global-font-size-lg", "1.125rem", "全局字体大小">;
declare const fontSizeXl: CssVariablePayload<"--rd-global-font-size-xl", "1.25rem", "全局字体大小">;
declare const fontSize2Xl: CssVariablePayload<"--rd-global-font-size-xxl", "1.5rem", "全局字体大小">;
declare const fontWeightLight: CssVariablePayload<"--rd-global-font-weight-light", "300", "全局细体字重">;
declare const fontWeightRegular: CssVariablePayload<"--rd-global-font-weight-regular", "400", "全局常规字重">;
declare const fontWeightMedium: CssVariablePayload<"--rd-global-font-weight-medium", "500", "全局中等字重">;
declare const fontWeightBold: CssVariablePayload<"--rd-global-font-weight-bold", "700", "全局粗体字重">;
declare const colorTextPrimary: CssVariablePayload<"--rd-global-color-text-primary", "var(--rd-global-color-neutral-900)", "全局主要文本色">;
declare const colorTextSecondary: CssVariablePayload<"--rd-global-color-text-secondary", "var(--rd-global-color-neutral-700)", "全局次要文本色">;
declare const colorTextTertiary: CssVariablePayload<"--rd-global-color-text-tertiary", "var(--rd-global-color-neutral-500)", "全局第三文本色">;
declare const colorTextDisabled: CssVariablePayload<"--rd-global-color-text-disabled", "var(--rd-global-color-neutral-400)", "全局禁用文本色">;
declare const colorTextInverse: CssVariablePayload<"--rd-global-color-text-inverse", "var(--rd-global-color-neutral-50)", "全局反色文本">;
declare const colorTextLink: CssVariablePayload<"--rd-global-color-text-link", "var(--rd-global-color-primary)", "全局链接文本色">;
declare const colorTextSuccess: CssVariablePayload<"--rd-global-color-text-success", "var(--rd-global-color-success)", "全局成功文本色">;
declare const colorTextWarning: CssVariablePayload<"--rd-global-color-text-warning", "var(--rd-global-color-warning)", "全局警告文本色">;
declare const colorTextError: CssVariablePayload<"--rd-global-color-text-danger", "var(--rd-global-color-danger)", "全局错误文本色">;
declare const surfacePrimary: CssVariablePayload<"--rd-global-surface-primary", "var(--rd-global-color-neutral-100)", "全局主要表面色">;
declare const surfaceSecondary: CssVariablePayload<"--rd-global-surface-secondary", "var(--rd-global-color-neutral-50)", "全局次要表面色">;
declare const surfaceTertiary: CssVariablePayload<"--rd-global-surface-tertiary", "var(--rd-global-color-neutral-200)", "全局第三表面色">;
declare const borderPrimary: CssVariablePayload<"--rd-global-border-primary", "1px solid var(--rd-global-color-neutral-300)", "全局主要边框">;
declare const borderSecondary: CssVariablePayload<"--rd-global-border-secondary", "1px solid var(--rd-global-color-neutral-200)", "全局次要边框">;
declare const borderTertiary: CssVariablePayload<"--rd-global-border-tertiary", "1px solid var(--rd-global-color-neutral-100)", "全局第三边框">;
declare const borderFocus: CssVariablePayload<"--rd-global-border-focus", "1px solid var(--rd-global-color-primary)", "全局聚焦边框">;
declare const borderError: CssVariablePayload<"--rd-global-border-error", "1px solid var(--rd-global-color-danger)", "全局错误边框">;
declare const interactivePrimary: CssVariablePayload<"--rd-global-interactive-primary", "var(--rd-global-color-primary)", "全局主要交互色">;
declare const interactivePrimaryHover: CssVariablePayload<"--rd-global-interactive-primary-hover", "#2980b9", "全局主要交互悬停色">;
declare const interactivePrimaryActive: CssVariablePayload<"--rd-global-interactive-primary-active", "#1d6fa5", "全局主要交互激活色">;
declare const interactivePrimaryDisabled: CssVariablePayload<"--rd-global-interactive-primary-disabled", "var(--rd-global-color-neutral-300)", "全局主要交互禁用色">;
declare const interactiveSecondary: CssVariablePayload<"--rd-global-interactive-secondary", "var(--rd-global-color-neutral-400)", "全局次要交互色">;
declare const interactiveSecondaryHover: CssVariablePayload<"--rd-global-interactive-secondary-hover", "var(--rd-global-color-neutral-500)", "全局次要交互悬停色">;
declare const interactiveSecondaryActive: CssVariablePayload<"--rd-global-interactive-secondary-active", "var(--rd-global-color-neutral-600)", "全局次要交互激活色">;
declare const interactiveSecondaryDisabled: CssVariablePayload<"--rd-global-interactive-secondary-disabled", "var(--rd-global-color-neutral-200)", "全局次要交互禁用色">;
declare const uiWidgetWidth: CssVariablePayload<"--rd-ui-widget-width", "26px", "控件宽度">;
declare const uiWidgetHeight: CssVariablePayload<"--rd-ui-widget-height", "26px", "控件高度">;
declare const uiWidgetColorPrimary: CssVariablePayload<"--rd-ui-widget-color-primary", "var(--rd-global-color-neutral-700)", "控件颜色">;
declare const uiWidgetBackgroundPrimary: CssVariablePayload<"--rd-ui-widget-background-primary", "var(--rd-global-color-neutral-50)", "控件颜色">;
declare const uiWidgetHoverBackgroundPrimary: CssVariablePayload<"--rd-ui-widget-hover-background-primary", "var(--rd-global-color-neutral-100)", "控件颜色">;
declare const uiWidgetBorderRadius: CssVariablePayload<"--rd-ui-widget-border-radius", "4px", "控件圆角半径">;
declare const uiDefaultButtonBackground: CssVariablePayload<"--rd-ui-default-button-background", "var(--rd-global-color-neutral-50)", "默认按钮背景色">;
declare const uiDefaultButtonTextColor: CssVariablePayload<"--rd-ui-default-button-text-color", "var(--rd-global-color-neutral-700)", "默认按钮文本色">;
declare const uiDefaultButtonRadius: CssVariablePayload<"--rd-ui-default-button-radius", "10px", "默认按钮圆角半径">;
declare const uiCaptionBarHeight: CssVariablePayload<"--rd-ui-caption-bar-height", "32px", "标题栏高度">;
declare const uiCaptionBarBackground: CssVariablePayload<"--rd-ui-caption-bar-background", "var(--rd-global-color-neutral-0)", "标题栏背景色">;
declare const uiNavigationBarWidth: CssVariablePayload<"--rd-ui-navigation-bar-width", "32px", "纵向导航栏宽度">;
declare const uiNavigationBarBackground: CssVariablePayload<"--rd-ui-navigation-bar-background", "var(--rd-global-color-neutral-0)", "导航栏背景色">;
declare const uiAutoMenuBackground: CssVariablePayload<"--rd-ui-auto-menu-background", "var(--rd-global-color-neutral-0)", "自动菜单背景色">;
declare const uiAutoMenuTextColor: CssVariablePayload<"--rd-ui-auto-menu-text-color", "var(--rd-global-color-neutral-700)", "自动菜单文本色">;
declare const uiAutoMenuRadius: CssVariablePayload<"--rd-ui-auto-menu-radius", "10px", "自动菜单圆角半径">;

declare const cssVariablePayloadSheet_borderError: typeof borderError;
declare const cssVariablePayloadSheet_borderFocus: typeof borderFocus;
declare const cssVariablePayloadSheet_borderPrimary: typeof borderPrimary;
declare const cssVariablePayloadSheet_borderRadiusFull: typeof borderRadiusFull;
declare const cssVariablePayloadSheet_borderRadiusLg: typeof borderRadiusLg;
declare const cssVariablePayloadSheet_borderRadiusMd: typeof borderRadiusMd;
declare const cssVariablePayloadSheet_borderRadiusSm: typeof borderRadiusSm;
declare const cssVariablePayloadSheet_borderRadiusUnit: typeof borderRadiusUnit;
declare const cssVariablePayloadSheet_borderRadiusXl: typeof borderRadiusXl;
declare const cssVariablePayloadSheet_borderRadiusXs: typeof borderRadiusXs;
declare const cssVariablePayloadSheet_borderSecondary: typeof borderSecondary;
declare const cssVariablePayloadSheet_borderTertiary: typeof borderTertiary;
declare const cssVariablePayloadSheet_colorError: typeof colorError;
declare const cssVariablePayloadSheet_colorNeutral0: typeof colorNeutral0;
declare const cssVariablePayloadSheet_colorNeutral100: typeof colorNeutral100;
declare const cssVariablePayloadSheet_colorNeutral200: typeof colorNeutral200;
declare const cssVariablePayloadSheet_colorNeutral300: typeof colorNeutral300;
declare const cssVariablePayloadSheet_colorNeutral400: typeof colorNeutral400;
declare const cssVariablePayloadSheet_colorNeutral50: typeof colorNeutral50;
declare const cssVariablePayloadSheet_colorNeutral500: typeof colorNeutral500;
declare const cssVariablePayloadSheet_colorNeutral600: typeof colorNeutral600;
declare const cssVariablePayloadSheet_colorNeutral700: typeof colorNeutral700;
declare const cssVariablePayloadSheet_colorNeutral800: typeof colorNeutral800;
declare const cssVariablePayloadSheet_colorNeutral900: typeof colorNeutral900;
declare const cssVariablePayloadSheet_colorPrimary: typeof colorPrimary;
declare const cssVariablePayloadSheet_colorSuccess: typeof colorSuccess;
declare const cssVariablePayloadSheet_colorTextDisabled: typeof colorTextDisabled;
declare const cssVariablePayloadSheet_colorTextError: typeof colorTextError;
declare const cssVariablePayloadSheet_colorTextInverse: typeof colorTextInverse;
declare const cssVariablePayloadSheet_colorTextLink: typeof colorTextLink;
declare const cssVariablePayloadSheet_colorTextPrimary: typeof colorTextPrimary;
declare const cssVariablePayloadSheet_colorTextSecondary: typeof colorTextSecondary;
declare const cssVariablePayloadSheet_colorTextSuccess: typeof colorTextSuccess;
declare const cssVariablePayloadSheet_colorTextTertiary: typeof colorTextTertiary;
declare const cssVariablePayloadSheet_colorTextWarning: typeof colorTextWarning;
declare const cssVariablePayloadSheet_colorWarning: typeof colorWarning;
declare const cssVariablePayloadSheet_fontSize2Xl: typeof fontSize2Xl;
declare const cssVariablePayloadSheet_fontSizeLg: typeof fontSizeLg;
declare const cssVariablePayloadSheet_fontSizeMd: typeof fontSizeMd;
declare const cssVariablePayloadSheet_fontSizeSm: typeof fontSizeSm;
declare const cssVariablePayloadSheet_fontSizeXl: typeof fontSizeXl;
declare const cssVariablePayloadSheet_fontSizeXs: typeof fontSizeXs;
declare const cssVariablePayloadSheet_fontWeightBold: typeof fontWeightBold;
declare const cssVariablePayloadSheet_fontWeightLight: typeof fontWeightLight;
declare const cssVariablePayloadSheet_fontWeightMedium: typeof fontWeightMedium;
declare const cssVariablePayloadSheet_fontWeightRegular: typeof fontWeightRegular;
declare const cssVariablePayloadSheet_interactivePrimary: typeof interactivePrimary;
declare const cssVariablePayloadSheet_interactivePrimaryActive: typeof interactivePrimaryActive;
declare const cssVariablePayloadSheet_interactivePrimaryDisabled: typeof interactivePrimaryDisabled;
declare const cssVariablePayloadSheet_interactivePrimaryHover: typeof interactivePrimaryHover;
declare const cssVariablePayloadSheet_interactiveSecondary: typeof interactiveSecondary;
declare const cssVariablePayloadSheet_interactiveSecondaryActive: typeof interactiveSecondaryActive;
declare const cssVariablePayloadSheet_interactiveSecondaryDisabled: typeof interactiveSecondaryDisabled;
declare const cssVariablePayloadSheet_interactiveSecondaryHover: typeof interactiveSecondaryHover;
declare const cssVariablePayloadSheet_shadowLg: typeof shadowLg;
declare const cssVariablePayloadSheet_shadowMd: typeof shadowMd;
declare const cssVariablePayloadSheet_shadowSm: typeof shadowSm;
declare const cssVariablePayloadSheet_shadowXl: typeof shadowXl;
declare const cssVariablePayloadSheet_shadowXs: typeof shadowXs;
declare const cssVariablePayloadSheet_spacingLg: typeof spacingLg;
declare const cssVariablePayloadSheet_spacingMd: typeof spacingMd;
declare const cssVariablePayloadSheet_spacingSm: typeof spacingSm;
declare const cssVariablePayloadSheet_spacingUnit: typeof spacingUnit;
declare const cssVariablePayloadSheet_spacingXl: typeof spacingXl;
declare const cssVariablePayloadSheet_spacingXs: typeof spacingXs;
declare const cssVariablePayloadSheet_surfacePrimary: typeof surfacePrimary;
declare const cssVariablePayloadSheet_surfaceSecondary: typeof surfaceSecondary;
declare const cssVariablePayloadSheet_surfaceTertiary: typeof surfaceTertiary;
declare const cssVariablePayloadSheet_uiAutoMenuBackground: typeof uiAutoMenuBackground;
declare const cssVariablePayloadSheet_uiAutoMenuRadius: typeof uiAutoMenuRadius;
declare const cssVariablePayloadSheet_uiAutoMenuTextColor: typeof uiAutoMenuTextColor;
declare const cssVariablePayloadSheet_uiCaptionBarBackground: typeof uiCaptionBarBackground;
declare const cssVariablePayloadSheet_uiCaptionBarHeight: typeof uiCaptionBarHeight;
declare const cssVariablePayloadSheet_uiDefaultButtonBackground: typeof uiDefaultButtonBackground;
declare const cssVariablePayloadSheet_uiDefaultButtonRadius: typeof uiDefaultButtonRadius;
declare const cssVariablePayloadSheet_uiDefaultButtonTextColor: typeof uiDefaultButtonTextColor;
declare const cssVariablePayloadSheet_uiNavigationBarBackground: typeof uiNavigationBarBackground;
declare const cssVariablePayloadSheet_uiNavigationBarWidth: typeof uiNavigationBarWidth;
declare const cssVariablePayloadSheet_uiWidgetBackgroundPrimary: typeof uiWidgetBackgroundPrimary;
declare const cssVariablePayloadSheet_uiWidgetBorderRadius: typeof uiWidgetBorderRadius;
declare const cssVariablePayloadSheet_uiWidgetColorPrimary: typeof uiWidgetColorPrimary;
declare const cssVariablePayloadSheet_uiWidgetHeight: typeof uiWidgetHeight;
declare const cssVariablePayloadSheet_uiWidgetHoverBackgroundPrimary: typeof uiWidgetHoverBackgroundPrimary;
declare const cssVariablePayloadSheet_uiWidgetWidth: typeof uiWidgetWidth;
declare namespace cssVariablePayloadSheet {
  export { cssVariablePayloadSheet_borderError as borderError, cssVariablePayloadSheet_borderFocus as borderFocus, cssVariablePayloadSheet_borderPrimary as borderPrimary, cssVariablePayloadSheet_borderRadiusFull as borderRadiusFull, cssVariablePayloadSheet_borderRadiusLg as borderRadiusLg, cssVariablePayloadSheet_borderRadiusMd as borderRadiusMd, cssVariablePayloadSheet_borderRadiusSm as borderRadiusSm, cssVariablePayloadSheet_borderRadiusUnit as borderRadiusUnit, cssVariablePayloadSheet_borderRadiusXl as borderRadiusXl, cssVariablePayloadSheet_borderRadiusXs as borderRadiusXs, cssVariablePayloadSheet_borderSecondary as borderSecondary, cssVariablePayloadSheet_borderTertiary as borderTertiary, cssVariablePayloadSheet_colorError as colorError, cssVariablePayloadSheet_colorNeutral0 as colorNeutral0, cssVariablePayloadSheet_colorNeutral100 as colorNeutral100, cssVariablePayloadSheet_colorNeutral200 as colorNeutral200, cssVariablePayloadSheet_colorNeutral300 as colorNeutral300, cssVariablePayloadSheet_colorNeutral400 as colorNeutral400, cssVariablePayloadSheet_colorNeutral50 as colorNeutral50, cssVariablePayloadSheet_colorNeutral500 as colorNeutral500, cssVariablePayloadSheet_colorNeutral600 as colorNeutral600, cssVariablePayloadSheet_colorNeutral700 as colorNeutral700, cssVariablePayloadSheet_colorNeutral800 as colorNeutral800, cssVariablePayloadSheet_colorNeutral900 as colorNeutral900, cssVariablePayloadSheet_colorPrimary as colorPrimary, cssVariablePayloadSheet_colorSuccess as colorSuccess, cssVariablePayloadSheet_colorTextDisabled as colorTextDisabled, cssVariablePayloadSheet_colorTextError as colorTextError, cssVariablePayloadSheet_colorTextInverse as colorTextInverse, cssVariablePayloadSheet_colorTextLink as colorTextLink, cssVariablePayloadSheet_colorTextPrimary as colorTextPrimary, cssVariablePayloadSheet_colorTextSecondary as colorTextSecondary, cssVariablePayloadSheet_colorTextSuccess as colorTextSuccess, cssVariablePayloadSheet_colorTextTertiary as colorTextTertiary, cssVariablePayloadSheet_colorTextWarning as colorTextWarning, cssVariablePayloadSheet_colorWarning as colorWarning, cssVariablePayloadSheet_fontSize2Xl as fontSize2Xl, cssVariablePayloadSheet_fontSizeLg as fontSizeLg, cssVariablePayloadSheet_fontSizeMd as fontSizeMd, cssVariablePayloadSheet_fontSizeSm as fontSizeSm, cssVariablePayloadSheet_fontSizeXl as fontSizeXl, cssVariablePayloadSheet_fontSizeXs as fontSizeXs, cssVariablePayloadSheet_fontWeightBold as fontWeightBold, cssVariablePayloadSheet_fontWeightLight as fontWeightLight, cssVariablePayloadSheet_fontWeightMedium as fontWeightMedium, cssVariablePayloadSheet_fontWeightRegular as fontWeightRegular, cssVariablePayloadSheet_interactivePrimary as interactivePrimary, cssVariablePayloadSheet_interactivePrimaryActive as interactivePrimaryActive, cssVariablePayloadSheet_interactivePrimaryDisabled as interactivePrimaryDisabled, cssVariablePayloadSheet_interactivePrimaryHover as interactivePrimaryHover, cssVariablePayloadSheet_interactiveSecondary as interactiveSecondary, cssVariablePayloadSheet_interactiveSecondaryActive as interactiveSecondaryActive, cssVariablePayloadSheet_interactiveSecondaryDisabled as interactiveSecondaryDisabled, cssVariablePayloadSheet_interactiveSecondaryHover as interactiveSecondaryHover, cssVariablePayloadSheet_shadowLg as shadowLg, cssVariablePayloadSheet_shadowMd as shadowMd, cssVariablePayloadSheet_shadowSm as shadowSm, cssVariablePayloadSheet_shadowXl as shadowXl, cssVariablePayloadSheet_shadowXs as shadowXs, cssVariablePayloadSheet_spacingLg as spacingLg, cssVariablePayloadSheet_spacingMd as spacingMd, cssVariablePayloadSheet_spacingSm as spacingSm, cssVariablePayloadSheet_spacingUnit as spacingUnit, cssVariablePayloadSheet_spacingXl as spacingXl, cssVariablePayloadSheet_spacingXs as spacingXs, cssVariablePayloadSheet_surfacePrimary as surfacePrimary, cssVariablePayloadSheet_surfaceSecondary as surfaceSecondary, cssVariablePayloadSheet_surfaceTertiary as surfaceTertiary, cssVariablePayloadSheet_uiAutoMenuBackground as uiAutoMenuBackground, cssVariablePayloadSheet_uiAutoMenuRadius as uiAutoMenuRadius, cssVariablePayloadSheet_uiAutoMenuTextColor as uiAutoMenuTextColor, cssVariablePayloadSheet_uiCaptionBarBackground as uiCaptionBarBackground, cssVariablePayloadSheet_uiCaptionBarHeight as uiCaptionBarHeight, cssVariablePayloadSheet_uiDefaultButtonBackground as uiDefaultButtonBackground, cssVariablePayloadSheet_uiDefaultButtonRadius as uiDefaultButtonRadius, cssVariablePayloadSheet_uiDefaultButtonTextColor as uiDefaultButtonTextColor, cssVariablePayloadSheet_uiNavigationBarBackground as uiNavigationBarBackground, cssVariablePayloadSheet_uiNavigationBarWidth as uiNavigationBarWidth, cssVariablePayloadSheet_uiWidgetBackgroundPrimary as uiWidgetBackgroundPrimary, cssVariablePayloadSheet_uiWidgetBorderRadius as uiWidgetBorderRadius, cssVariablePayloadSheet_uiWidgetColorPrimary as uiWidgetColorPrimary, cssVariablePayloadSheet_uiWidgetHeight as uiWidgetHeight, cssVariablePayloadSheet_uiWidgetHoverBackgroundPrimary as uiWidgetHoverBackgroundPrimary, cssVariablePayloadSheet_uiWidgetWidth as uiWidgetWidth };
}

type RdCssVariablePayloadSheet = {
    [Key in keyof typeof cssVariablePayloadSheet]: Omit<(typeof cssVariablePayloadSheet)[Key], 'value'> & {
        value: string;
    };
};

type ExtensionName = string;
type ExtensionOnActivated<Context = unknown> = (context?: Context) => ((() => void) | Promise<(() => void)> | void | Promise<void>);
type ExtensionOnDeactivated<Context = unknown> = (context?: Context) => (void | Promise<void>);
interface Extension<Context = unknown> {
    readonly name: ExtensionName;
    readonly version: string | number;
    meta?: any;
    readonly onActivated?: ExtensionOnActivated<Context>;
    readonly onDeactivated?: ExtensionOnDeactivated<Context>;
}
type ExtractExtensionContext<Ext extends Extension> = Parameters<Exclude<Ext['onActivated'], undefined>>[0];

type InnerStoreListener = () => void;
type InnerStoreDestroyListener = () => void;
declare abstract class InnerZustandStoreManager {
    private readonly store;
    private readonly listeners;
    private readonly unsubscribeListeners;
    protected updateStore(): void;
    protected useStoreValueToRerenderComponent(): Record<string, unknown>;
    protected unsubscribe(listener: InnerStoreListener): void;
    protected subscribe(listener: InnerStoreListener): InnerStoreDestroyListener;
    protected destroy(): void;
    protected getListenerCount(): number;
}

declare class ExtensionManager<Ext extends Extension> extends InnerZustandStoreManager {
    private readonly extNameMapStore;
    defineExtension<DExt extends Ext>(define: DExt): DExt;
    isExtension<DExt extends Ext>(extension: DExt | any): extension is DExt;
    hasExtension(extensionName: ExtensionName): boolean;
    getExtension(extensionName: ExtensionName): Extension<unknown>;
    registerExtension<DExt extends Ext>(extension: DExt): void;
    activatedExtension<Context extends ExtractExtensionContext<Ext>>(name: ExtensionName, context?: Context): Promise<void>;
    deactivatedExtension<Context extends ExtractExtensionContext<Ext>>(name: ExtensionName, context?: Context): Promise<void>;
    delExtension<Context extends ExtractExtensionContext<Ext>>(name: ExtensionName, context?: Context): Promise<void>;
    useExtensionsList(): readonly [Extension[]];
    getExtensions(): readonly Extension[];
}

type IsAny<T, SuccessReturnType, FailReturnType> = (T extends never ? 'yes' : 'no') extends 'no' ? FailReturnType : SuccessReturnType;
type ExtractElInArray<T> = IsAny<T, never, T extends (infer U)[] ? U : never>;
type ExtractVectorEntries<Entries> = {
    [Key in keyof Entries as (IsAny<Entries[Key], never, Entries[Key] extends unknown[] ? Key : never>)]: Entries[Key];
};
type ExtractSingleEntries<Entries> = {
    [Key in keyof Entries as Entries[Key] extends unknown[] ? never : Key]: Entries[Key];
};

declare class MetadataManager<MetadataEntries extends Record<string, any>> extends InnerZustandStoreManager {
    private readonly metadataMap;
    defineMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]): () => void;
    getMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): MetadataEntries[MetadataKey] | null;
    getMetadataLatestInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey): ExtractElInArray<MetadataEntries[MetadataKey]> | null;
    getMetadataOldestInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey): ExtractElInArray<MetadataEntries[MetadataKey]> | null;
    delMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): void;
    defineMetadataInSingle<MetadataKey extends keyof ExtractSingleEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]): () => void;
    defineMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: ExtractElInArray<MetadataEntries[MetadataKey]>): (() => void);
    delMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: ExtractElInArray<MetadataEntries[MetadataKey]>): void;
    useMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): MetadataEntries[MetadataKey] | null;
    useOldestMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey): ExtractElInArray<MetadataEntries[MetadataKey]> | null;
    useLatestMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey): ExtractElInArray<MetadataEntries[MetadataKey]> | null;
    useAllMetadata(): Map<string | number | symbol, any>;
    hasMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): boolean;
    useFollowMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]): void;
    useFollowMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: ExtractElInArray<MetadataEntries[MetadataKey]>): void;
    useFollowMetadataInSingle<MetadataKey extends keyof ExtractSingleEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]): void;
}

// ==================================================================================================
// ===== WHY TO THIS
// ===== 对已有的类型进行别名定义 - 如果不别名定义会导致 Rapid 域中具有重复的标识符, 会导致 tsup 解析声明出现冲突错误
// ==================================================================================================
interface RdExtension extends Extension<never> {
  meta?: {
    extension_id: number;
    extension_name: string;
    extension_uuid: string;
    extension_version_id: number;
    script_hash: string;
  }
}

declare global {

  /**
   * 扩展相关的类型定义
   */
  export namespace Rapid.Extend {
    /**
     * 扩展的元数据
     */
    export namespace Metadata {

      /**
       * 注册元数据的入口映射关系
       */
      export interface MetadataEntries {
        /**
         * 功能 - 主题 - 变量 - 转换
         */
        'functional.theme.variables.transformer': ((variables: RdCssVariablePayloadSheet) => void)[];

        /**
         * 功能 - meta2d - 注册
         */
        'functional.meta2d.lifecycle.registered': ((meta2d: _meta2d_core.Meta2d) => void)[];

        /**
         * 功能 - meta2d - 卸载
         */
        'functional.meta2d.lifecycle.unregistered': ((meta2d: _meta2d_core.Meta2d) => void)[];

        // =====================================================================================================
        // =====================================================================================================
        // =====================================================================================================

        /**
         * ui-header 图标展示
         */
        'ui.layout.header.icon': ComponentType[];

        /**
         * ui-header-menu 菜单前展示
         */
        'ui.layout.header.menu.before': ComponentType[];

        /**
         * ui-header-menu 菜单展示
         */
        'ui.layout.header.menu.content': ComponentType[];

        /**
         * ui-header-menu 菜单后展示
         */
        'ui.layout.header.menu.after': ComponentType[];

        /**
         * ui-header 中间的核心展示
         */
        'ui.layout.header.main.content': ComponentType[];

        /**
         * ui-header控件前插槽
         */
        'ui.layout.header.controller.before': ComponentType[];

        /**
         * ui - 布局-header-控制 控件
         */
        'ui.layout.header.controller.widgets.others': ComponentType[];

        /**
         * ui-header最小化控件
         */
        'ui.layout.header.controller.widgets.min': ComponentType[];

        /**
         * ui-header还原控件
         */
        'ui.layout.header.controller.widgets.reduction': ComponentType[];

        /**
         * ui-header关闭控件
         */
        'ui.layout.header.controller.widgets.close': ComponentType[];

        /**
         * ui-header控件后插槽
         */
        'ui.layout.header.controller.after': ComponentType[];

        /**
         * ui-navigation 导航条
         */
        'ui.layout.navigation.bar.content': ComponentType[];
      }
    }

    /**
     * 扩展的上下文
     */
    export interface ExtensionContext {

    }

    /**
     * 扩展
     */
    export interface Extension extends RdExtension { }
  }
}

declare function injectReadonlyVariable<T extends {}, Key extends keyof T, Value>(target: T, propertyKey: Key, value: Value, attributes?: PropertyDescriptor & ThisType<any>): void;

declare const NotHasAnyData: react.MemoExoticComponent<() => react_jsx_runtime.JSX.Element>;

declare const Wrong: react.MemoExoticComponent<() => react_jsx_runtime.JSX.Element>;

declare const REmptyInstance: {};
type EmptyType = (typeof REmptyInstance) & {
    readonly NotHasAnyData: typeof NotHasAnyData;
    readonly Wrong: typeof Wrong;
};
declare const REmpty: EmptyType;

type IconInstance = typeof iconInstance__default;
type IconProps = Parameters<IconInstance>[0];
type IconRealKey = Exclude<keyof typeof iconInstance, 'createFromIconfontCN' | 'default' | 'IconProvider' | 'setTwoToneColor' | 'getTwoToneColor'>;
type IconCustomKey = `icon-${string}`;
type IconKey = IconRealKey | IconCustomKey;
interface IconFontProps extends IconProps {
    readonly icon: IconKey;
}
declare const IconFont: react.MemoExoticComponent<(props: IconFontProps) => react_jsx_runtime.JSX.Element>;

interface WidgetProps extends HTMLAttributes<HTMLDivElement> {
    readonly innerClassName?: string;
    readonly hasHoverStyle?: boolean;
    readonly hoverStyleBackground?: string;
    readonly icon?: IconKey;
    readonly loading?: boolean;
    readonly loadingContent?: ReactNode;
    readonly size?: 'base' | 'small' | 'large';
    readonly tipText?: string;
    readonly tipAttrs?: TooltipProps;
    readonly disabled?: boolean;
}
declare const Widget: react.MemoExoticComponent<react.ForwardRefExoticComponent<WidgetProps & react.RefAttributes<HTMLDivElement>>>;

declare const classnames: (...args: (string | undefined | boolean | null | number | Record<string, boolean | undefined>)[]) => string;
declare const isReactLazyFC: <Target extends LazyExoticComponent<FC<any>>>(target: any) => target is Target;
declare const isReactForwardFC: <Target extends ForwardRefExoticComponent<any>>(target: any) => target is Target;
declare const isReactMemoFC: <Target extends MemoExoticComponent<any>>(target: any) => target is Target;
declare const isReactFC: <Target extends FC<any>>(target: any) => target is Target;
declare const isReactClassComponent: <Target extends Component<any, {}, any>>(target: any) => target is Target;
declare const isReactComponent: <Target extends FC<any> | LazyExoticComponent<FC<any>> | ForwardRefExoticComponent<any> | Component<any, {}, any>>(target: any) => target is Target;

interface EllipsisProps {
    readonly children?: ReactNode;
    readonly className?: string;
    readonly defaultContent?: string;
    readonly overlayRender?: (children: ReactNode) => ReactElement;
    readonly tipAttrs?: TooltipProps;
}
declare const EllipsisBase: react.MemoExoticComponent<(props: EllipsisProps) => react_jsx_runtime.JSX.Element>;

interface EllipsisTooltipProps extends Omit<EllipsisProps, 'overlayRender'> {
    readonly tipAttrs?: TooltipProps;
}
declare const EllipsisTooltip: react.MemoExoticComponent<(props: EllipsisTooltipProps) => react_jsx_runtime.JSX.Element>;

interface EllipsisPopoverProps extends Omit<EllipsisProps, 'overlayRender'> {
    readonly tipAttrs?: PopoverProps;
}
declare const EllipsisPopover: react.MemoExoticComponent<(props: EllipsisPopoverProps) => react_jsx_runtime.JSX.Element>;

type EllipsisType = typeof EllipsisBase & {
    readonly Tooltip: typeof EllipsisTooltip;
    readonly Popover: typeof EllipsisPopover;
};
declare const Ellipsis: EllipsisType;

declare enum Timestamp {
    Millisecond = 1,
    Second = 1000,
    Minute = 60000,
    HalfMinute = 30000,
    Hour = 3600000,
    HalfHour = 1800000,
    Day = 86400000,
    HalfDay = 43200000,
    Week = 604800000,
    HalfWeek = 302400000,
    Month = 2592000000,
    HalfMonth = 1296000000,
    Month28 = 2419200000,
    Month29 = 2505600000,
    Month30 = 2592000000,
    Month31 = 2678400000,
    Year = 31536000000,
    HalfYear = 15768000000,
    LeapYear = 31622400000
}

interface UseExtensionHeartbeatVoucher {
    readonly extension_id: number;
    readonly extension_uuid: string;
    readonly script_hash: string;
}

interface UserStore {
    userinfo?: {
        roles?: string[];
        id?: number;
        username?: string;
    };
    accessToken: string;
}
declare const useUserStore: zustand.UseBoundStore<Omit<Omit<zustand.StoreApi<UserStore>, "persist"> & {
    persist: {
        setOptions: (options: Partial<zustand_middleware.PersistOptions<UserStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => void | Promise<void>;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: UserStore) => void) => () => void;
        onFinishHydration: (fn: (state: UserStore) => void) => () => void;
        getOptions: () => Partial<zustand_middleware.PersistOptions<UserStore, unknown>>;
    };
}, "setState"> & {
    setState(nextStateOrUpdater: UserStore | Partial<UserStore> | ((state: {
        userinfo?: {
            roles?: string[];
            id?: number;
            username?: string;
        };
        accessToken: string;
    }) => void), shouldReplace?: boolean): void;
}>;

interface DocStore {
    isWork: boolean;
}
declare const useDocStore: zustand.UseBoundStore<Omit<Omit<zustand.StoreApi<DocStore>, "persist"> & {
    persist: {
        setOptions: (options: Partial<zustand_middleware.PersistOptions<DocStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => void | Promise<void>;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: DocStore) => void) => () => void;
        onFinishHydration: (fn: (state: DocStore) => void) => () => void;
        getOptions: () => Partial<zustand_middleware.PersistOptions<DocStore, unknown>>;
    };
}, "setState"> & {
    setState(nextStateOrUpdater: DocStore | Partial<DocStore> | ((state: {
        isWork: boolean;
    }) => void), shouldReplace?: boolean): void;
}>;

declare const enum SidebarStatus {
    None = "none",
    Left = "left",
    Right = "right"
}
interface ThemeStore {
    layout: {
        mainSidebar: SidebarStatus;
    };
}
declare const useThemeStore: zustand.UseBoundStore<Omit<Omit<zustand.StoreApi<ThemeStore>, "persist"> & {
    persist: {
        setOptions: (options: Partial<zustand_middleware.PersistOptions<ThemeStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => void | Promise<void>;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ThemeStore) => void) => () => void;
        onFinishHydration: (fn: (state: ThemeStore) => void) => () => void;
        getOptions: () => Partial<zustand_middleware.PersistOptions<ThemeStore, unknown>>;
    };
}, "setState"> & {
    setState(nextStateOrUpdater: ThemeStore | Partial<ThemeStore> | ((state: {
        layout: {
            mainSidebar: SidebarStatus;
        };
    }) => void), shouldReplace?: boolean): void;
}>;

type EmitterListener<T> = (data: T) => void | Promise<void>;
type EmitterListenerOffCallback = () => void;
declare abstract class EmitterManager<Entries extends Record<string | symbol, any>> {
    private readonly effectManager;
    constructor();
    protected subscribe<K extends keyof Entries>(busName: K, listener: EmitterListener<Entries[K]>, options?: {
        once?: boolean;
    }): EmitterListenerOffCallback;
    protected unsubscribe<K extends keyof Entries>(busName: K, listener: EmitterListener<Entries[K]>): void;
    protected notice<K extends keyof Entries>(busName: K, data?: Entries[K]): Promise<void>;
    protected clear(): void;
}

declare class Emitter<Entries extends Record<string | symbol, any>> extends EmitterManager<Entries> {
    emit<K extends keyof Entries>(busName: K, data?: Entries[K]): Promise<void>;
    on<K extends keyof Entries>(busName: K, listener: (data: Entries[K]) => void | Promise<void>, options?: {
        once?: boolean;
    }): EmitterListenerOffCallback;
    once<K extends keyof Entries>(busName: K, listener: (data: Entries[K]) => void | Promise<void>): EmitterListenerOffCallback;
    off<K extends keyof Entries>(busName: K, listener: (data: Entries[K]) => void | Promise<void>): void;
    clear(): void;
}

type InvokerKey = '*' | string | symbol | number;
type InvokerHandler = (...args: any[]) => any;
type ExtractParameters<T> = T extends (...args: infer P) => any ? P : never;
type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type ExtractInvokerHandler<T extends (...args: any[]) => any> = (...args: ExtractParameters<T>) => ExtractReturnType<T>;
declare abstract class InvokerManager<Entries extends Record<InvokerKey, InvokerHandler>> {
    private readonly effectManager;
    protected handle<K extends keyof Entries>(key: K, handler: ExtractInvokerHandler<Entries[K]>): void;
    protected invoke<K extends keyof Entries>(key: K, ...args: ExtractParameters<Entries[K]>): ExtractReturnType<Entries[K]>;
}

declare class Invoker<Entries extends Record<InvokerKey, InvokerHandler>> extends InvokerManager<Entries> {
    handle<K extends keyof Entries>(key: K, handler: ExtractInvokerHandler<Entries[K]>): void;
    invoke<K extends keyof Entries>(key: K, ...args: ExtractParameters<Entries[K]>): ExtractReturnType<Entries[K]>;
}

declare const enum IpcActionEvent {
    Handle = 0,
    On = 1
}
type IpcActionType<EvtActionType extends IpcActionEvent, Channel extends string = string, Action extends (...args: any[]) => any = (...args: any[]) => any> = {
    readonly channel: Channel;
    readonly action: Action;
    readonly actionType: EvtActionType;
    readonly middlewares: IpcActionMiddleware<EvtActionType>[];
    readonly listener: (e: IpcMainInvokeEvent | IpcMainEvent, ...args: any[]) => Promise<any>;
};
type IpcActionMessageType<EvtActionType extends IpcActionEvent> = Omit<IpcActionType<EvtActionType>, 'middlewares'> & {
    readonly event: EvtActionType extends IpcActionEvent.Handle ? IpcMainInvokeEvent : IpcMainEvent;
};
type IpcActionMiddleware<EvtActionType extends IpcActionEvent> = {
    readonly name: string;
    readonly transformArgs?: (e: EvtActionType extends IpcActionEvent.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: any[]) => Promise<any[]>;
    readonly transformResponse?: <Data>(response: Promise<Data>) => Promise<any>;
    readonly onBeforeEach?: (e: EvtActionType extends IpcActionEvent.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: any[]) => Promise<void>;
    readonly onAfterEach?: (e: EvtActionType extends IpcActionEvent.Handle ? IpcMainInvokeEvent : IpcMainEvent, ...args: any[]) => Promise<void>;
    readonly onSuccess?: (res: any, message: IpcActionMessageType<EvtActionType>) => Promise<void>;
    readonly onError?: (err: Error, message: IpcActionMessageType<EvtActionType>) => Promise<void | Error>;
};

interface ExceptionErrorMsgData {
    readonly label: string;
    readonly level: 'ERROR' | 'SUCCESS' | 'INFO' | 'WARN';
    readonly time: number;
    readonly other: Record<string, any>;
}
declare class Exception<ErrMessageData extends ExceptionErrorMsgData> {
    message: string;
    readonly errMessage: ErrMessageData;
    constructor(message: string, errMessage?: Pick<Partial<ErrMessageData>, 'level' | 'label'>);
    static is<Error>(exp: Error | Exception<any>): exp is Exception<any>;
}

interface WindowServiceOptions {
    url: string;
    autoLoad: boolean;
    windowKey?: string;
}
declare class WindowService {
    readonly options: WindowServiceOptions;
    readonly window: BrowserWindow;
    constructor(windowOptions: Partial<BrowserWindowConstructorOptions>, options: WindowServiceOptions);
    show(): Promise<void>;
    destroy(): void;
    static findBrowserWindow(arg: number | IpcMainEvent | IpcMainInvokeEvent): BrowserWindow | null;
    static findWindowService(key: string | number | IpcMainEvent | IpcMainInvokeEvent): WindowService;
    static isSameWindowService(tr: WindowService | null, other: WindowService | null): boolean;
}

declare const ipcOnBroadcast: {
    readonly channel: "IpcBroadcast";
    readonly action: (windowService: WindowService, evtName: string, data: any) => Promise<void>;
    readonly actionType: IpcActionEvent.On;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.On>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};

declare const ipcOpenDevTool: {
    readonly channel: "IpcDevTool/openDevTool";
    readonly action: (e: Electron.IpcMainInvokeEvent, status: boolean, options?: OpenDevToolsOptions) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};

declare namespace DepositService {
    interface TakeInOptions {
    }
    interface TakeOutOptions {
        persist?: boolean;
    }
}
declare class DepositService<DepositEntries = unknown> {
    private readonly depositData;
    takeIn<Key extends keyof DepositEntries, Data extends DepositEntries[Key]>(key: Key, data: Data, _?: DepositService.TakeInOptions): void;
    takeOut<Key extends keyof DepositEntries, Data extends DepositEntries[Key]>(key: Key, options?: DepositService.TakeOutOptions): Data | null;
}

declare const ipcForwardDataTakeIn: {
    readonly channel: "IpcForwardData/takeIn";
    readonly action: (_: WindowService, key: string, data: any) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcForwardDataTakeOut: {
    readonly channel: "IpcForwardData/takeOut";
    readonly action: (_: WindowService, key: string, options?: DepositService.TakeOutOptions) => Promise<any>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};

interface AppStoreType$1 {
    refreshToken: string;
    accessToken: string;
}

declare const ipcAppStoreGetStore: {
    readonly channel: "IpcStore/appStore/getStore";
    readonly action: () => Promise<AppStoreType$1>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcAppStoreGet: {
    readonly channel: "IpcStore/appStore/get";
    readonly action: <Key extends keyof AppStoreType$1, V extends Required<AppStoreType$1>[Key]>(_: WindowService, key: Key, defaultValue?: V) => Promise<Required<AppStoreType$1>[Key]>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcAppStoreSet: {
    readonly channel: "IpcStore/appStore/set";
    readonly action: <Key extends keyof AppStoreType$1, V extends AppStoreType$1[Key]>(_: WindowService, key: Key, value: V) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcAppStoreReset: {
    readonly channel: "IpcStore/appStore/reset";
    readonly action: <Key extends keyof AppStoreType$1>(_: WindowService, ...keys: Key[]) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcAppStoreHas: {
    readonly channel: "IpcStore/appStore/has";
    readonly action: <Key extends keyof AppStoreType$1>(_: WindowService, key: Key) => Promise<boolean>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcAppStoreDelete: {
    readonly channel: "IpcStore/appStore/delete";
    readonly action: <Key extends keyof AppStoreType$1>(_: WindowService, key: Key) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcAppStoreClear: {
    readonly channel: "IpcStore/appStore/clear";
    readonly action: (_: WindowService) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};

declare const ipcWindowMaximize: {
    readonly channel: "IpcWindow/maxSize";
    readonly action: (windowService: WindowService, options?: {
        id?: number;
        windowKey?: string;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcWindowMinimize: {
    readonly channel: "IpcWindow/minSize";
    readonly action: (windowService: WindowService, options?: {
        id?: number;
        windowKey?: string;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcWindowReductionSize: {
    readonly channel: "IpcWindow/reduction";
    readonly action: (windowService: WindowService, options?: {
        id?: number;
        windowKey?: string;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcWindowResizeAble: {
    readonly channel: "IpcWindow/resizeAble";
    readonly action: (windowService: WindowService, options?: {
        id?: number;
        windowKey?: string;
        resizeAble: boolean;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcWindowRelaunch: {
    readonly channel: "IpcWindow/relaunch";
    readonly action: (windowService: WindowService, options?: {
        id?: number;
        windowKey?: string;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcWindowSetMinimumSize: {
    readonly channel: "IpcWindow/setMinimumSize";
    readonly action: (windowService: WindowService, options: {
        id?: number;
        windowKey?: string;
        width: number;
        height: number;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcWindowSetSize: {
    readonly channel: "IpcWindow/setSize";
    readonly action: (windowService: WindowService, options: {
        id?: number;
        windowKey?: string;
        width: number;
        height: number;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcWindowResetCustomSize: {
    readonly channel: "IpcWindow/resetCustomSize";
    readonly action: (windowService: WindowService, options: {
        id?: number;
        windowKey?: string;
        type: 'mainWindow';
    }) => Promise<boolean>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcWindowSetPosition: {
    readonly channel: "IpcWindow/setPosition";
    readonly action: (windowService: WindowService, options: {
        id?: number;
        windowKey?: string;
        x: 'center' | 'left' | 'right' | number;
        y: 'center' | 'top' | 'bottom' | number;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcOpenWindow: {
    readonly channel: "IpcWindow/openWindow";
    readonly action: (_: WindowService, options: {
        windowKey?: string;
        subUrl: string;
    }, browserWindowOptions: Partial<BrowserWindowConstructorOptions>) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcWindowClose: {
    readonly channel: "IpcWindow/closeWindow";
    readonly action: (windowService: WindowService, options?: {
        windowKey?: string;
        id?: number;
        fictitious?: boolean;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcWindowShow: {
    readonly channel: "IpcWindow/showWindow";
    readonly action: (windowService: WindowService, options: {
        id?: number;
        windowKey?: string;
        show: boolean;
    }) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare interface WindowProperties {
    width: number;
    height: number;
    x: number;
    y: number;
}
declare const ipcWindowProperties: {
    readonly channel: "IpcWindow/properties";
    readonly action: (windowService: WindowService, selectedOptions: {
        windowKey?: string;
    }, properties: Partial<WindowProperties>) => Promise<void>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};
declare const ipcWindowWorkAreaSize: {
    readonly channel: "IpcWindow/workAreaSize";
    readonly action: () => Promise<{
        readonly width: number;
        readonly height: number;
    }>;
    readonly actionType: IpcActionEvent.Handle;
    readonly middlewares: IpcActionMiddleware<IpcActionEvent.Handle>[];
    readonly listener: (e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: unknown[]) => Promise<any>;
};

type actions_WindowProperties = WindowProperties;
declare const actions_ipcAppStoreClear: typeof ipcAppStoreClear;
declare const actions_ipcAppStoreDelete: typeof ipcAppStoreDelete;
declare const actions_ipcAppStoreGet: typeof ipcAppStoreGet;
declare const actions_ipcAppStoreGetStore: typeof ipcAppStoreGetStore;
declare const actions_ipcAppStoreHas: typeof ipcAppStoreHas;
declare const actions_ipcAppStoreReset: typeof ipcAppStoreReset;
declare const actions_ipcAppStoreSet: typeof ipcAppStoreSet;
declare const actions_ipcForwardDataTakeIn: typeof ipcForwardDataTakeIn;
declare const actions_ipcForwardDataTakeOut: typeof ipcForwardDataTakeOut;
declare const actions_ipcOnBroadcast: typeof ipcOnBroadcast;
declare const actions_ipcOpenDevTool: typeof ipcOpenDevTool;
declare const actions_ipcOpenWindow: typeof ipcOpenWindow;
declare const actions_ipcWindowClose: typeof ipcWindowClose;
declare const actions_ipcWindowMaximize: typeof ipcWindowMaximize;
declare const actions_ipcWindowMinimize: typeof ipcWindowMinimize;
declare const actions_ipcWindowProperties: typeof ipcWindowProperties;
declare const actions_ipcWindowReductionSize: typeof ipcWindowReductionSize;
declare const actions_ipcWindowRelaunch: typeof ipcWindowRelaunch;
declare const actions_ipcWindowResetCustomSize: typeof ipcWindowResetCustomSize;
declare const actions_ipcWindowResizeAble: typeof ipcWindowResizeAble;
declare const actions_ipcWindowSetMinimumSize: typeof ipcWindowSetMinimumSize;
declare const actions_ipcWindowSetPosition: typeof ipcWindowSetPosition;
declare const actions_ipcWindowSetSize: typeof ipcWindowSetSize;
declare const actions_ipcWindowShow: typeof ipcWindowShow;
declare const actions_ipcWindowWorkAreaSize: typeof ipcWindowWorkAreaSize;
declare namespace actions {
  export { type actions_WindowProperties as WindowProperties, actions_ipcAppStoreClear as ipcAppStoreClear, actions_ipcAppStoreDelete as ipcAppStoreDelete, actions_ipcAppStoreGet as ipcAppStoreGet, actions_ipcAppStoreGetStore as ipcAppStoreGetStore, actions_ipcAppStoreHas as ipcAppStoreHas, actions_ipcAppStoreReset as ipcAppStoreReset, actions_ipcAppStoreSet as ipcAppStoreSet, actions_ipcForwardDataTakeIn as ipcForwardDataTakeIn, actions_ipcForwardDataTakeOut as ipcForwardDataTakeOut, actions_ipcOnBroadcast as ipcOnBroadcast, actions_ipcOpenDevTool as ipcOpenDevTool, actions_ipcOpenWindow as ipcOpenWindow, actions_ipcWindowClose as ipcWindowClose, actions_ipcWindowMaximize as ipcWindowMaximize, actions_ipcWindowMinimize as ipcWindowMinimize, actions_ipcWindowProperties as ipcWindowProperties, actions_ipcWindowReductionSize as ipcWindowReductionSize, actions_ipcWindowRelaunch as ipcWindowRelaunch, actions_ipcWindowResetCustomSize as ipcWindowResetCustomSize, actions_ipcWindowResizeAble as ipcWindowResizeAble, actions_ipcWindowSetMinimumSize as ipcWindowSetMinimumSize, actions_ipcWindowSetPosition as ipcWindowSetPosition, actions_ipcWindowSetSize as ipcWindowSetSize, actions_ipcWindowShow as ipcWindowShow, actions_ipcWindowWorkAreaSize as ipcWindowWorkAreaSize };
}

type PromiseWithValue<Value> = Value extends Promise<any> ? Value : Promise<Value>;
type AllAction = {
    readonly [Key in keyof typeof actions]: (typeof actions)[Key] extends IpcActionType<IpcActionEvent> ? (typeof actions)[Key] : never;
};
type AllHandlers<IpcActionEventType extends IpcActionEvent> = {
    readonly [Key in keyof AllAction as AllAction[Key]['channel']]: AllAction[Key]['actionType'] extends IpcActionEventType ? (...args: CutHead<Parameters<AllAction[Key]['action']>>) => RPromiseLike<Awaited<PromiseWithValue<ReturnType<AllAction[Key]['action']>>>, Exception<ExceptionErrorMsgData>> : never;
};
type HandleHandlers = ExtractNever<AllHandlers<IpcActionEvent.Handle>>;
type OnHandlers = ExtractNever<AllHandlers<IpcActionEvent.On>>;
type IpcRenderer = Omit<IpcRenderer$1, 'invoke' | 'send' | 'sendSync'> & {
    invoke<T extends keyof HandleHandlers>(channel: T, ...args: Parameters<HandleHandlers[T]>): ReturnType<HandleHandlers[T]>;
    send<T extends keyof OnHandlers>(channel: T, ...args: Parameters<OnHandlers[T]>): void;
    sendSync<T extends keyof OnHandlers>(channel: T, ...args: Parameters<OnHandlers[T]>): void;
};
interface ElectronAPI {
    readonly ipcRenderer: IpcRenderer;
    readonly webFrame: WebFrame;
    readonly process: NodeProcess;
}

type PrintMessagesTypeArr = Parameters<typeof Ansi.print>;
declare class PrinterService {
    private static readonly printer;
    format(...messages: PrintMessagesTypeArr): string;
    print(...messages: PrintMessagesTypeArr): void;
    printInfo(...messages: PrintMessagesTypeArr): void;
    printError(...messages: PrintMessagesTypeArr): void;
    printWarn(...messages: PrintMessagesTypeArr): void;
    printSuccess(...messages: PrintMessagesTypeArr): void;
    static format(...messages: PrintMessagesTypeArr): string;
    static printInfo(...messages: PrintMessagesTypeArr): void;
    static printWarn(...messages: PrintMessagesTypeArr): void;
    static printSuccess(...messages: PrintMessagesTypeArr): void;
    static printError(...messages: PrintMessagesTypeArr): void;
}

declare const printer: PrinterService;
interface PrinterServer {
    readonly print: typeof printer.print;
    readonly printInfo: typeof printer.printInfo;
    readonly printWarn: typeof printer.printWarn;
    readonly printError: typeof printer.printError;
    readonly printSuccess: typeof printer.printSuccess;
}

interface AppStoreType {
    readonly getStore: () => ReturnType<HandleHandlers['IpcStore/appStore/getStore']>;
    readonly get: <Key extends keyof AppStoreType$1>(key: Key, defaultValue?: AppStoreType$1[Key]) => ReturnType<HandleHandlers['IpcStore/appStore/get']>;
    readonly set: <Key extends keyof AppStoreType$1>(key: Key, value: AppStoreType$1[Key]) => ReturnType<HandleHandlers['IpcStore/appStore/set']>;
    readonly delete: <Key extends keyof AppStoreType$1>(key: Key) => ReturnType<HandleHandlers['IpcStore/appStore/delete']>;
    readonly has: <Key extends keyof AppStoreType$1>(key: Key) => ReturnType<HandleHandlers['IpcStore/appStore/has']>;
    readonly reset: <Key extends keyof AppStoreType$1>(...keys: Key[]) => ReturnType<HandleHandlers['IpcStore/appStore/reset']>;
    readonly clear: () => ReturnType<HandleHandlers['IpcStore/appStore/clear']>;
}

declare const openPage: (options: {
    windowKey?: string;
    subUrl: string;
}, browserWindowOptions: Partial<Electron.BrowserWindowConstructorOptions>) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowReload: () => void;
declare const windowShow: (options: {
    id?: number;
    windowKey?: string;
    show: boolean;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowResizeAble: (options?: {
    id?: number;
    windowKey?: string;
    resizeAble: boolean;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowSetSize: (options: {
    id?: number;
    windowKey?: string;
    width: number;
    height: number;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowSetPosition: (options: {
    id?: number;
    windowKey?: string;
    x: number | "center" | "left" | "right";
    y: number | "top" | "center" | "bottom";
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowRelaunch: (options?: {
    id?: number;
    windowKey?: string;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowResetCustomSize: (options: {
    id?: number;
    windowKey?: string;
    type: "mainWindow";
}) => _suey_pkg_utils.RPromiseLike<boolean, Exception<ExceptionErrorMsgData>>;
declare const windowMax: (options?: {
    id?: number;
    windowKey?: string;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowMin: (options?: {
    id?: number;
    windowKey?: string;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowReduction: (options?: {
    id?: number;
    windowKey?: string;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowClose: (options?: {
    windowKey?: string;
    id?: number;
    fictitious?: boolean;
}) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowDevtool: (status: boolean, options?: Electron.OpenDevToolsOptions) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowEnableFullScreen: (el?: HTMLElement) => Promise<void>;
declare const windowExitFullScreen: () => Promise<void>;
declare const windowWorkAreaSize: () => _suey_pkg_utils.RPromiseLike<{
    readonly width: number;
    readonly height: number;
}, Exception<ExceptionErrorMsgData>>;
declare const windowOpen: (options: {
    windowKey?: string;
    subUrl: string;
}, browserWindowOptions: Partial<Electron.BrowserWindowConstructorOptions>) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowForwardDataTakeIn: (key: string, data: any) => _suey_pkg_utils.RPromiseLike<void, Exception<ExceptionErrorMsgData>>;
declare const windowForWardDataTakeOut: (key: string, options?: DepositService.TakeOutOptions) => _suey_pkg_utils.RPromiseLike<any, Exception<ExceptionErrorMsgData>>;

declare const ipcActions_openPage: typeof openPage;
declare const ipcActions_windowClose: typeof windowClose;
declare const ipcActions_windowDevtool: typeof windowDevtool;
declare const ipcActions_windowEnableFullScreen: typeof windowEnableFullScreen;
declare const ipcActions_windowExitFullScreen: typeof windowExitFullScreen;
declare const ipcActions_windowForWardDataTakeOut: typeof windowForWardDataTakeOut;
declare const ipcActions_windowForwardDataTakeIn: typeof windowForwardDataTakeIn;
declare const ipcActions_windowMax: typeof windowMax;
declare const ipcActions_windowMin: typeof windowMin;
declare const ipcActions_windowOpen: typeof windowOpen;
declare const ipcActions_windowReduction: typeof windowReduction;
declare const ipcActions_windowRelaunch: typeof windowRelaunch;
declare const ipcActions_windowReload: typeof windowReload;
declare const ipcActions_windowResetCustomSize: typeof windowResetCustomSize;
declare const ipcActions_windowResizeAble: typeof windowResizeAble;
declare const ipcActions_windowSetPosition: typeof windowSetPosition;
declare const ipcActions_windowSetSize: typeof windowSetSize;
declare const ipcActions_windowShow: typeof windowShow;
declare const ipcActions_windowWorkAreaSize: typeof windowWorkAreaSize;
declare namespace ipcActions {
  export { ipcActions_openPage as openPage, ipcActions_windowClose as windowClose, ipcActions_windowDevtool as windowDevtool, ipcActions_windowEnableFullScreen as windowEnableFullScreen, ipcActions_windowExitFullScreen as windowExitFullScreen, ipcActions_windowForWardDataTakeOut as windowForWardDataTakeOut, ipcActions_windowForwardDataTakeIn as windowForwardDataTakeIn, ipcActions_windowMax as windowMax, ipcActions_windowMin as windowMin, ipcActions_windowOpen as windowOpen, ipcActions_windowReduction as windowReduction, ipcActions_windowRelaunch as windowRelaunch, ipcActions_windowReload as windowReload, ipcActions_windowResetCustomSize as windowResetCustomSize, ipcActions_windowResizeAble as windowResizeAble, ipcActions_windowSetPosition as windowSetPosition, ipcActions_windowSetSize as windowSetSize, ipcActions_windowShow as windowShow, ipcActions_windowWorkAreaSize as windowWorkAreaSize };
}

type IpcActions = typeof ipcActions;
interface ExposeApi {
    readonly electron: ElectronAPI;
    readonly printer: PrinterServer;
    readonly ipcActions: IpcActions;
    readonly stores: Exclude<{
        readonly appStore: AppStoreType;
    }, 'features'>;
}

declare global {
  export namespace Rapid {

    /**
     * 系统提供的原生 api 能力
     */
    export interface Native {
      meta2d?: _meta2d_core.Meta2d;

      readonly Antd: typeof antd;
      readonly spring: typeof _react_spring_web;
      readonly transitionGroup: typeof react_transition_group;
      readonly moment: typeof moment;

      readonly ipcActions: IpcActions;
      readonly electron: ElectronAPI;
      readonly printer: PrinterServer;

      /**
       * 插件管理器
       */
      readonly extension: ExtensionManager<Rapid.Extend.Extension>;

      /**
       * 元数据管理器
       */
      readonly metadata: MetadataManager<Rapid.Extend.Metadata.MetadataEntries>;

      /**
       * 事件总线
       */
      readonly emitter: Emitter<Rapid.Bus.BusEmitterEntries>;

      /**
       * 带有函数返回值的事件总线功能
       */
      readonly invoker: Invoker<Bus.BusInvokerEntries>;

      /**
       * 全局的线程管理
       */
      readonly threads: {
        /**
         * 插件的线程化版本管理
         */
        // readonly rxcThread: RdThread<Rapid.Thread.ExtensionThreadEntries, Rapid.Thread.MainThreadEntries>;
      }

      /**
       * 全局的状态管理
       */
      readonly stores: ExposeApi['stores'] & Omit<{
        readonly features: {
          readonly useUserStore: typeof useUserStore;
          readonly useThemeStore: typeof useThemeStore;
          readonly useDocStore: typeof useDocStore;
        }
      }, keyof ExposeApi['stores']>;

      /**
       * 皮肤
       */
      readonly skin: {
        readonly skin: Skin<RdCssVariablePayloadSheet>;
        readonly makeCssVarPayload: typeof makeCssVarPayload;
        readonly mrvp: typeof mrvp;
        readonly Skin: typeof Skin;
      };

      /**
       * 国际化
       */
      readonly i18n: {
        readonly i18n: typeof i18n;
        readonly useTranslation: typeof react_i18next.useTranslation;
      }

      /**
       * 内置常量
       */
      readonly constants: {
        readonly Timestamp: typeof Timestamp;
      }

      /**
       * 提供可以公用的组件
       */
      readonly components: {
        /**
         * 文本溢出隐藏省略的组件, 当文本长度超出容器的时候, 自动展示省略号
         */
        readonly Ellipsis: typeof Ellipsis;

        /**
         * antd 与 自定义 icon 的结合组件
         */
        readonly IconFont: typeof IconFont;

        /**
         * 通用的 widget - 控件, 用于展示一个图标, 附带功能提示信息 作为系统功能图标
         */
        readonly Widget: typeof Widget;

        /**
         * 展示 -空-
         */
        readonly Empty: typeof REmpty;
      }

      /**
       * 部分 service 能力
       */
      readonly services: {
        readonly Skin: typeof Skin;

        readonly Emitter: typeof Emitter;
        readonly Invoker: typeof Invoker;

        readonly ExtensionManager: typeof ExtensionManager;
        readonly MetadataManager: typeof MetadataManager;
      }

      /**
       * 提供基础 API-Service
       */
      readonly libs: {
        readonly injectReadonlyVariable: typeof injectReadonlyVariable;

        readonly reactive: typeof _vue_reactivity.reactive;
        readonly watch: typeof _vue_reactivity.watch;
        readonly effect: typeof _vue_reactivity.effect;
        readonly computed: typeof _vue_reactivity.computed;
        readonly ref: typeof _vue_reactivity.ref;
        readonly shallowRef: typeof _vue_reactivity.shallowRef;
        readonly reactiveReadArray: typeof _vue_reactivity.reactiveReadArray;
        readonly readonly: typeof _vue_reactivity.readonly;
        readonly shallowReactive: typeof _vue_reactivity.shallowReactive;
        readonly shallowReadonly: typeof _vue_reactivity.shallowReadonly;
        readonly toRaw: typeof _vue_reactivity.toRaw;
        readonly toReactive: typeof _vue_reactivity.toReactive;
        readonly toReadonly: typeof _vue_reactivity.toReadonly;
        readonly toRef: typeof _vue_reactivity.toRef;
        readonly toRefs: typeof _vue_reactivity.toRefs;
        readonly toValue: typeof _vue_reactivity.toValue;
        readonly unref: typeof _vue_reactivity.unref;
        readonly isRef: typeof _vue_reactivity.isRef;
        readonly isReactive: typeof _vue_reactivity.isReactive;
        readonly isReadonly: typeof _vue_reactivity.isReadonly;
        readonly isShallow: typeof _vue_reactivity.isShallow;
        readonly isProxy: typeof _vue_reactivity.isProxy;

        readonly rApiGet: typeof rApiGet;
        readonly rApiPost: typeof rApiPost;
        readonly rApiPut: typeof rApiPut;
        readonly rApiDelete: typeof rApiDelete;
        readonly rRequest: typeof rRequest;
        readonly rApiPatch: typeof rApiPatch;
        readonly rCreateApi: typeof rCreateApi;

        readonly apiGet: typeof apiGet;
        readonly apiPost: typeof apiPost;
        readonly apiPut: typeof apiPut;
        readonly apiDelete: typeof apiDelete;
        readonly request: typeof request;
        readonly createApiRequest: typeof createApiRequest;
        readonly createRequest: typeof createRequest;

        readonly aesEncrypt: typeof aesEncrypt;
        readonly aesDecrypt: typeof aesDecrypt;
        readonly aesEncryptAlgorithm: typeof aesEncryptAlgorithm;
        readonly aesDecryptAlgorithm: typeof aesDecryptAlgorithm;

        readonly jose: typeof jose;
        readonly cryptoTs: typeof cryptoTs;
        readonly jsr: typeof jsr;

        readonly toNil: typeof toNil;
        readonly toNils: typeof toNils;
        readonly toWaitPromise: typeof toWaitPromise;

        readonly Ansi: typeof Ansi;

        readonly classnames: typeof classnames;

        readonly isReactClassComponent: typeof isReactClassComponent;
        readonly isReactComponent: typeof isReactComponent;
        readonly isReactForwardFC: typeof isReactForwardFC;
        readonly isReactMemoFC: typeof isReactMemoFC;
        readonly isReactFC: typeof isReactFC;
        readonly isReactLazyFC: typeof isReactLazyFC;

        readonly defineCompleteType: typeof _suey_pkg_utils.defineCompleteType;
        readonly defineRawType: typeof _suey_pkg_utils.defineRawType;
      }
    }
  }
}

declare global {

  export namespace Rapid.Reactivity {


    export type Reactive<T> = _vue_reactivity.Reactive<T>;
    export type WatchSource<T> = _vue_reactivity.WatchSource<T>;
    export type WatchHandle = _vue_reactivity.WatchHandle;
    export type EffectScope = _vue_reactivity.EffectScope;
    export type OnCleanup = _vue_reactivity.OnCleanup;
    export type ReactiveEffect = _vue_reactivity.ReactiveEffect;
    export type ReactiveEffectOptions = _vue_reactivity.ReactiveEffectOptions;
    export type ReactiveEffectRunner = _vue_reactivity.ReactiveEffectRunner;
    export type Ref = _vue_reactivity.Ref;
    export type ShallowRef = _vue_reactivity.ShallowRef;
    export type UnwrapNestedRefs<T> = _vue_reactivity.UnwrapNestedRefs<T>;
    export type UnwrapRef<T> = _vue_reactivity.UnwrapRef<T>;
    export type UnwrapRefSimple<T> = _vue_reactivity.UnwrapRefSimple<T>;
    export type ComputedRef = _vue_reactivity.ComputedRef;
    export type WritableComputedRef<T, S> = _vue_reactivity.WritableComputedRef<T, S>;
    export type ReactiveMarker = _vue_reactivity.ReactiveMarker;
    export type DeepReadonly<T> = _vue_reactivity.DeepReadonly<T>;
  }
}

type RdCssVariablesDeclaration = CssVariablesDeclaration<RdCssVariablePayloadSheet>;

type RdCssVars = CssVars<RdCssVariablePayloadSheet>;

declare global {
  /**
   * 皮肤相关的类型定义
   */
  export namespace Rapid.SKin {
    /**
     * 当前定义地 payload sheet
     */
    export type CssVariablePayloadSheet = RdCssVariablePayloadSheet;

    /**
     * 皮肤变量声明
     */
    export type CssVariablesDeclaration = RdCssVariablesDeclaration;

    /**
     * 皮肤变量
     */
    export type CssVars = RdCssVars;
  }
}

declare global {

  export namespace Rapid.Thread {


    export type MainThreadEntries = {
      'rxc:extension-changed': (data: number[]) => void;
    }

    export type ExtensionThreadEntries = {
      /**
       * 启动线程任务、开启插件的心跳检查
       */
      'rxc-thread-start-extension-heartbeat': () => void;

      /**
       * 终止线程任务、关闭插件的心跳检查
       */
      'rxc-thread-terminate-extension-heartbeat': () => void;

      /**
       * 向线程中同步插件的信息
       */
      'rxc-thread-sync-extensions-info': (voucher: UseExtensionHeartbeatVoucher[]) => void;
    }
  }
}

declare global {
  export namespace Rapid.Types {
    /**
     * 获取一个 Promise then函数的类型
     */
    export type PromiseThenCallback<Pr extends Promise<unknown>> = Parameters<Pr['then']>[0];
    /**
     * 获取一个 Promise then函数回调参数 res 的类型
     */
    export type PromiseResolvedType<Pr extends Promise<unknown>> = Parameters<Exclude<PromiseThenCallback<Pr>, null | undefined>>[0];
    /**
     * 获取一个 Promise数据 then函数回调参数 res 数组的类型
     */
    export type PromiseArrayResolvedType<PrArr extends readonly Promise<unknown>[]> = {
      readonly [Index in keyof PrArr]: PromiseResolvedType<PrArr[Index]>;
    };
    /**
     * 获取一个 Promise catch函数回调参数 res 的类型
     */
    export type PromiseCatchCallback<Pr extends Promise<unknown>> = Parameters<Pr['catch']>[0];
    /**
     * 获取一个 Promise catch函数回调参数 reason 的类型
     */
    export type PromiseCatchReasonType<Pr extends Promise<unknown>> = Parameters<Exclude<PromiseCatchCallback<Pr>, null | undefined>>[0];
    /**
     * 获取一个 Promise数据 then函数回调参数 reason 数组的类型
     */
    export type PromiseArrayCatchReasonType<PrArr extends readonly Promise<unknown>[]> = {
      readonly [Index in keyof PrArr]: PromiseCatchReasonType<PrArr[Index]>;
    };
    /**
     * 判断这个类型是否是一个 never 类型, 如果是返回第一个泛型参数, 否则返回第二个
     * @example
     *
     * type C = never;
     *
     * type TResult = IsNever<C, true, false>; // true
     *
     */
    export type IsNever<T, SuccessReturnType, FailReturnType> = T extends never ? SuccessReturnType : FailReturnType;
    /**
     * 判断这个类型是否是一个 any 类型, 如果是返回第一个泛型参数, 否则返回第二个
     *
     * @example
     * type c = any;
     * type TResult = IsAny<C, true, false>; // true
     *
     * type d = true;
     * type TResult2 = IsAny<d, true, false>; // false
     */
    export type IsAny<T, SuccessReturnType, FailReturnType> = IsNever<T, 'yes', 'no'> extends 'no' ? FailReturnType : SuccessReturnType;
    /**
     * 判断这个类型是否是一个 unknown 类型, 如果是返回第一个泛型参数, 否则返回第二个
     *
     * @example
     * type c = unknown;
     * type TResult = IsUnknown<C, true, false>; // true
     *
     * type d = true;
     * type TResult2 = IsUnknown<d, true, false>; // false
     */
    export type IsUnknown<T, SuccessReturnType, FailReturnType> = unknown extends T ? (T extends unknown ? SuccessReturnType : FailReturnType) : FailReturnType;
  }
}

declare global {
  /**
   * 应用程序的命名空间 - 此命名空间将为 rapid 程序 提供编写 TS 地基础
   */
  export namespace Rapid {}
}

declare global {

  interface Window {
    readonly native: Rapid.Native;

    readonly cssVars: Rapid.SKin.CssVars;
  }

  /**
   * 全局的 native 实例
   */
  const native: Rapid.Native;

  /**
   * 全局的皮肤变量
   */
  const cssVars: Rapid.SKin.CssVars;
}
