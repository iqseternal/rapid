const fs = require('fs');
const path = require('path');

/**
 * 删除Electron内置语言包, 用于减少打包体积
 */
async function removeLocales(context) {
  const localeDir = path.join(context.appOutDir, 'locales');

  fs.readdir(localeDir, function (err, files) {
    if (!(files && files.length)) return;

    for (let i = 0, len = files.length; i < len; i++) {
      // zh 和 en 开头的都不删
      if (!(files[i].startsWith('en') || files[i].startsWith('zh'))) {
        fs.unlinkSync(path.join(localeDir, files[i]));
      }
    }
  });
}

exports.default = async function (context) {
  await removeLocales(context);
};
