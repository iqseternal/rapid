
import { forge } from '@rapid/libs';
import { RSA_PUBLIC_KEY } from '@rapid/config/constants';

/**
 * RSA 加密
 */
export const rRsaEncrypt = <V extends string>(value: string) => {
  const publicKey = forge.pki.publicKeyFromPem(RSA_PUBLIC_KEY);
  return publicKey.encrypt(value);
}
