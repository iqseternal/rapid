import { setCssVars, cssRoot, CssValueConverts, setCssVar, setCssVarForRoot, setCssVarsForRoot } from '@rapid/libs/common';

export interface PluginUnit<Data extends any = any> {
  transform(data: Data): Data;
}

export interface Plugin<P extends PluginUnit = PluginUnit> {
  plugins: P[],
  use(this: Plugin<P>, p: P): void;
  install(this: Plugin<P>, p: P): void;
  installAll(this: Plugin<P>): void;
}

export interface Application {
  plugins: Plugin[];
  use: (this: Application, plugin: Plugin) => void;
  install: (this: Application, p: Plugin) => void;
  installAll: (this: Application) => void;
}

export * from './theme';

export const app: Application = {
  plugins: [],

  use(plugin) {
    this.plugins.push(plugin);
  },
  install(plugin) {
    plugin.installAll();
  },
  installAll() {
    this.plugins.forEach(plugin => {
      plugin.installAll();
    })
  }
}
