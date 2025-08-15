import { memo } from 'react';
import { useLocation } from 'react-router-dom';

const { apiGet, apiPost } = rApp.libs;
const { Ellipsis, Widget, IconFont } = rApp.components;
const { Timestamp } = rApp.constants;
const { rApiGet, rApiPost, rApiDelete, classnames, toNil, injectReadonlyVariable } = rApp.libs;
const { skin, mrcvp } = rApp.skin;
const { Space, Dropdown } = rApp.Antd;

export default rApp.extension.defineExtension({
  name: 'example-11',
  version: '0.0.1',

  onActivated() {

    const dm = rApp.metadata.defineMetadataInVector('functional.theme.variables.transformer', () => {
      
    });

    rApp.printer.printInfo('example-11 activated');

  },

  onDeactivated() {

    rApp.printer.printInfo('example-11 deactivated');
  },
})

