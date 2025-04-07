import type { RdSKin } from '@/skin';

const transformer = (cssVariablesDeclaration: RdSKin.CssVariablesDeclaration) => {

  return cssVariablesDeclaration;
}

export const RdThemeExtension = rApp.extension.defineExtension({
  name: 'INNER_THEME_EXTENSION',
  version: '0.0.0',

  onActivated(context) {

    rApp.metadata.defineMetadataInVector('functional.theme.variables.transformer', transformer);
  },

  onDeactivated() {

    rApp.metadata.delMetadataInVector('functional.theme.variables.transformer', transformer);
  }
})

export default RdThemeExtension;
