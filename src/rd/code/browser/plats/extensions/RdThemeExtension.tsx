import { InnerExtensionNames } from './innerExtensionNames';

const transformer = (cssVariablesDeclaration: Rapid.SKin.CssVariablesDeclaration) => {

  // cssVariablesDeclaration['--rd-caption-bar-background-color'] = '#00F';

  return cssVariablesDeclaration;
}

export const RdThemeExtension = rApp.extension.defineExtension({
  name: InnerExtensionNames.ThemeExtension,
  version: '0.0.0',

  onActivated(context) {

    rApp.metadata.defineMetadataInVector('functional.theme.variables.transformer', transformer);
  },

  onDeactivated() {

    rApp.metadata.delMetadataInVector('functional.theme.variables.transformer', transformer);
  }
})

export default RdThemeExtension;
