import { classnames } from '@rapid/libs-web/common';
import { Subfield } from '@rapid/libs-web/components';
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
        <div
          className='flex items-center w-max max-w-full max-h-full aspect-square pl-0.5'
          style={{
            width: cssVars.navigationBarWidth,
            maxWidth: cssVars.navigationBarWidth
          }}
        >
          {HeaderLogoContent && <HeaderLogoContent />}
        </div>

        <div
          className={'cursor-default w-full h-full flex items-center flex-auto max-w-full overflow-hidden select-none'}
        >
          <div
            className={classnames(
              commonStyles.appRegionNo,
              'w-max flex items-center',
            )}
          >
            {menuBeforeContents && menuBeforeContents.map((BeforeContent, index) => (<BeforeContent key={index} />))}
          </div>

          <div
            className='w-full flex items-center'
          >
            {menuContents && menuContents.map((Content, index) => (<Content key={index} />))}
          </div>
        </div>

        <Subfield.Auto
          className='flex items-center justify-end'
        >
          {menuAfterContents && menuAfterContents.map((AfterContent, index) => (<AfterContent key={index} />))}
        </Subfield.Auto>
      </Subfield>

      <Subfield
        className='flex-auto w-full'
      >
        {HeaderMainContent && (<HeaderMainContent />)}
      </Subfield>

      <Subfield
        className={classnames(
          'pr-1 flex-auto min-w-max'
        )}
      >
        <div
          className='w-full flex flex-auto items-center'
        >
          {controllerBeforeContents && (controllerBeforeContents.map((BeforeContent, index) => (<BeforeContent key={index} />)))}
        </div>

        <Subfield.SubfieldFixed
          className={commonStyles.appRegionNo}
          gap={[3]}
        >
          {controllerOtherWidgets && controllerOtherWidgets.toReversed().map((OtherWidget, index) => (<OtherWidget key={index} />))}
          {MinWindowWidget && (<MinWindowWidget />)}
          {ReductionWindowWidget && (<ReductionWindowWidget />)}
          {CloseWindowWidget && (<CloseWindowWidget />)}
        </Subfield.SubfieldFixed>

        <div
          className='w-max flex items-center'
        >
          {controllerAfterContents && (controllerAfterContents.map((AfterContent, index) => <AfterContent key={index} />))}
        </div>
      </Subfield>
    </Subfield>
  )
});

export default Header;
