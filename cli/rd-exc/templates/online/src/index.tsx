import { memo } from 'react';
import { useLocation } from 'react-router-dom';

const { apiGet, apiPost } = native.libs;
const { Ellipsis, Widget, IconFont } = native.components;
const { Timestamp } = native.constants;
const { rApiGet, rApiPost, rApiDelete, classnames, toNil, injectReadonlyVariable } = native.libs;
const { Space, Dropdown } = native.Antd;

export default native.extension.defineExtension({
  name: 'example-11',
  version: '0.0.1',

  onActivated() {
    native.printer.printInfo('example-11 deactivated');


  },

  onDeactivated() {

    native.printer.printInfo('example-11 deactivated');

  },
})

