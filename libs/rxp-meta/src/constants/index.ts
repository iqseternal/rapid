
export const enum ExtensionErrors {
  ExtensionNameIsRequired = 'Extension name is required',
  ExtensionNameMustBeString = 'Extension name must be string',

  ExtensionVersionIsRequired = 'Extension version is required',
  ExtensionVersionMustBeString = 'Extension version must be string',

  ExtensionOnActivatedIsRequired = 'Extension onActivated is required',
  ExtensionOnActivatedMustBeFunction = 'Extension onActivated must be function',

  ExtensionIsNotExist = 'Extension is not exist',
}

export const enum MetadataErrors {
  MetadataKeyIsRequired = 'Metadata key is required',

  MetadataKeyMustBeString = 'Metadata key must be string',
  MetadataKeyMustBeSymbol = 'Metadata key must be symbol',
  MetadataKeyMustBeNumber = 'Metadata key must be number',
  MetadataKeyMustBeBoolean = 'Metadata key must be boolean',
  MetadataKeyMustBeFunction = 'Metadata key must be function',
  MetadataKeyMustBeObject = 'Metadata key must be object',
  MetadataKeyMustBeArray = 'Metadata key must be array',
};
