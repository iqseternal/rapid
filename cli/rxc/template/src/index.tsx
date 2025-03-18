import { memo } from 'react';

const Widget = memo(() => {

  return (
    <div>
      HelloWorld
    </div>
  )
})

const extension = rApp.extension.defineExtension({

  name: 'example-11',
  version: '0.0.1',

  onActivated() {
    console.log('example-1 activated');

    rApp.metadata.defineMetadataInVector('ui.layout.header.controller.widgets.others', Widget);
  },

  onDeactivated() {

    rApp.metadata.delMetadataInVector('ui.layout.header.controller.widgets.others', Widget);
  },
})

export default extension;
