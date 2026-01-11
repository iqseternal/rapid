import { toNil } from '@suey/pkg-utils';
import { ExtensionManager as RXPExtensionManager } from '@suey/rxp-meta';
import type { Extension as RXPExtension } from '@suey/rxp-meta';

/**
 * 插件源的标准类型
 */
export interface ExtensionSource {
  readonly extension_id: number;
  readonly extension_uuid: string;
  readonly extension_name: string;
  readonly extension_version_id: number;

  readonly script_content: string;
  readonly script_hash: string;
}

export class ExtensionManager extends RXPExtensionManager<Rapid.Extend.Extension> {

  public async analysisExtensionFromSource<ExtensionTemplate extends { script_content: string }>(extensionTemplate: ExtensionTemplate): Promise<Rapid.Extend.Extension | null> {
    const scriptContent = extensionTemplate.script_content;

    (new Function('window', scriptContent))(window);

    if (window.__define_extension__) {
      const extension = window.__define_extension__;
      if (extension) return extension;
    }

    return null;
  }

  public async transformerExtensionsSourceToRdExtension(extensionsSource: ExtensionSource[]): Promise<Rapid.Extend.Extension[]> {
    const extensions: Rapid.Extend.Extension[] = [];

    await Promise.allSettled(extensionsSource.map((extensionSource) => {

      return new Promise<void>(async (resolve, reject) => {
        const extensionId = extensionSource.extension_id;
        const extensionUuid = extensionSource.extension_uuid;
        const extensionName = extensionSource.extension_name;
        const extensionVersionId = extensionSource.extension_version_id;
        const scriptHash = extensionSource.script_hash;

        // 分析插件
        const [analysisErr, extension] = await toNil(this.analysisExtensionFromSource({ script_content: extensionSource.script_content }));
        if (analysisErr) {
          native.printer.printError(analysisErr.reason);
          reject();
          return;
        }

        if (!extension) {
          reject();
          return;
        }

        // 补充插件信息
        if (!extension.meta) {
          extension.meta = {
            extension_id: extensionId,
            extension_name: extensionName,
            extension_uuid: extensionUuid,
            extension_version_id: extensionVersionId,
            script_hash: scriptHash
          };
        }

        extensions.push(extension);
        resolve();
      })
    }))

    return extensions;
  }

  public async registerAndReplaceExtensions(nextExtensions: Rapid.Extend.Extension[]) {
    for (const nextExtension of nextExtensions) {
      const extension = super.getExtension(nextExtension.name);

      if (!extension) {
        super.registerExtension(nextExtension);
        super.activatedExtension(nextExtension.name);
        continue;
      }

      if (!extension.meta) {
        //
        continue;
      }

      if (!nextExtension.meta) return;
      if (extension.meta.script_hash === nextExtension.meta.script_hash) continue;

      await super.deactivatedExtension(extension.name);
      await super.delExtension(extension.name);

      super.registerExtension(nextExtension);
      super.activatedExtension(nextExtension.name);
    }

    const vouchers = super.getExtensions().filter(extension => {
      return extension.meta && extension.meta.script_hash && extension.meta.extension_uuid && extension.meta.script_hash;
    }).map((extension) => {
      if (!extension.meta) {

        return {
          extension_id: -1,
          extension_uuid: '',
          script_hash: ''
        }
      }

      return {
        extension_id: extension.meta.extension_id,
        extension_uuid: extension.meta.extension_uuid,
        script_hash: extension.meta.script_hash
      }
    });

    native.threads.rxcThread.send('rxc-thread-sync-extensions-info', vouchers);
  }


}

export const extensionManager = new ExtensionManager();
