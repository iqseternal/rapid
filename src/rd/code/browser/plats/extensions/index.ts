import { RdThemeExtension } from './RdThemeExtension';

export async function setupInnerExtensions() {
  rApp.extension.registerExtension(RdThemeExtension);
}
