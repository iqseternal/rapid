import { rApiGet } from 'rd/base/common/api';
import { setupExtensions, setupInnerExtensions } from '@/plats/extensions';
import { useGroupExtensionsApi } from '@/api';
import { toNil, toWaitPromise } from '@rapid/libs';
import { registerAndReplaceExtensions, transformerExtensionsSourceToRdExtension } from '@/plats';
import { debounce } from 'lodash';

native.emitter.on('react-app-first-rendered', setupExtensions);
