import { isNull, isNumber, isObject, isString } from '@suey/pkg-utils';
import * as pako from 'pako';
import * as fs from 'fs';

export type ConvertDataType = string | number | Uint8Array | Buffer | object | Blob;

export class ConvertDataService {
  static toString<Data extends ConvertDataType>(data: Data): Data extends Blob ? Promise<string> : string;
  static toString<Data extends ConvertDataType>(data: Data): string | Promise<string> {
    if (isString(data)) return data;
    if (isNumber(data)) return data.toString();

    if (data instanceof Blob) {
      return new Promise(async (resolve, reject) => {
        (data as Blob).arrayBuffer().then(buffer => {
          resolve(Buffer.from(buffer).toString());
        }).catch(reject);
      })
    }

    if (data instanceof Buffer) return (data as Buffer).toString();
    if (data instanceof Uint8Array) return Buffer.from((data as Uint8Array).buffer).toString();
    return JSON.stringify(data);
  }

  static toJson<Resp extends any, Data extends ConvertDataType>(data: Data): Data extends Blob ?  Promise<Resp> : Resp;
  static toJson<Resp extends any, Data extends ConvertDataType>(data: Data): Promise<Resp> | Resp {
    if (data instanceof Blob) {
      return new Promise<Resp>(async (resolve, reject) => {
        (data as Blob).arrayBuffer().then(buffer => {
          resolve(Buffer.from(buffer).toJSON() as unknown as Resp);
        }).catch(reject);
      })
    }

    if (isString(data)) return JSON.parse(data);
    if (isNumber(data)) return JSON.parse(data.toString());

    if (data instanceof Buffer) return JSON.parse((data as Buffer).toString());
    if (data instanceof Uint8Array) return JSON.parse(Buffer.from((data as Uint8Array).buffer).toString());

    return data as unknown as Resp;
  }

  static toBuffer<Data extends ConvertDataType>(data: Data): Data extends Blob ? Promise<Buffer> : Buffer;
  static toBuffer<Data extends ConvertDataType>(data: Data): Promise<Buffer> | Buffer {
    if (data instanceof Blob) {
      return new Promise<Buffer>(async (resolve, reject) => {
        (data as Blob).arrayBuffer().then(buffer => {
          resolve(Buffer.from(buffer));
        }).catch(reject);
      })
    }

    if (isString(data)) return Buffer.from(data);
    if (isNumber(data)) return Buffer.from(data.toString());

    if (data instanceof Buffer) return data;
    if (data instanceof Uint8Array) return Buffer.from(data);

    if (isObject(data)) return Buffer.from(JSON.stringify(data));

    return Buffer.from(data);
  }

  static toUint8Array<Data extends ConvertDataType>(data: Data): Data extends Blob ? Promise<Uint8Array> : Uint8Array;
  static toUint8Array<Data extends ConvertDataType>(data: Data): Promise<Uint8Array> | Uint8Array {
    if (data instanceof Blob) {
      return new Promise<Uint8Array>(async (resolve, reject) => {
        (data as Blob).arrayBuffer().then(buffer => {
          resolve(Uint8Array.from(Buffer.from(buffer)));
        }).catch(reject);
      })
    }

    if (isString(data)) return Uint8Array.from(Buffer.from(data));
    if (isNumber(data)) return Uint8Array.from(Buffer.from(data.toString()));

    if (data instanceof Buffer) return Uint8Array.from(data);
    if (data instanceof Uint8Array) return data;

    return Uint8Array.from(ConvertDataService.toBuffer(data as Exclude<ConvertDataService, Blob>));
  }

  static toBlob<Data extends ConvertDataType>(data: Data): Data extends Blob ? Promise<Blob> : Blob;
  static toBlob<Data extends ConvertDataType>(data: Data): Promise<Blob> | Blob {
    if (data instanceof Blob) {
      return new Promise<Blob>(async (resolve, reject) => {
        (data as Blob).arrayBuffer().then(buffer => {
          resolve(new Blob([Buffer.from(buffer)]));
        }).catch(reject);
      })
    }

    if (isString(data)) return new Blob([data]);
    if (isNumber(data)) return new Blob([data.toString()]);

    if (data instanceof Buffer) return new Blob([data])
    if (data instanceof Uint8Array) return new Blob([data]);

    return new Blob([ConvertDataService.toString(data as Exclude<Data, Blob>)]);
  }

  /**
   * 对数据进行压缩, 输出 uint8Array, 当前已经被压缩，如果直接进行数据格式转换会出现错误.
   * 如需进行其他数据格式转换，需要先解压缩
   * @param data
   */
  static toDeflate<Data extends ConvertDataType>(data: Data): Data extends Blob ? Promise<Uint8Array> : Uint8Array;
  static toDeflate<Data extends ConvertDataType>(data: Data): Promise<Uint8Array> | Uint8Array {
    if (data instanceof Blob) {
      return new Promise(async (resolve, reject) => {
        ConvertDataService.toBuffer(data).then(res => {
          resolve(pako.deflate(res));
        }).catch(reject);
      })
    }

    return pako.deflateRaw(ConvertDataService.toBuffer(data as Exclude<ConvertDataType, Blob>));
  }

  /**
   * 对数据进行解压缩, 调用前希望保证是一个合格的 uint8Array, 并且是由 toDeflate 产出
   * @param data
   */
  static toInflate<Data extends ConvertDataType>(data: Data): Data extends Blob ? Promise<string> : string;
  static toInflate<Data extends ConvertDataType>(data: Data): Promise<string> | string {
    if (data instanceof Uint8Array) return pako.inflateRaw(data, { to: 'string' });

    if (data instanceof Blob) return new Promise(async (resolve, reject) => {
      ConvertDataService.toUint8Array(data).then(res => {
        resolve(pako.inflateRaw(res, { to: 'string' }));
      }).catch(reject);
    })
    else return pako.inflateRaw(ConvertDataService.toUint8Array(data as Exclude<Data, Blob>), { to: 'string' });
  }
}

const str = {
  a: 1,
  b: 'asdsds',
  c: [
    '1'
  ],
  d: {

  }
}

;(async () => {
  fs.writeFileSync('./test.rd', ConvertDataService.toDeflate(str));

  const data = fs.readFileSync('./test.rd');

  console.log(ConvertDataService.toBuffer(str));
  console.log(ConvertDataService.toBuffer(ConvertDataService.toInflate(data)));
})();
