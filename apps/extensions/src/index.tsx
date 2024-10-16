
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createExtensionFactory, rapid } from '@rapid/extensions';

export const themeExtension = createExtensionFactory((context) => {

  return {
    name: 'themeExtension',

    onRegistered: () => {

      rapid.extension.registerPoint('themeExtension', () => {

      })
      rapid.extension.registerPoint('sdasdsa', () => {

      })


      rapid.extension.registerCommand();
    },

    render() {

      return <>


      </>
    }
  }
})



