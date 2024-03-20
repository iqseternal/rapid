
import { app } from 'electron';
import { join } from 'path';

import { execShell } from './execShell';

const appPath = app.getAppPath();
const asarUnpackedPath = app.isPackaged ? app.getAppPath().replace(/\.asar$/, '.asar.unpacked') : appPath;

export const setWallpaperShell = (imagePath: string) => {
  const shellPath = join(asarUnpackedPath, 'scripts/shell', 'setWallpaper.ps1');

  const command = `reg add "HKEY_CURRENT_USER\\Control Panel\\Desktop" /v Wallpaper /t REG_SZ /d "${imagePath}" /f`;

  return execShell(command);
};

export const refreshWallpaper = () => {
  const command = `RUNDLL32.EXE user32.dll,UpdatePerUserSystemParameters`;

  return execShell(command);
};

export const getWallpaperShell = () => {
  const shellPath = join(asarUnpackedPath, 'scripts/shell', 'setWallpaper.ps1');

  return execShell(`powershell.exe -ExecutionPolicy Bypass -File "${shellPath}"`);
};
