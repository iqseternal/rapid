
import { rApiGet, rApiPost } from 'rd/base/common/api';
import type { RApiPromiseLike } from 'rd/base/common/api';
import { asynced } from '@suey/pkg-utils';

export interface UseGroupExtensionsApiPayload {
  extension_group_id: number;
  extension_group_uuid: string;
}

export interface UseGroupExtensionsApiStruct {
  extension_group_id: number;
  extension_group_uuid: string;
  extension_group_name: string;
  extension_id: number;
  extension_uuid: string;
  extension_name: string;
  extension_version_id: number;
  metadata: {} | null;
  script_content: string;
  script_hash: string;
  use_version: number;
  version: number;
}

export type UseGroupExtensionsApiResponse = UseGroupExtensionsApiStruct[];

export type UseGroupExtensionsApi = (payload: UseGroupExtensionsApiPayload) => RApiPromiseLike<UseGroupExtensionsApiResponse>;

/**
 * 获取某个 扩展组 中地插件内容进行对接
 */
export const useGroupExtensionsApi = asynced<UseGroupExtensionsApi>(async payload => {
  return rApiPost('/rx/ext/use_group', {
    data: payload
  })
})

/**
 * 扩展凭证
 */
export interface UseExtensionVoucher {
  extension_id: number;
  extension_uuid: string;
}

export interface UseExtensionsApiPayload {
  vouchers: UseExtensionVoucher[];
}

export interface UseExtensionsApiStruct {
  extension_group_id: number;
  extension_group_uuid: string;
  extension_group_name: string;
  extension_id: number;
  extension_uuid: string;
  extension_name: string;
  extension_version_id: number;
  metadata: {} | null;
  script_content: string;
  script_hash: string;
  use_version: number;
  version: number;
}

export type UseExtensionsApiResponse = UseExtensionsApiStruct[];

export type UseExtensionsApi = (payload: UseExtensionsApiPayload) => RApiPromiseLike<UseExtensionsApiResponse>;

/**
 * 对接使用某组扩展内容, 需要提供插件 id 与 uuid 以此作为凭证获取扩展内容
 */
export const useExtensionsApi = asynced<UseExtensionsApi>(async payload => {
  return rApiPost('/rx/ext/use', {
    data: payload
  })
})

/**
 * 对接扩展心跳机制地凭证
 */
export interface UseExtensionHeartbeatVoucher {
  extension_id: number;
  extension_uuid: string;
  /**
   * 扩展内容 hash 值
   */
  script_hash: string;
}


export interface UseExtensionHeartbeatApiPayload {
  vouchers: UseExtensionHeartbeatVoucher[];
}

export type UseExtensionHeartbeatApiResponse = number[];

export type UseExtensionHeartbeatApi = (payload: UseExtensionHeartbeatApiPayload) => RApiPromiseLike<UseExtensionHeartbeatApiResponse>;

/**
 * 对接扩展心跳机制
 */
export const useExtensionHeartbeatApi = asynced<UseExtensionHeartbeatApi>(async payload => {
  return rApiPost('/rx/ext/heartbeat', {
    data: payload
  })
})
