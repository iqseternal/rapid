import { PrinterService } from './PrinterService';
import { Printer } from '@suey/printer';

import * as path from 'path';
import * as fs from 'fs';


export type File = { isFile: true, isDirectory: false, ext: string, path: string };
export type Directory = { isFile: false, isDirectory: true, path: string, folderList: (File | Directory)[]; };

/**
 * 文件服务, 为应用程序的文件服务
 */
export class FileService {
  /**
   * 判断两个文件路径是否具有同样的扩展名
   * @returns
   */
  public static isSameExt(file1: string, file2: string) {
    const ext1 = file1.split('.').pop() || '';
    const ext2 = file2.split('.').pop() || '';
    return ext1.toLowerCase() === ext2.toLowerCase();
  }

  /**
   * 以流的方式写入文件
   * @returns
   */
  public static async saveFileAsStream(filePath: string, content: any, options?: Parameters<typeof fs.createWriteStream>[1]) {
    const writeStream = fs.createWriteStream(filePath, options);
    return new Promise<void>((resolve, reject) => {
      writeStream.write(content, (err) => {
        if (err) reject(err);
        resolve();
      });
    })
  }

  /**
   * 以文本的方式读取文件
   * @returns
   */
  public static async readFile(filePath: string) {
    return new Promise<string | Buffer>((resolve, reject) => {
      const content = fs.readFileSync(filePath);
      resolve(content);
    });
  }

  /**
   * 创建文件夹, 会递归创建, 请调用时确认文件夹地址是否符合您的要求
   * @param {string} dir
   * @returns
   */
  public static async mkDir(dir: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, { recursive: true }, err => {
        if (err) {
          reject(false);
          return;
        }
        resolve();
      });
    });
  }

  /**
   * 向文件中新增数据
   * @returns
   */
  public static async appendToFile(filePath: string, content: string | Buffer): Promise<void> {
    return new Promise((resolve, reject) => {

      fs.appendFile(filePath, content, err => {
        if (err) reject(err);
        resolve();
      });
    })
  }




















  static folderList(filePath: string, options?: {
    /**
     * 是否递归
     */
    recursive?: boolean;
    /**
     * 是否只获取目录
     */
    onlyDir?: boolean;
    /**
     * 过滤器
     */
    filter?: (filePath: string, attributes: { isDirectory: boolean, isFile: boolean, ext?: string }) => boolean;
    /**
     * 深度
     */
    depth?: number;
  }) {
    const { recursive, onlyDir, onlyFile, filter, depth } = {
      recursive: false,
      onlyDir: false,
      onlyFile: false,
      filter: () => true,
      depth: 10,
      ...(options ?? {})
    };



    return new Promise<(File | Directory)[]>((resolve, reject) => {
      if (!fs.statSync(filePath).isDirectory()) {
        reject([]);
        return;
      }
      const folderList: (File | Directory)[] = [];

      const statDirectory = (dir: string, list: (File | Directory)[], dep = 0) => {
        if (!fs.statSync(filePath).isDirectory()) return;
        if (dep >= depth) return;

        fs.readdirSync(dir).forEach(file => {
          if (!file) return;
          if (!fs.existsSync(path.join(dir, file))) return;
          const filePath = fs.realpathSync(path.join(dir, file));

          if (!fs.existsSync(filePath)) return;
          if (!filePath.includes(path.join(dir))) return;
          if (fs.statSync(filePath).isDirectory()) {
            const subList: (File | Directory)[] = [];
            statDirectory(filePath, subList, dep + 1);

            const directory: Directory = {
              isFile: false,
              isDirectory: true,
              path: filePath,
              folderList: subList
            }

            list.push(directory);
          }
          else {
            const file: File = {
              isDirectory: false,
              isFile: true,
              ext: path.extname(filePath),
              path: filePath
            }

            list.push(file);
          }
        })
      }

      statDirectory(filePath, folderList, 0);

      resolve(folderList);
    })
  }


}

