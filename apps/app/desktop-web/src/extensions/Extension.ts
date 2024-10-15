

export enum ExtensionEvents {
  OnInstalled = 'onInstalled',
  OnRegistered = 'onRegistered',
  OnActivated = 'onActivated',
  OnUpdated = 'onUpdated',
  OnConfigChanged = 'onConfigChanged',
  OnUnregistered = 'onUnregistered',
  OnUninstalled = 'onUninstalled',
}



export abstract class Extension {
  id: string;
  version: number;

  abstract [ExtensionEvents.OnInstalled]?: () => void;
  abstract [ExtensionEvents.OnRegistered]?: () => void;
  abstract [ExtensionEvents.OnActivated]?: () => void;
  abstract [ExtensionEvents.OnUpdated]?: () => void;
  abstract [ExtensionEvents.OnConfigChanged]?: () => void;
  abstract [ExtensionEvents.OnUnregistered]?: () => void;
  abstract [ExtensionEvents.OnUninstalled]?: () => void;
}

export class ThemePlugin extends Extension {
  override id = 'themePlugin';
  override version = 1;

  override [ExtensionEvents.OnInstalled] = () => {

  }

  override [ExtensionEvents.OnRegistered] = () => {

  }

  override [ExtensionEvents.OnActivated] = () => {

  }

  override [ExtensionEvents.OnUpdated] = () => {

  }

  override [ExtensionEvents.OnConfigChanged] = () => {

  }

  override [ExtensionEvents.OnUnregistered] = () => {

  }

  override [ExtensionEvents.OnUninstalled] = () => {

  }
}

