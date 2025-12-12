import { Thread } from 'rd/base/browser/service/Thread';
import { rApiPost } from 'rd/base/common/api';
import { toNil } from '@suey/pkg-utils';
import { useExtensionsApi, useGroupExtensionsApi } from '../api';
import type { Extension } from '@suey/rxp-meta';
import { registerAndReplaceExtensions, transformerExtensionsSourceToRdExtension } from '@/plats';

const rxcThread = new Thread<Rapid.Thread.ExtensionThreadEntries, Rapid.Thread.MainThreadEntries>(
  new Worker(
    new URL('./rxc.worker.ts', import.meta.url),
    {
      type: 'module'
    }
  )
);

rxcThread.handle('rxc:extension-changed', async (extensionIds) => {
  const extensions = native.extension.getExtensions().filter((extension) => (extension.meta && extensionIds.includes(extension.meta.extension_id)));

  const [err, res] = await toNil(useExtensionsApi({
    vouchers: extensions.map(extension => {
      return {
        extension_id: extension.meta?.extension_id ?? -1,
        extension_uuid: extension.meta?.extension_uuid ?? ''
      }
    })
  }))

  if (err) return;

  const nextExtensionsSource = res.data.data;

  const nextExtension = await transformerExtensionsSourceToRdExtension(nextExtensionsSource);

  await registerAndReplaceExtensions(nextExtension);
})

export { rxcThread }
