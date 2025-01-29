import { RdSKin } from '@/skin';

const transformer = (cssVariablesPayloadSheet: RdSKin.CssVariablesPayloadSheet) => {

  printer.printInfo('主题插件已经加载, 修改了标题栏的背景色');

  cssVariablesPayloadSheet['--rapid-caption-bar-background-color'] = '#0F0';

  return cssVariablesPayloadSheet;
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
