
import { RSA_PUBLIC_KEY, AES_KEY } from '#/constants';

import { rsaEncryptAlgorithm, aesEncryptAlgorithm, aesDecryptAlgorithm, md5Encrypt } from '@suey/pkg-utils';

export const rsaEncrypt = (value: string) => rsaEncryptAlgorithm(value, RSA_PUBLIC_KEY);

export const aesEncrypt = (value: string) => aesEncryptAlgorithm(value, AES_KEY);
export const aesDecrypt = (value: string) => aesDecryptAlgorithm(value, AES_KEY);

export { md5Encrypt };
