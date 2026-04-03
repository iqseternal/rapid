import { useGroupExtensionsApi } from '@/api';
import { RdThemeExtension } from './RdThemeExtension';
import { toNil, toWaitPromise } from '@rapid/libs';
import { registerAndReplaceExtensions, transformerExtensionsSourceToRdExtension } from '../index';

/**
 * 加载内部插件
 */
export async function setupInnerExtensions() {
  native.extension.registerExtension(RdThemeExtension);
}

/**
 * 加载线上插件
 */
export async function setupOnlineExtensions() {
  const extensionGroupId = 42;
  const extensionGroupUuid = 'fb024456-2f71-4f79-99e9-c3f5b7e2553c';

  const [err, res] = await toNil(useGroupExtensionsApi({
    extension_group_id: extensionGroupId,
    extension_group_uuid: extensionGroupUuid
  }));

  if (err) return;
  await toWaitPromise({ waitTime: 1500 });

  const extensions = await transformerExtensionsSourceToRdExtension(res.data.data);

  await registerAndReplaceExtensions(extensions);
}

/**
 * 加载插件
 */
export async function setupExtensions() {
  await setupInnerExtensions();

  // setupOnlineExtensions();
}
