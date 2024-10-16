
import { RegisterPoints } from './RegisterPoints';
import { Extension } from './Extension';
import { bus } from '@/events';
import { isString } from '@suey/pkg-utils';

/**
 * Extensions manager
 *
 */
export class ExtensionsManager {
  constructor() { return ExtensionsManager.extensionsManager; }

  private static readonly extensionsManager = new ExtensionsManager();
  private readonly extensions = new Map<string, Extension>();

  public static getInstance() { return ExtensionsManager.extensionsManager; }

  async installExtension(...extensions: Extension[]) {
    extensions.forEach(async extension => {

      const id = extension.id;
      const version = extension.version;

      if (this.extensions.has(id)) {
        const oldExtension = this.extensions.get(id)!;

        await oldExtension.onUnregistered();
        await oldExtension.onUninstalled();
      }

      // await extension.onInstalled(ExtensionRuntimeContext);
      this.extensions.set(id, extension);
    })
  }

  async unregisterExtension(...ids: string[]): Promise<void>;
  async unregisterExtension(...extensions: Extension[]): Promise<void>
  async unregisterExtension(...extensions: string[] | Extension[]) {
    extensions.forEach(async (extension: string | Extension) => {
      const id = isString(extension) ? extension : extension.id;

      const targetExtension = this.extensions.get(id);
      if (targetExtension) {
        await targetExtension.onUnregistered();
        await targetExtension.onUninstalled();
      }

      this.extensions.delete(id);
    })
  }
}







