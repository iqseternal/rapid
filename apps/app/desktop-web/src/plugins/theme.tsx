

import { RdSKin } from '@/skin';
import type { PluginUnit, Plugin } from './index';

export const themePlugins: Plugin<PluginUnit<RdSKin.CssVariablesDeclaration>> = {
  plugins: [],
  use(plugin) {
    this.plugins.push(plugin);
    return this;
  },
  install(plugin) {
    let declaration = RdSKin.toCssVariablesDeclaration();

    declaration = plugin.transform(declaration);

    RdSKin.install(declaration);
  },
  installAll() {
    let declaration = RdSKin.toCssVariablesDeclaration();

    this.plugins.forEach(plugin => {
      declaration = plugin.transform(declaration);
    })

    RdSKin.install(declaration);
  }
}
