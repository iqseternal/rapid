import { useLayoutEffect } from 'react';

/**
 * 使用扩展
 */
export function useExtends() {

  const [extensionList] = rApp.extension.useExtensionsList();
  useLayoutEffect(() => {
    const context: Rapid.Extend.ExtensionContext = {}

    extensionList.forEach(extension => {
      rApp.extension.activatedExtension(extension.name);
    })
  }, [extensionList]);


  const themePayloadTransformers = rApp.metadata.useMetadata('functional.theme.variables.transformer');
  useLayoutEffect(() => {
    if (!themePayloadTransformers) return;

    let declaration = rApp.skin.skin.toCssVariablesDeclaration();
    themePayloadTransformers.forEach(transform => {
      declaration = transform(declaration);
    })

    rApp.skin.skin.install();

    return () => {

      rApp.skin.skin.uninstall();
    }
  }, [themePayloadTransformers]);
}
