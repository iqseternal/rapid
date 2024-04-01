import { join } from 'path';
import { DownloadService } from './DownloadService';
import { PrinterService } from './PrinterService';

import * as fs from 'fs';
import { Printer } from '@suey/printer';

/**
 * 文件服务, 为应用程序的文件服务
 */
export class FileService {
  static isSameExt(file1: string, file2: string) {
    const ext1 = file1.split('.').pop() || '';
    const ext2 = file2.split('.').pop() || '';
    return ext1.toLowerCase() === ext2.toLowerCase();
  }

  static saveFile(filePath: string, content: any, options?: Parameters<typeof fs.createWriteStream>[1]) {
    const writeStream = fs.createWriteStream(filePath, options);
    return new Promise<void>((resolve, reject) => {
      writeStream.write(content, (err) => {
        if (err) reject(err);
        resolve();
      });
    })
  }

  static readFile(filePath: string) {
    return new Promise<string | Buffer>((resolve, reject) => {
      const content = fs.readFileSync(filePath);
      resolve(content);
    });
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

    type File = { isFile: true, isDirectory: false, ext: string, path: string };
    type Directory = { isFile: false, isDirectory: true, path: string, folderList: (File | Directory)[]; };

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
          if (!fs.existsSync(join(dir, file))) return;
          const filePath = fs.realpathSync(join(dir, file));

          if (!fs.existsSync(filePath)) return;
          if (!filePath.includes(join(dir))) return;
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
              ext: filePath.split('.').pop() || '',
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



  /**
   * 创建文件夹, 会递归创建, 请调用时确认文件夹地址是否符合您的要求
   * @param {string} dir
   * @returns
   */
  static mkDir(dir: string): Promise<void> {
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
   * 复制文件, 将指定文件复制到指定文件夹目录
   * @param sourceSrc
   * @param distSrc
   * @returns
   */
  static copyFile(sourceSrc: string, distSrc: string): Promise<{
    ok: boolean; // 状态
    descriptor: string; // 描述
  }> {
    return new Promise(async (resolve, reject) => {
      const distDir = distSrc.substring(0, distSrc.lastIndexOf('\\'));

      if (!fs.existsSync(distDir)) {
        await FileService.mkDir(distDir);

        reject({
          ok: false,
          descriptor: '自动创建目标文件夹失败'
        });

        return;
      }

      if (fs.existsSync(distSrc)) {
        reject({
          ok: false,
          descriptor: '目标文件已经存在'
        });

        return;
      }

      fs.copyFile(sourceSrc, distSrc, (error) => {
        if (error) {
          reject({
            ok: false,
            descriptor: '复制文件出现临时错误'
          });
          return;
        }

        resolve({
          ok: true,
          descriptor: 'ok'
        });
      });
    });
  }

  /**
   * 将对象按照规范写入指定JSON文件
   * @param object
   * @param distPath
   * @returns
   */
  static saveObjToJson<T extends Object>(object: T, distPath: string) {
    if (!distPath.endsWith('.json')) {
      PrinterService.printError('FileService.saveObjToJson 的指定路径不是一个JSON文件');
      return Promise.reject();
    }
    return FileService.saveUtf8ToFile(JSON.stringify(object, null, 2), distPath);
  }

  /**
   * 按照UTF-8的格式将字符写入指定路径
   * @param str
   * @param distPath
   * @returns
   */
  static saveUtf8ToFile(str: string, distPath: string) {
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(distPath);

      writeStream.write(str, 'utf-8', (err) => {
        if (err) reject(err);
      })

      resolve(distPath);
    });
  }

  /**
   * 将二进制流保存到文件地址
   * @param bin
   * @param distPath
   * @returns
   */
  static saveBinToFile(bin: BinaryLike, distPath: string) {
    return new Promise<string>((resolve, reject) => {
      const writeStream = fs.createWriteStream(distPath);

      writeStream.write(bin, 'binary', (err) => {
        writeStream.close();
        if (err) {
          reject(err);
          return;
        }
        resolve(distPath);
      })
    });
  }

  /**
   * 将指定URL文件下载并保存到指定文件地址
   * @param url
   * @param distPath
   * @returns
   */
  static saveUrlToFile(url: string, distPath: string) {
    return DownloadService.downloadForLocal(url, distPath);
  }

  /**
   * 移动文件, 改操作是先复制指定文件到文件夹目录, 然后再删除这个文件
   * @param sourcePath
   * @param distDir
   * @returns
   */
  static moveFile(sourcePath: string, distDir: string) {
    return new Promise((resolve, reject) => {
      FileService.copyFile(sourcePath, distDir).then(() => {
        FileService.deleteFile(sourcePath).then(resolve).catch(reject);
      }).catch(reject);
    })
  }

  /**
   * 删除指定文件
   * @param sourcePath
   * @returns
   */
  static deleteFile(sourcePath: string) {
    return new Promise((resolve, reject) => {
      fs.unlink(sourcePath, err => {
        if (err) {
          reject(err);
          return;
        }
        resolve(sourcePath);
      })
    })
  }

  /**
   * 在某个文件夹下查找某个指定名称的文件, 可指定是否是模糊查询
   * @param fileName
   * @param dir
   * @param options
   * @returns
   */
  static findFile(fileName: string, dir: string, options = {
    isLike: false
  }) {
    return new Promise(async (resolve, reject) => {
      const findRes: string[] = [];

      async function readdir(dir: string) {
        return new Promise<void>((o, j) => {
          fs.readdir(dir, (err, fileList) => {
            if (err) {
              j();
              return;
            }

            fileList.forEach(path => {
              const curPath = dir + '\\' + path;

              try {
                const data = fs.statSync(curPath);

                if (data.isDirectory()) {
                  readdir(curPath);
                  return;
                }

                if (options.isLike) {
                  if (path.includes(fileName) || fileName.includes(path)) {
                    findRes.push(curPath);
                  }
                }
                else {
                  if (path === fileName) { // 查找到了
                    findRes.push(curPath);
                  }
                }

              } catch { }
            });

            o();
          });
        })
      }

      await readdir(dir).catch(er => er);

      resolve(findRes);
    });
  }
}

