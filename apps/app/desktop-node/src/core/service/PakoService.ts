import { inflate, inflateRaw, deflate, deflateRaw, gzip, ungzip } from 'pako';

export type PakoData = Uint8Array | ArrayBuffer;

/**
 * 压缩服务
 */
export class PakoService {
  /**
   * 解压数据 `pako.inflate`
   */
  public static inflate(data: PakoData) {
    return inflate(data, { to: 'string' });
  }

  /**
   * 解压数据 `pako.inflateRaw`
   */
  public static inflateRaw(data: PakoData) {
    return inflateRaw(data, { to: 'string' });
  }

  /**
   * 压缩数据 `pako.deflate`
   */
  public static deflate(data: PakoData | string) {
    return deflate(data);
  }

  /**
   * 压缩数据 `pako.deflateRaw`
   */
  public static deflateRaw(data: PakoData | string) {
    return deflateRaw(data);
  }

  /**
   * 压缩数据 `pako.gzip`
   */
  public static gzip(data: PakoData | string) {
    return gzip(data);
  }

  /**
   * 压缩数据 `pako.ungzip`
   */
  public static ungzip(data: PakoData) {
    return ungzip(data);
  }
}
