import { isNull, isNumber, isObject, isString } from '@suey/pkg-utils';
import { PakoService } from './PakoService';
import { Printer } from '@suey/printer';
import * as fs from 'fs';

export type ConvertDataType = string | number | Uint8Array | Buffer | object | Blob;

/**
 * 数据格式转换类, 在 ts 类型约束的前提下, 保证数据进行合适的转换
 *
 * 保证项目中对文件操作后进行转换时, 保持一致的使用 该类
 *
 */
export class ConvertService<Data extends ConvertDataType = Exclude<ConvertDataType, Blob>> {
  constructor(private readonly data: Data) {}

  /**
   * 将目标数据转换为一个合适的 string
   * @param data
   */
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

  toString() {
    return ConvertService.toString(this.data);
  }

  /**
   * 将目标数据转化为一个合适的 json 对象以供使用
   * @param data
   */
  static toJson<Resp extends any, Data extends ConvertDataType = ConvertDataType>(data: Data): Data extends Blob ?  Promise<Resp> : Resp;
  static toJson<Resp extends any, Data extends ConvertDataType = ConvertDataType>(data: Data): Promise<Resp> | Resp {
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

    return JSON.parse(data.toString());
  }

  toJson<Resp extends any>() {
    return ConvertService.toJson<Resp, typeof this.data>(this.data);
  }

  /**
   * 将目标转化为一个 buffer 对象
   * @param data
   * @param options 当数据为字符串的时候才生效
   */
  static toBuffer<Data extends ConvertDataType>(data: Data, options?: BufferEncoding): Data extends Blob ? Promise<Buffer> : Buffer;
  static toBuffer<Data extends ConvertDataType>(data: Data, options?: BufferEncoding): Promise<Buffer> | Buffer {
    if (data instanceof Blob) {
      return new Promise<Buffer>(async (resolve, reject) => {
        (data as Blob).arrayBuffer().then(buffer => {
          resolve(Buffer.from(buffer));
        }).catch(reject);
      })
    }

    if (isString(data)) return Buffer.from(data, options);
    if (isNumber(data)) return Buffer.from(data.toString(), options);

    if (data instanceof Buffer) return data;
    if (data instanceof Uint8Array) return Buffer.from(data);

    return Buffer.from(JSON.stringify(data), options);
  }

  /**
   *
   * @param options 仅当数据为字符串时候生效
   * @returns
   */
  toBuffer(options?: BufferEncoding) {
    return ConvertService.toBuffer(this.data, options);
  }

  /**
   * 将目标转化为一个 uint8Array
   * @param data
   */
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

    return Uint8Array.from(ConvertService.toBuffer(data as Exclude<Data, Blob>));
  }

  toUint8Array() {
    return ConvertService.toUint8Array(this.data);
  }

  /**
   * 将目标转化为一个二进制对象
   * @param data
   */
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

    return new Blob([ConvertService.toString(data as Exclude<Data, Blob>)]);
  }

  toBlob() {
    return ConvertService.toBlob(this.data);
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
        ConvertService.toBuffer(data).then(res => {
          resolve(PakoService.deflateRaw(res));
        }).catch(reject);
      })
    }

    return PakoService.deflateRaw(ConvertService.toBuffer(data as Exclude<ConvertDataType, Blob>));
  }

  toDeflate() {
    return ConvertService.toDeflate(this.data);
  }

  /**
   * 对数据进行解压缩, 调用前希望保证是一个合格的 uint8Array, 并且是由 toDeflate 产出
   * @param data
   */
  static toInflate<Data extends ConvertDataType>(data: Data): Data extends Blob ? Promise<string> : string;
  static toInflate<Data extends ConvertDataType>(data: Data): Promise<string> | string {
    if (data instanceof Uint8Array) return PakoService.inflateRaw(data);

    if (data instanceof Blob) return new Promise(async (resolve, reject) => {
      ConvertService.toUint8Array(data).then(res => {
        resolve(PakoService.inflateRaw(res));
      }).catch(reject);
    })
    else return PakoService.inflateRaw(ConvertService.toUint8Array(data as Exclude<Data, Blob>));
  }

  toInflate() {
    return ConvertService.toInflate(this.data);
  }
}
