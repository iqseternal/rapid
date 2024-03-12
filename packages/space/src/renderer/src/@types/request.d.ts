

/**
 * 请求 hconfig 配置
 */
interface HConfig {
  needAuth?: boolean;
}

/**
 * 基本响应结构体的内容
 */
interface BasicResponse {
  status: number;
  flag: string;
  data: any;
  more?: {
    pako?: boolean;
  }
}
