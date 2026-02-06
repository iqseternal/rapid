import { InnerExtensionNames } from './innerExtensionNames';

type Transformer = Parameters<typeof native.metadata.defineMetadataInVector<'functional.theme.variables.transformer'>>[1];

const transformer: Transformer = (cssVariablesPayloadSheet) => {

  cssVariablesPayloadSheet.uiCaptionBarBackground.value = '#00F';

  return cssVariablesPayloadSheet;
}

export const RdThemeExtension = native.extension.defineExtension({
  name: InnerExtensionNames.ThemeExtension,
  version: '0.0.0',

  onActivated(context) {

    native.metadata.defineMetadataInVector('functional.theme.variables.transformer', transformer);

    return () => {

    }
  },

  onDeactivated() {

    native.metadata.delMetadataInVector('functional.theme.variables.transformer', transformer);
  }
})

export default RdThemeExtension;
