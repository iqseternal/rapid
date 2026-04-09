import { useEffect, useLayoutEffect, useRef } from 'react';

export default function useExtend() {
  const [extensionList] = native.extension.useExtensionsList();
  useEffect(() => {
    const context: Rapid.Extend.ExtensionContext = {}

    extensionList.forEach(extension => {
      extension.activated();
    })

    return () => {
      // extensionList.forEach(extension => {
      //   extension.deactivated();
      // })
    }
  }, [extensionList]);
}
