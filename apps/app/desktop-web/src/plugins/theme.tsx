
import { installThemeCssVars, makeCssVarsDeclaration } from '@/themes';
import type { CssVarsDeclaration } from '@/themes';
import type { PluginUnit, Plugin } from './index';

export const themePlugins: Plugin<PluginUnit<CssVarsDeclaration>> = {
  plugins: [],
  use(plugin) {
    this.plugins.push(plugin);
    return this;
  },
  install(plugin) {
    let declaration = makeCssVarsDeclaration();

    declaration = plugin.transform(declaration);

    installThemeCssVars(declaration);
  },
  installAll() {
    let declaration = makeCssVarsDeclaration();

    this.plugins.forEach(plugin => {
      declaration = plugin.transform(declaration);
    })

    installThemeCssVars(declaration);
  }

}
