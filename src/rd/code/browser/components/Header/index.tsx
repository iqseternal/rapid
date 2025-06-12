import { classnames } from '@rapid/libs-web/common';
import { memo } from 'react';
import { commonStyles } from '@/scss/common';

export interface HeaderProps {
  className?: string;
}

/**
 * 标题栏
 */
export const Header = memo((props: HeaderProps) => {
  const { className } = props;

  const HeaderLogoContent = rApp.metadata.useMetadata('ui.layout.header.icon');

  const menuBeforeContents = rApp.metadata.useMetadata('ui.layout.header.menu.before');
  const menuContents = rApp.metadata.useMetadata('ui.layout.header.menu.content');
  const menuAfterContents = rApp.metadata.useMetadata('ui.layout.header.menu.after');

  const HeaderMainContent = rApp.metadata.useLatestMetadataInVector('ui.layout.header.main.content');

  const controllerBeforeContents = rApp.metadata.useMetadata('ui.layout.header.controller.before');
  const controllerOtherWidgets = rApp.metadata.useMetadata('ui.layout.header.controller.widgets.others');
  const MinWindowWidget = rApp.metadata.useMetadata('ui.layout.header.controller.widgets.min');
  const ReductionWindowWidget = rApp.metadata.useMetadata('ui.layout.header.controller.widgets.reduction');
  const CloseWindowWidget = rApp.metadata.useMetadata('ui.layout.header.controller.widgets.close');
  const controllerAfterContents = rApp.metadata.useMetadata('ui.layout.header.controller.after');

  return (
    <div
      className={classnames('w-full text-sm flex justify-between items-center', commonStyles.appRegion, className)}
      style={{
        backgroundColor: cssVars.uiCaptionBarBackground,
        height: cssVars.uiCaptionBarHeight,
        maxHeight: cssVars.uiCaptionBarHeight,
      }}
    >
      <div className='w-full h-full z-50 flex justify-between items-center flex-1'>
        <div
          className='flex items-center w-max max-w-full max-h-full aspect-square pl-0.5 flex-none'
          style={{
            width: cssVars.uiNavigationBarWidth,
            maxWidth: cssVars.uiNavigationBarWidth
          }}
        >
          {HeaderLogoContent && <HeaderLogoContent />}
        </div>

        <div className={'cursor-default w-full h-full flex items-center max-w-full overflow-hidden select-none flex-1'}>
          <div
            className={classnames(
              commonStyles.appRegionNo,
              'w-max flex items-center flex-none',
            )}
          >
            {menuBeforeContents && menuBeforeContents.map((BeforeContent, index) => (<BeforeContent key={index} />))}
          </div>

          <div className='w-full flex items-center flex-1'>
            {menuContents && menuContents.map((Content, index) => (<Content key={index} />))}
          </div>
        </div>

        <div className='flex items-center justify-end flex-none'>
          {menuAfterContents && menuAfterContents.map((AfterContent, index) => (<AfterContent key={index} />))}
        </div>
      </div>

      <div className='flex-1 w-full'>
        {HeaderMainContent && (<HeaderMainContent />)}
      </div>

      <div className='pr-1 flex-1 min-w-max flex justify-end items-center'>
        <div className='w-full flex flex-1 items-center'>
          {controllerBeforeContents && (controllerBeforeContents.map((BeforeContent, index) => (<BeforeContent key={index} />)))}
        </div>

        <div
          className={classnames(
            commonStyles.appRegionNo,
            'flex justify-end gap-x-0.5 flex-none items-center'
          )}
        >
          {controllerOtherWidgets && controllerOtherWidgets.toReversed().map((OtherWidget, index) => (<OtherWidget key={index} />))}
          {MinWindowWidget && (<MinWindowWidget />)}
          {ReductionWindowWidget && (<ReductionWindowWidget />)}
          {CloseWindowWidget && (<CloseWindowWidget />)}
        </div>

        <div className='w-max flex items-center flex-none'>
          {controllerAfterContents && (controllerAfterContents.map((AfterContent, index) => <AfterContent key={index} />))}
        </div>
      </div>
    </div>
  )
});

export default Header;
