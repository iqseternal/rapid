
import type { RdSKin } from '@/skin';

const transformer = (cssVariablesDeclaration: RdSKin.CssVariablesDeclaration) => {
  cssVariablesDeclaration['--rapid-caption-bar-background-color'] = '#0F0';

  return cssVariablesDeclaration;
}

export const ThemeExtension = rApp.extension.defineExtension({
  name: 'INNER_THEME_EXTENSION',
  version: '0.0.0',

  onActivated() {
    const transformers = rApp.metadata.getMetadata('functional.theme.variables.transform') ?? [];
    transformers.push(transformer);
    rApp.metadata.defineMetadata('functional.theme.variables.transform', [...transformers]);
  },

  onDeactivated() {
    const transformers = rApp.metadata.getMetadata('functional.theme.variables.transform') ?? [];
    const newTransformers = transformers.filter(t => t !== transformer);
    rApp.metadata.defineMetadata('functional.theme.variables.transform', newTransformers);
  }
})
