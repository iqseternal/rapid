import { classnames } from '@rapid/libs-web/common';
import { Subfield } from '@rapid/libs-web/components';
import { ReactNode, memo, useState, CSSProperties } from 'react';
import { useAsyncLayoutEffect, useMaintenanceStack, useRefresh, useWindowInnerSize } from '@rapid/libs-web';
import { isFunction, toNil } from '@rapid/libs';
import { commonStyles } from '@scss/common';
import { cssVars } from '../../skin';

import Widget from '@components/Widget';
import AutoMenu from '../AutoMenu';
import IconFont from '@components/IconFont';
import Logo from '@components/Logo';

export interface ControlProps {
  // 是否是一个面板
  isPane?: boolean;

  // 是否是一个弹窗
  isDialog?: boolean;
}

export const Control = memo((props: ControlProps) => {
  const { isDialog = false, isPane = false, } = props;

  const refresh = useRefresh();

  const [windowInnerSize] = useWindowInnerSize();
  const [normalState] = useState({
    workAreaSize: {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  })

  const isFullSize = windowInnerSize.innerWidth === normalState.workAreaSize.width && windowInnerSize.innerHeight === normalState.workAreaSize.height;
  const controllerWidgets = rApp.metadata.useMetadata('ui.layout.header.controller.widgets');


  useAsyncLayoutEffect(async () => {
    const [err, res] = await toNil(window.ipcActions.windowWorkAreaSize());
    if (err) return;

    normalState.workAreaSize = res;
    refresh();
  }, []);

  return (
    <Subfield.SubfieldFixed
      className={commonStyles.appRegionNo}
      gap={[3]}
    >
      {controllerWidgets && (controllerWidgets.map((ControllerWidget, index) => {
        return (
          <ControllerWidget
            key={index}
          />
        )
      }))}

      <Widget
        icon='BugOutlined'
        tipText='开发者工具'
        onClick={() => ipcActions.windowDevtool(true, { mode: 'detach' })}
      />

      <Widget
        icon='LineOutlined'
        tipText='最小化'
        onClick={() => ipcActions.windowMin()}
      />

      {(!isDialog && !isPane) && <>
        <Widget
          icon={isFullSize ? 'SwitcherOutlined' : 'BorderOutlined'}
          tipText='还原'
          onClick={() => ipcActions.windowReduction()}
        />

      </>}

      <Widget
        icon='CloseOutlined'
        tipText='关闭'
        tipAttrs={{
          placement: 'leftBottom'
        }}
        onClick={() => ipcActions.windowClose()}
      />
    </Subfield.SubfieldFixed>
  )
})

export interface HeadSlotRenderTypeProps {
  isPane?: boolean;
  isDialog?: boolean;
}

export type HeadSlotRenderType = (props: HeadSlotRenderTypeProps) => ReactNode;

export interface HeaderProps {
  /**
   * 是否是一个面板, 例如设置 (不可全屏
   */
  isPane?: boolean;

  /**
   * 是否是一个弹窗, like window.alert
   */
  isDialog?: boolean;


  logoRender?: ReactNode | HeadSlotRenderType;

  titleRender?: ReactNode | HeadSlotRenderType;

  functionalRender?: ReactNode | HeadSlotRenderType;

  className?: string;
  style?: CSSProperties;
}

/**
 * 标题栏
 */
export const Header = memo((props: HeaderProps) => {
  const {
    isDialog = false,
    isPane = false,

    className,
    style,

    logoRender,
    functionalRender
  } = props;

  const menuBeforeContents = rApp.metadata.useMetadata('ui.layout.header.menu.before');
  const menuContents = rApp.metadata.useMetadata('ui.layout.header.menu.content');
  const menuAfterContents = rApp.metadata.useMetadata('ui.layout.header.menu.after');

  const LogoNode = ((): ReactNode => {
    if (logoRender) {
      if (isFunction(logoRender)) {
        const LogRender = logoRender;
        return (
          <LogRender
            isDialog={isDialog}
            isPane={isPane}
          />
        )
      }

      return logoRender;
    }

    return (
      <Logo
        className='flex-none h-full'
        style={{
          width: cssVars.navigationBarWidth,
          margin: `0 calc(${cssVars.navigationBarWidth} * 0.1)`
        }}
      />
    )
  })();

  const functionalNode = ((): ReactNode => {
    if (functionalRender) {
      if (isFunction(functionalRender)) {
        const FunctionalRender = functionalRender;
        return (
          <FunctionalRender
            isDialog={isDialog}
            isPane={isPane}
          />
        )
      }

      return functionalRender;
    }

    return (
      <>
        <div />
        <div />
        <Control
          isPane={isPane}
          isDialog={isDialog}
        />
      </>
    )
  })();

  return (
    <Subfield
      className={classnames('w-full text-sm', commonStyles.appRegion, className)}
      style={{
        backgroundColor: cssVars.captionBarBackgroundColor,
        height: cssVars.captionBarHeight,
        maxHeight: cssVars.captionBarHeight,
      }}
    >
      <Subfield
        className='w-full h-full z-50'
      >
        {LogoNode}

        <div
          className={'cursor-default w-max h-full flex items-center flex-auto max-w-full overflow-hidden select-none'}
        >
          <div
            className={classnames(
              commonStyles.appRegionNo,
              'w-max',
            )}
          >
            {menuBeforeContents && menuBeforeContents.map((BeforeContent, index) => (<BeforeContent key={index} />))}
          </div>

          <div
            className='w-full'
          >
            {menuContents && menuContents.map((Content, index) => (<Content key={index} />))}
          </div>

          <div
            className={classnames(
              commonStyles.appRegionNo,
              'w-max',
            )}
          >
            {menuAfterContents && menuAfterContents.map((AfterContent, index) => (<AfterContent key={index} />))}
          </div>
        </div>

        <Subfield.Auto />
      </Subfield>

      <div
        className='flex-auto w-full'
      />

      <Subfield
        className={classnames(
          'mr-1 flex-auto min-w-max'
        )}
      >
        {functionalNode}
      </Subfield>
    </Subfield>
  )
});

export default Header;
