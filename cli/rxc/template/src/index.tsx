import { memo } from 'react';
import { useLocation } from 'react-router-dom';

const { apiGet, apiPost } = rApp.libs;
const { Ellipsis, Widget, IconFont } = rApp.components;
const { Timestamp } = rApp.constants;
const { rApiGet, rApiPost, rApiDelete, classnames, toNil, injectReadonlyVariable } = rApp.libs;
const { skin, mrcvp } = rApp.skin;
const { Space, Dropdown } = rApp.Antd;

type Transformer = Parameters<typeof rApp.metadata.defineMetadataInVector<'functional.theme.variables.transformer'>>[1];

const transformer: Transformer = (cssVariablesPayloadSheet) => {

  cssVariablesPayloadSheet.uiCaptionBarBackground.value = '#0F0';
}

const SkinWidget = memo(() => {

  return (
    <Dropdown
      menu={{
        items: [
          {
            label: '皮肤',
            key: 'SKin',
            onClick: () => {
              if (rApp.metadata.hasMetadata('functional.theme.variables.transformer')) {

                const transformers = rApp.metadata.getMetadata('functional.theme.variables.transformer');

                if (!transformers) return;
                if (transformers.includes(transformer)) {
                  rApp.metadata.delMetadataInVector('functional.theme.variables.transformer', transformer);
                  return;
                }
              }

              rApp.metadata.defineMetadataInVector('functional.theme.variables.transformer', transformer);
            }
          }
        ]
      }}
    >
      <Widget
        icon='BgColorsOutlined'
      />
    </Dropdown>
  )
})

const SkinWidgetWrapper = memo(() => {
  const location = useLocation();

  return (
    <SkinWidget />
  )
})

export default rApp.extension.defineExtension({
  name: 'example-11',
  version: '0.0.1',

  onActivated() {

    rApp.metadata.defineMetadataInVector('ui.layout.header.controller.widgets.others', SkinWidgetWrapper);
  },

  onDeactivated() {

    rApp.metadata.delMetadataInVector('ui.layout.header.controller.widgets.others', SkinWidgetWrapper);
  },
})
