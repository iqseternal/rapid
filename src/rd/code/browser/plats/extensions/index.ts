import { RdThemeExtension } from './RdThemeExtension';

export async function setupInnerExtensions() {
  native.extension.registerExtension(RdThemeExtension);
}
