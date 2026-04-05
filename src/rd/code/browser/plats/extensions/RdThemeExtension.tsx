import { memo, useEffect, useRef } from 'react';
import { InnerExtensionNames } from './innerExtensionNames';

type Transformer = Parameters<typeof native.metadata.defineMetadataInVector<'functional.theme.variables.transformer'>>[1];

const { SkinOutlined, DeleteOutlined } = native.AntdIcons;

const { useThemeStore } = native.stores.features;

const { Widget } = native.components;

const transformer: Transformer = (cssVariablesPayloadSheet) => {

  cssVariablesPayloadSheet.uiCaptionBarBackground.value = '#00F';

  return cssVariablesPayloadSheet;
}

const Icon = memo(() => {
  const isActivated = useRef(false);

  return (
    <Widget
      tipText='icon'
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

const IconMounted = memo(() => {

  return (
    <Widget
      onClick={() => {
        const widgetsOthers = native.metadata.getMetadata('ui.layout.header.controller.widgets.others');
        const hasIcon = widgetsOthers && (widgetsOthers?.findIndex((widget) => widget === Icon) !== -1);

        if (hasIcon) {
          native.metadata.delMetadataInVector('functional.theme.variables.transformer', transformer);

          native.metadata.delMetadataInVector('ui.layout.header.controller.widgets.others', Icon);
        }
        else {
          native.metadata.defineMetadataInVector('ui.layout.header.controller.widgets.others', Icon);
        }
      }}
    >
      <DeleteOutlined />
    </Widget>
  )
})


export const RdThemeExtension = native.extension.defineExtension({
  name: InnerExtensionNames.ThemeExtension,
  version: '0.0.0',

  onActivated(context) {
    native.metadata.defineMetadataInVector('ui.layout.header.controller.widgets.others', IconMounted);

    return () => {

    }
  },

  onDeactivated() {
    native.metadata.delMetadataInVector('functional.theme.variables.transformer', transformer);

    native.metadata.delMetadataInVector('ui.layout.header.controller.widgets.others', Icon);

    native.metadata.delMetadataInVector('ui.layout.header.controller.widgets.others', IconMounted);
  }
})

export default RdThemeExtension;
