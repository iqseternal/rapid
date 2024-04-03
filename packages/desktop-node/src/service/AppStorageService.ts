import { app } from 'electron';
import { join, relative, isAbsolute } from 'path';
import { FileService } from './FileService';
import { RuntimeException, TypeException } from '@/core';
import { statSync, createReadStream, createWriteStream } from 'fs';
import { ConvertDataType, ConvertService } from './ConvertService';
import { validateLocalPathHasDriveLetter } from '@rapid/validates';
import { EXTENSIONS } from '@rapid/config/constants';
import { Printer } from '@suey/printer';
import * as fs from 'fs';

/** 内置目录的名称 */
export type AppDirectoryName = Parameters<typeof app.getPath>[0];

/**
 * 应用程序文件的自定义保存
 * 在此处自定义扩展名文件的保存和读写动作
 */
export class AppFileStorageService {
  constructor(
    public readonly filePath: string
  ) {}

  /** 按照指定格式保存当前想要的文件 */
  async save<T extends ConvertDataType>(content: T) {
    const data = await ConvertService.toDeflate(content);
    return FileService.saveFile(this.filePath, data);
  }

  /** 按照指定格式读取当前想要的文件 */
  async read() {
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

  constructor(
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

    if (!fs.statSync(this.targetUrl).isDirectory()) {
      throw new RuntimeException('targetUrl 不是目录', {
        label: 'AppStorageService:constructor'
      })
    }
  }

  /**
   * 通过本 service 的 targetURL 再次创建一个子路径的 service
   * @param sub
   * @returns
   */
  createSubService(sub: string) {
    const subPath = join(this.absoluteTargetUrl, sub);
    return new AppDirStorageService(this.targetName, subPath);
  }

  /**
   * 通过本 service 创建一个目录
   * @param dirPath
   * @returns
   */
  async mkdir(dirPath: string) {
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
  async saveFile(filePath: string, content: ConvertDataType) {
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
  async readFile(filePath: string) {
    return new AppFileStorageService(join(this.targetUrl, filePath)).read();
  }

  /**
   * 获取本 service 下的文件结构数组
   * @param optons
   */
  async folderList(optons: Parameters<typeof FileService.folderList>[1]) {
    const list = await FileService.folderList(this.targetUrl, optons);


    // TODO

    return list;
  }
}


