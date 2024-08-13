import { inflate, inflateRaw, deflate, deflateRaw, gzip, ungzip } from 'pako';

export type PakoData = Uint8Array | ArrayBuffer;

/**
 * 压缩服务
 */
export class PakoService {
  public static inflate(data: PakoData) {
    return inflate(data, { to: 'string' });
  }

  public static inflateRaw(data: PakoData) {
    return inflateRaw(data, { to: 'string' });
  }

  public static deflate(data: PakoData | string) {
    return deflate(data);
  }

  public static deflateRaw(data: PakoData | string) {
    return deflateRaw(data);
  }

  public static gzip(data: PakoData | string) {
    return gzip(data);
  }

  public static ungzip(data: PakoData) {
    return ungzip(data);
  }
}
