import { app } from 'electron';
import { join } from 'path';
import { FileService } from './FileService';
import { TypeException } from 'rd/base/node/core/exceptions';
import { statSync } from 'fs';
import { ConvertDataType, ConvertService } from './ConvertService';

import * as fs from 'fs';

/**
 * 验证一个本地路径字符串是否带有盘符
 * @param val
 */
export const validateLocalPathHasDriveLetter = (val: string) => {
  const regex = /^[a-zA-Z]:.*$/;

  return regex.test(val);
}


/** 内置目录的名称 */
export type AppDirectoryName = Parameters<typeof app.getPath>[0];

/**
 * 应用程序文件的自定义保存
 * 在此处自定义扩展名文件的保存和读写动作
 */
export class AppFileStorageService {
  public constructor(
    public readonly filePath: string
  ) {}

  /** 按照指定格式保存当前想要的文件 */
  public async save<T extends ConvertDataType>(content: T) {
    const data = await ConvertService.toDeflate(content);
    return FileService.saveFileAsStream(this.filePath, data);
  }

  /** 按照指定格式读取当前想要的文件 */
  public async read() {
    const content = await FileService.readFile(this.filePath);
    return new ConvertService<Exclude<ConvertDataType, Blob>>(ConvertService.toInflate(content));
  }
}


/**
 * 应用程序的存储服务
 */
export class AppDirStorageService {
  /** 此服务对应本地某个路径 url */
  public readonly targetUrl: string;

  public constructor(
    /** electron 准备的文件夹路径标识 */
    private readonly targetName: AppDirectoryName,
    /** 相较于 targetName 的子路径  */
    public readonly absoluteTargetUrl = ''
  ) {
    this.targetUrl = join(app.getPath(targetName), absoluteTargetUrl);

    if (validateLocalPathHasDriveLetter(absoluteTargetUrl)) {
      throw new TypeException('absoluteTargetUrl 不能包含盘符', {
        label: 'AppStorageService:constructor'
      });
    }

    // if (!fs.existsSync(this.targetUrl)) fs.mkdirSync(this.targetUrl);
    // if (!fs.statSync(this.targetUrl).isDirectory()) {
    //   throw new RuntimeException('targetUrl 不是目录', {
    //     label: 'AppStorageService:constructor'
    //   })
    // }
  }

  /**
   * 通过本 service 的 targetURL 再次创建一个子路径的 service
   * @param sub
   * @returns
   */
  public createDirService(sub: string) {
    const subPath = join(this.absoluteTargetUrl, sub);
    return new AppDirStorageService(this.targetName, subPath);
  }

  /**
   * 通过本 service 的 targetUrl 创建一个子文件的 service
   * @returns
   */
  public createFileService(subPath: string) {
    return new AppFileStorageService(join(this.targetUrl, subPath));
  }


  /**
   * 通过本 service 创建一个目录
   * @param dirPath
   * @returns
   */
  public async mkdir(dirPath: string) {
    if (validateLocalPathHasDriveLetter(dirPath)) {
      throw new TypeException(`the dirPath is not absolute path`, { label: `AppStorageService:mkdir` });
    }

    if (statSync(dirPath).isDirectory()) return Promise.resolve();
    return FileService.mkDir(join(this.targetUrl, dirPath));
  }

  /**
   * 通过本 service 保存一个文件
   * @param filePath
   * @param content
   * @returns
   */
  public async saveFile(filePath: string, content: ConvertDataType) {
    if (validateLocalPathHasDriveLetter(filePath)) {
      throw new TypeException(`the filePath is not absolute path`, { label: `AppStorageService:save` });
    }

    return new AppFileStorageService(join(this.targetUrl, filePath)).save(content);
  }

  /**
   * 通过本 service 在维护的目录下获取一个文件内容
   * @param filePath
   * @returns
   */
  public async readFile(filePath: string) {
    return new AppFileStorageService(join(this.targetUrl, filePath)).read();
  }

  /**
   * 获取本 service 下的文件结构数组
   */
  public async folderList(options: Parameters<typeof FileService.folderList>[1]) {
    const list = await FileService.folderList(this.targetUrl, options);


    // TODO

    return list;
  }
}

/** /user/Appdata/Roaming/rapid/docs */
export const documentsDirStorageService = new AppDirStorageService('userData', 'docs');

/** /user/Desktop */
export const desktopDirStorageService = new AppDirStorageService('desktop');

/** /user/Appdata/Roaming/rapid/logs */
export const logsDirStorageService = new AppDirStorageService('logs');

