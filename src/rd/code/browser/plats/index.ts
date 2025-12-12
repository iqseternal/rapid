import { toNil } from '@suey/pkg-utils';

/**
 * 从加载的插件源中提取出插件
 */
export async function analysisExtensionSource<ExtensionTemplate extends { script_content: string }>(extensionTemplate: ExtensionTemplate): Promise<Rapid.Extend.Extension | null> {
  const scriptContent = extensionTemplate.script_content;

  (new Function('window', scriptContent))(window);

  if (window.__define_extension__) {
    const extension = window.__define_extension__;
    if (extension) return extension;
  }

  return null;
}

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

/**
 * 转换插件源为 RD 所使用的标准插件
 */
export async function transformerExtensionsSourceToRdExtension(extensionsSource: ExtensionSource[]): Promise<Rapid.Extend.Extension[]> {
  const extensions: Rapid.Extend.Extension[] = [];

  await Promise.allSettled(extensionsSource.map((extensionSource) => {

    return new Promise<void>(async (resolve, reject) => {
      const extensionId = extensionSource.extension_id;
      const extensionUuid = extensionSource.extension_uuid;
      const extensionName = extensionSource.extension_name;
      const extensionVersionId = extensionSource.extension_version_id;
      const scriptHash = extensionSource.script_hash;

      // 分析插件
      const [analysisErr, extension] = await toNil(analysisExtensionSource({ script_content: extensionSource.script_content }));
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

/**
 * 注册或者替换一批插件
 */
export async function registerAndReplaceExtensions(nextExtensions: Rapid.Extend.Extension[]) {
  for (const nextExtension of nextExtensions) {
    const extension = native.extension.getExtension(nextExtension.name);

    if (!extension) {
      native.extension.registerExtension(nextExtension);
      native.extension.activatedExtension(nextExtension.name);
      continue;
    }

    if (!extension.meta) {
      //
      continue;
    }

    if (!nextExtension.meta) return;
    if (extension.meta.script_hash === nextExtension.meta.script_hash) continue;

    await native.extension.deactivatedExtension(extension.name);
    await native.extension.delExtension(extension.name);

    native.extension.registerExtension(nextExtension);
    native.extension.activatedExtension(nextExtension.name);
  }

  const vouchers = native.extension.getExtensions().filter(extension => {
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

