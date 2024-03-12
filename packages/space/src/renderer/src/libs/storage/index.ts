
import { loGet, loSet, loClear, loRemove } from '@suey/pkg-web';

const TOKEN_KEY = '__token__';

export const getToken = (decrypt = false) => loGet<string>(TOKEN_KEY);

export const setToken = (value: string) => loSet(TOKEN_KEY, value);

export const removeToken = () => loRemove(TOKEN_KEY);




export {
  loGet, loSet, loRemove, loClear,
  seGet, seSet, seRemove, seClear,
  ckGet, ckSet, ckRemove
} from '@suey/pkg-web';
