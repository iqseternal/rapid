import { app } from 'electron';
import { join, relative } from 'path';
import { FileService } from './FileService';
import { DownloadService } from './DownloadService';

/**
 * 应用程序数据存储服务
 */
export class AppDataService {
  public readonly sourcePath: string;
  public readonly relativeSourcePath: string;

  constructor(
    relativeSourcePath:
      'home' | 'appData' | 'userData' | 'sessionData' | 'temp' |
      'exe' | 'module' | 'desktop' | 'documents' | 'downloads' |
      'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps',
    public readonly absoluteSourcePath: string
  ) {
    this.relativeSourcePath = app.getPath(relativeSourcePath);
    this.sourcePath = join(this.relativeSourcePath, absoluteSourcePath);
  }

  saveFile(url: string): Promise<string>
  saveFile(source: Source): Promise<string>
  saveFile(data: string | Source): Promise<string> {
    return new Promise(async (resolve, reject) => {

    });
  }
}
