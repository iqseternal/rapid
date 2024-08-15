
import { installThemeCssVars, makeVarsDeclaration } from '@/themes';
import type { ThemeCssVarsDeclaration, ThemeCssVarsSheet } from '@/themes';
import type { PluginUnit, Plugin } from './index';

export const themePlugins: Plugin<PluginUnit<ThemeCssVarsDeclaration>> = {
  plugins: [],
  use(plugin) {
    this.plugins.push(plugin);
    return this;
  },
  install(plugin) {
    let declaration = makeVarsDeclaration();

    declaration = plugin.transform(declaration);

    installThemeCssVars(declaration);
  },
  installAll() {
    let declaration = makeVarsDeclaration();

    this.plugins.forEach(plugin => {
      declaration = plugin.transform(declaration);
    })

    installThemeCssVars(declaration);
  }

}
