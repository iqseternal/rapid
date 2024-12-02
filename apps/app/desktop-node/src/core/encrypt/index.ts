
import { aesDecryptAlgorithm, aesEncryptAlgorithm, rsaEncryptAlgorithm } from '@rapid/libs';

export const aes = () => {

  return aesEncryptAlgorithm('sdada', 'asd');
}

export const des = () => {



  return aesDecryptAlgorithm('sdada', 'asd');
}


export const rsaEncrypt = (algorithm: string, data: string): string => {
  return rsaEncryptAlgorithm(algorithm, data);
}
