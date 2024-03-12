import https from 'https';
import request from 'request';
import * as fs from 'fs';

export class DownloadService {
  /**
   * 向指定的URL发送GET请求, 获取二进制值, 不建议下载大文件, 配合 FileService 使用
   * @param url
   * @returns
   */
  static downloadForBin(url: string): Promise<BinaryLike> {
    return new Promise<string>((resolve, reject) => {
      https.get(url, res => {
        if (res.statusCode !== 200) {
          reject('GET请求错误');
        }

        let data = '';

        res.setEncoding('binary');

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('error', () => {
          reject('网络错误');
        });

        res.on('pause', () => {
          reject('下载被终止了');
        });

        res.on('end', () => {
          resolve(data);
        });
      });
    })
  }

  /**
   * 直接以流形式保存文件, 可直接使用
   * @param src
   * @param distPath
   * @returns
   */
  static downloadForLocal(src: string, distPath: string) {
    return new Promise<string>((resolve, reject) => {
      const writeStream = fs.createWriteStream(distPath);

      request(src).pipe(writeStream).on('error', (err) => {
        reject(err);
      }).on('finish', () => {
        resolve(distPath);
      }).on('close', () => {
        writeStream.close();
      })
    })
  }
}

