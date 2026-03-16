import { RdThemeExtension } from './RdThemeExtension';

export async function setupInnerExtensions() {
  const setupRdThemeExtension = async () => {
    native.extension.registerExtension(RdThemeExtension);
    await native.extension.activatedExtension(RdThemeExtension.name);
  }



  return Promise.all([
    setupRdThemeExtension(),
  ])
}
