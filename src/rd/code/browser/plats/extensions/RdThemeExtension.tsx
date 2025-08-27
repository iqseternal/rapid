import { InnerExtensionNames } from './innerExtensionNames';

type Transformer = Parameters<typeof rApp.metadata.defineMetadataInVector<'functional.theme.variables.transformer'>>[1];

const transformer: Transformer = (cssVariablesPayloadSheet) => {

  // cssVariablesDeclaration['--rd-caption-bar-background-color'] = '#00F';

  return cssVariablesPayloadSheet;
}

export const RdThemeExtension = rApp.extension.defineExtension({
  name: InnerExtensionNames.ThemeExtension,
  version: '0.0.0',

  onActivated(context) {

    rApp.metadata.defineMetadataInVector('functional.theme.variables.transformer', transformer);

    return () => {
      rApp.metadata.delMetadataInVector('functional.theme.variables.transformer', transformer);
    }
  },
})

export default RdThemeExtension;
