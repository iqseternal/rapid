import { exec } from 'child_process';
import { getWallpaperShell, setWallpaperShell, refreshWallpaper } from '#code/core/shell/wallpaperShell';

export class WallpaperService {
  constructor(

  ) {

  }

  async setWallpaper(source: Source) {
    return setWallpaperShell(source.src);
  }

  refreshWallpaper() {
    return refreshWallpaper();
  }

  async getWallpaper() {
    return '1';
  }
}
