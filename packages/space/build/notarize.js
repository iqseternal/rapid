const { notarize } = require('@electron/notarize');
const { printInfo, printWarn, printError } = require('@suey/printer');

module.exports = async (context) => {
  if (process.platform !== 'darwin') return;

  printInfo('aftersign hook triggered, start to notarize app.');

  if (!process.env.CI) return printInfo(`skipping notarizing, not in CI.`);

  if (!('APPLE_ID' in process.env && 'APPLE_ID_PASS' in process.env)) return printWarn('skipping notarizing, APPLE_ID and APPLE_ID_PASS env variables must be set.');

  const appId = 'com.electron.app';

  const { appOutDir } = context;

  const appName = context.packager.appInfo.productFilename;

  await notarize({
    appBundleId: appId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLEIDPASS
  }).catch(err => {
    printError(err);
  });

  printInfo(`done notarizing ${appId}.`);
}
