import { useEffect, useLayoutEffect, useRef } from 'react';
import { Skin } from 'rd/base/browser/service/Skin';
import type { RdCssVariablePayloadSheet } from './skin';

function rAppExtensionActivateAllExtensions() {

}

export default function useExtend() {
  const [extensionList] = native.extension.useExtensionsList();
  useEffect(() => {
    const context: Rapid.Extend.ExtensionContext = {}

    extensionList.forEach(extension => {
      native.extension.activatedExtension(extension.name);
    })

    return () => {



    }
  }, [extensionList]);

  const themeTransformers = native.metadata.useMetadata('functional.theme.variables.transformer');
  useEffect(() => {
    if (!themeTransformers) return;

    native.skin.skin.resetCssVarsSheet();

    native.skin.skin.transformers(themeTransformers);

    native.skin.skin.install();

    return () => {

      native.skin.skin.uninstall();
    }
  }, [themeTransformers]);
}
