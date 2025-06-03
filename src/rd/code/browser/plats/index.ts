import { toNil } from '@suey/pkg-utils';

import * as Rapid from '@/declare';

/**
 * 从加载的插件源中提取出插件
 */
export async function analysisExtensionSource<ExtensionTemplate extends { script_content: string }>(extensionTemplate: ExtensionTemplate): Promise<Rapid.RExtension | null> {
  const scriptContent = extensionTemplate.script_content;

  eval(scriptContent);

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
  extension_id: number;
  extension_uuid: string;
  extension_name: string;
  extension_version_id: number;

  script_content: string;
  script_hash: string;
}

/**
 * 转换插件源为 RD 所使用的标准插件
 */
export async function transformerExtensionsSourceToRdExtension(extensionsSource: ExtensionSource[]): Promise<Rapid.RExtension[]> {
  const extensions: Rapid.RExtension[] = [];

  for (const extensionSource of extensionsSource) {
    const extensionId = extensionSource.extension_id;
    const extensionUuid = extensionSource.extension_uuid;
    const extensionName = extensionSource.extension_name;
    const extensionVersionId = extensionSource.extension_version_id;
    const scriptHash = extensionSource.script_hash;

    // 分析插件
    const [analysisErr, extension] = await toNil(analysisExtensionSource({ script_content: extensionSource.script_content }));
    if (analysisErr) {
      console.error(analysisErr);
      continue;
    }

    if (!extension) continue;

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
  }

  return extensions;
}

/**
 * 注册或者替换一批插件
 */
export async function registerAndReplaceExtensions(nextExtensions: Rapid.RExtension[]) {
  for (const nextExtension of nextExtensions) {
    const extension = rApp.extension.getExtension(nextExtension.name);

    if (!extension) {
      rApp.extension.registerExtension(nextExtension);
      rApp.extension.activatedExtension(nextExtension.name);
      continue;
    }

    if (!extension.meta) {
      //
      continue;
    }

    if (!nextExtension.meta) return;
    if (extension.meta.script_hash === nextExtension.meta.script_hash) continue;

    await rApp.extension.deactivatedExtension(extension.name);
    await rApp.extension.delExtension(extension.name);

    rApp.extension.registerExtension(nextExtension);
    rApp.extension.activatedExtension(nextExtension.name);
  }

  const vouchers = rApp.extension.getExtensions().filter(extension => {
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

  rApp.threads.rxcThread.send('rxc-thread-sync-extensions-info', vouchers);
}

