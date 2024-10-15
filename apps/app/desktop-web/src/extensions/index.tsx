import { Extension, ExtensionEvents, ThemePlugin } from './Extension';
import { ExtensionsManager } from './ExtensionsManager';
import { RegisterPoints } from './RegisterPoints';


export const useExtension = (registerPoint: RegisterPoints) => {

  return new ThemePlugin();
}



function A() {
  const extension = useExtension(RegisterPoints.WorkbenchesGraphic);

  if (extension.id) return extension;


  return <div>


  </div>
}








