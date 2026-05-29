
import { setupExtensions, setupInnerExtensions } from '@/plats/extensions';
import { useGroupExtensionsApi } from '@/api';
import { registerAndReplaceExtensions, transformerExtensionsSourceToRdExtension } from '@/plats';
import { debounce } from 'lodash';

native.emitter.on('react-app-first-rendered', setupExtensions);
