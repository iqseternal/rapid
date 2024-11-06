import type { ExtensionContext } from '@rapid/extensions';

export enum ExtensionEvents {
  OnInstalled = 'onInstalled',
  OnRegistered = 'onRegistered',
  OnActivated = 'onActivated',
  OnUpdated = 'onUpdated',
  OnConfigChanged = 'onConfigChanged',
  OnUnregistered = 'onUnregistered',
  OnUninstalled = 'onUninstalled',
}

export abstract class Extension{
  abstract id: string;
  abstract version: string;

  abstract onInstalled(context: ExtensionContext): Promise<void>;

  abstract onRegistered(): Promise<void>;

  abstract onActivated(): Promise<void>;

  abstract onUpdated(): Promise<void>;

  abstract onConfigChanged(): Promise<void>;

  abstract onUnregistered(): Promise<void>;

  abstract onUninstalled(): Promise<void>;
}


export class ThemePlugin extends Extension {
  override id = 'themePlugin';
  override version = '0.0.1';

  override async onInstalled(context: ExtensionContext): Promise<void> {

  }

  override async onRegistered() {

  }

  override async onActivated() {

  }

  override async onUpdated() {

  }

  override async onConfigChanged() {

  }

  override async onUnregistered() {

  }

  override async onUninstalled() {

  }
}

