import { useEffect } from 'react';

function rAppExtensionActivateAllExtensions() {

}


function rAppExtensionApplyThemeTransformers() {

}


export default function useExtend() {
  const [extensionList] = rApp.extension.useExtensionsList();
  useEffect(() => {
    const context: Rapid.Extend.ExtensionContext = {}

    extensionList.forEach(extension => {
      rApp.extension.activatedExtension(extension.name);
    })

    return () => {



    }
  }, [extensionList]);

  const themePayloadTransformers = rApp.metadata.useMetadata('functional.theme.variables.transformer');
  useEffect(() => {
    if (!themePayloadTransformers) return;

    rApp.skin.skin.resetCssVariablesPayloadSheet();

    const cssVariablesPayloadSheet = rApp.skin.skin.cssVariablesPayloadSheet;
    themePayloadTransformers.forEach((transform) => {
      transform(cssVariablesPayloadSheet);
    })

    rApp.skin.skin.install();

    return () => {

      rApp.skin.skin.uninstall();
    }
  }, [themePayloadTransformers]);
}
