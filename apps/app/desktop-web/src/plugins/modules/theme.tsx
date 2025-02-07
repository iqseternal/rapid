
import type { RdSKin } from '@/skin';

const transformer = (cssVariablesDeclaration: RdSKin.CssVariablesDeclaration) => {
  cssVariablesDeclaration['--rapid-caption-bar-background-color'] = '#0F0';

  return cssVariablesDeclaration;
}

export const ThemeExtension = rApp.extension.defineExtension({
  name: 'INNER_THEME_EXTENSION',
  version: '0.0.0',

  onActivated() {

    rApp.metadata.defineMetadataInVector('functional.theme.variables.transformer', transformer);
  },

  onDeactivated() {

    rApp.metadata.delMetadataInVector('functional.theme.variables.transformer', transformer);
  }
})
