import { memo, useRef } from 'react';
import { SkinOutlined } from '@ant-design/icons';
import { InnerExtensionNames } from './innerExtensionNames';

type Transformer = Parameters<typeof native.metadata.defineMetadataInVector<'functional.theme.variables.transformer'>>[1];

const { Widget } = native.components;


const transformer: Transformer = (cssVariablesPayloadSheet) => {

  cssVariablesPayloadSheet.uiCaptionBarBackground.value = '#00F';

  return cssVariablesPayloadSheet;
}

const Icon = memo(() => {

  const isActivated = useRef(false);

  return (
    <Widget
      onClick={() => {
        if (isActivated.current) {
          native.metadata.delMetadataInVector('functional.theme.variables.transformer', transformer);
          isActivated.current = false;
        }
        else {
          native.metadata.defineMetadataInVector('functional.theme.variables.transformer', transformer);
          isActivated.current = true;
        }

        native.skin.skin.install();
      }}
    >
      <SkinOutlined />
    </Widget>
  )
})


export const RdThemeExtension = native.extension.defineExtension({
  name: InnerExtensionNames.ThemeExtension,
  version: '0.0.0',

  onActivated(context) {
    native.metadata.defineMetadataInVector('ui.layout.header.controller.widgets.others', Icon);

    return () => {

    }
  },

  onDeactivated() {
    native.metadata.delMetadataInVector('ui.layout.header.controller.widgets.others', Icon);
  }
})

export default RdThemeExtension;
