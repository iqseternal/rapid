
/** 二进制流数据自定义 */
declare type BinaryLike = BinaryData | string;

/** 资源定义 */
declare type Source = {
  t: number; // 资源获取时间戳, 根据时间戳指定文件名

  type: string; // 资源类型, 当使用 Service 的时候会识别

  src: string; // 资源 SRC, URL资源定位地址

  source: string; // 资源的源地址, 例如: https://www.baidu.com

  isOnline: boolean; // 是否是网络资源

  local?: string; // 当资源已经被下载了之后, local 为本地的 PATH 地址
};
