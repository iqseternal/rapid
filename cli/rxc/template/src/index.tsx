

const { apiGet, apiPost } = rApp.libs;
const { Ellipsis } = rApp.components;
const { Timestamp } = rApp.constants;
const { rApiGet, rApiPost, rApiDelete, classnames, toNil, injectReadonlyVariable } = rApp.libs;
const { skin, mrcvp } = rApp.skin;

const { Space } = rApp.Antd;

type Transformer = Parameters<typeof rApp.metadata.defineMetadataInVector<'functional.theme.variables.transformer'>>[1];

const transformer: Transformer = (cssVariablesDeclaration) => {
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
