
import { rApiGet, rApiPost } from 'rd/base/common/api';
import type { RApiPromiseLike } from 'rd/base/common/api';
import { asynced } from '@suey/pkg-utils';

export interface UseExtensionsApiPayload {
  extension_group_id: number;
  extension_group_uuid: string;
}

export interface UseExtensionsApiStruct {
  extension_id: number;
  extension_group_id: number;
  extension_uuid: string;
  extension_name: string;
  use_version: number;
  script_hash: string;
  metadata: {};
  description?: string;
  enabled: 0 | 1;
  status: {
    is_deleted?: boolean;
  }
  creator_id: number;
  updater_id: number;
  created_time: string;
  updated_time: string;
}

export type UseExtensionsApiResponse = UseExtensionsApiStruct[];

export type UseExtensionsApi = (payload: UseExtensionsApiPayload) => RApiPromiseLike<UseExtensionsApiResponse>;

export const useExtensionsApi = asynced<UseExtensionsApi>(async payload => {
  return rApiGet('/rx/ext/use_group', {
    params: payload
  })
})
