import { memo } from 'react';

const Widget = memo(() => {

  return (
    <div>
      HelloWorld
    </div>
  )
})

const transformer = (cssVariablesDeclaration) => {
  cssVariablesDeclaration['--rapid-caption-bar-background-color'] = '#0F0';

  return cssVariablesDeclaration;
}

export default rApp.extension.defineExtension({

  name: 'example-11',
  version: '0.0.1',

  onActivated() {

    rApp.metadata.defineMetadataInVector('ui.layout.header.controller.widgets.others', Widget);

    rApp.metadata.defineMetadataInVector('functional.theme.variables.transformer', transformer);
  },

  onDeactivated() {

    rApp.metadata.delMetadataInVector('ui.layout.header.controller.widgets.others', Widget);
    rApp.metadata.delMetadataInVector('functional.theme.variables.transformer', transformer);
  },
});
