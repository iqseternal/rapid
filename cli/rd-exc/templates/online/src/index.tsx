import { memo } from 'react';
import { useLocation } from 'react-router-dom';

const { apiGet, apiPost } = native.libs;
const { Ellipsis, Widget, IconFont } = native.components;
const { Timestamp } = native.constants;
const { rApiGet, rApiPost, rApiDelete, classnames, toNil, injectReadonlyVariable } = native.libs;
const { skin, mrvp } = native.skin;
const { Space, Dropdown } = native.Antd;

const transformer = (sheet: Rapid.SKin.CssVariablePayloadSheet) => {
  sheet.uiCaptionBarBackground.value = '#0f0';
}

export default native.extension.defineExtension({
  name: 'example-11',
  version: '0.0.1',

  onActivated() {
    native.printer.printInfo('example-11 deactivated');

    native.metadata.defineMetadataInVector('functional.theme.variables.transformer', transformer);
  },

  onDeactivated() {

    native.printer.printInfo('example-11 deactivated');

    native.metadata.delMetadataInVector('functional.theme.variables.transformer', transformer);
  },
})

