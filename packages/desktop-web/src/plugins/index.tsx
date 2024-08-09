import { setCssVars, cssRoot, CssValueConverts, setCssVar, setCssVarForRoot, setCssVarsForRoot } from '@rapid/libs-web/common';

export interface PluginUnit<Data extends any = any> {
  transform(data: Data): Data;
}

export interface Plugin<P extends PluginUnit = PluginUnit> {
  plugins: P[],
  use(this: Plugin<P>, p: P): this;
  install(this: Plugin<P>, p: P): void;
  installAll(this: Plugin<P>): void;
}

export interface Application {
  plugins: Plugin[];
  use: (this: Application, plugin: Plugin) => this;
  install: (this: Application, p: Plugin) => void;
  installAll: (this: Application) => void;
}

export * from './theme';

export const app: Application = {
  plugins: [],

  use(plugin) {
    this.plugins.push(plugin);
    return this;
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
