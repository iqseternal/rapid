
interface IpcResponse<T = any> {
  ok: boolean; // 响应状态是否正确

  data: T; // 响应数据

  flag: string; // 响应标识字符串

  descriptor: string; // 响应描述, 错误描述
}
