
import { forge } from '@rapid/libs';

const RSA_PUBLIC_KEY: string = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCS56315ZowpncDwXZhXb4j6BHK
Gor8OZe+06s73C4H5b/Iyy/vbAzFFWsfL1y04AnNDkZ9swoFWnmYjon1XGUTvN3Z
BuLWKW9UjDCcTcno4MEhP1qrk3X0iiBeu09aJdiWogjbN4kaBq/KcKRQ5kvXdcTP
hvcDZhJI/YiPgbRW9wIDAQAB
-----END PUBLIC KEY-----
`;

/**
 * RSA 加密
 */
export const rRsaEncrypt = <V extends string>(value: V) => {
  const publicKey = forge.pki.publicKeyFromPem(RSA_PUBLIC_KEY);
  return publicKey.encrypt(value);
}
