
const transformer = (cssVariablesDeclaration: Rapid.SKin.CssVariablesDeclaration) => {
  cssVariablesDeclaration['--rapid-caption-bar-background-color'] = '#0F0';

  return cssVariablesDeclaration;
}


export default rApp.extension.defineExtension({
  name: 'example-11',
  version: '0.0.1',

  onActivated() {


    rApp.metadata.defineMetadataInVector('functional.theme.variables.transformer', transformer);
  },

  onDeactivated() {

    rApp.metadata.delMetadataInVector('functional.theme.variables.transformer', transformer);
  },
})
