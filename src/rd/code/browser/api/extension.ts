
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

export const useGroupExtensionsApi = asynced<UseGroupExtensionsApi>(async payload => {
  return rApiPost('/rx/ext/use_group', {
    data: payload
  })
})


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

export const useExtensionsApi = asynced<UseExtensionsApi>(async payload => {
  return rApiPost('/rx/ext/use', {
    data: payload
  })
})


export interface UseExtensionHeartbeatVoucher {
  extension_id: number;
  extension_uuid: string;
  script_hash: string;
}


export interface UseExtensionHeartbeatApiPayload {
  vouchers: UseExtensionHeartbeatVoucher[];
}

export type UseExtensionHeartbeatApiResponse = number[];

export type UseExtensionHeartbeatApi = (payload: UseExtensionHeartbeatApiPayload) => RApiPromiseLike<UseExtensionHeartbeatApiResponse>;

export const useExtensionHeartbeatApi = asynced<UseExtensionHeartbeatApi>(async payload => {
  return rApiPost('/rx/ext/heartbeat', {
    data: payload
  })
})
