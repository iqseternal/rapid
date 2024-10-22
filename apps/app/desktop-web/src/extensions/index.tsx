import { Extension, ExtensionEvents, ThemePlugin } from './Extension';
import { ExtensionsManager } from './ExtensionsManager';
import { RegisterPoints } from './RegisterPoints';

import { rApp } from '@rapid/extensions';


export const useExtension = (registerPoint: RegisterPoints) => {


  return new ThemePlugin();
}





export { RegisterPoints } from './RegisterPoints';


