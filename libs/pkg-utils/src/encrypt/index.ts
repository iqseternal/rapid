import * as sCryptoTs from 'crypto-ts';

import * as sTsMd5 from 'ts-md5';

import * as sJose from 'jose';

import sjsr from 'jsrsasign';

import sforge from 'node-forge';

/**
 * ts-md5
 *
 * @description
 * nodejs/浏览器
 *
 * @description
 * TypeScript 的 MD5 实现
 *
 * 可以处理 Unicode 字符串
 * 支持增量哈希
 * 使用文件和 Blob
 * 此库还包括用于以下方面的工具：
 *
 * 对文件或 blob 进行哈希处理
 * 用于执行哈希的 Web Worker
 * 一个 webworker 处理程序，用于请求对文件或 blob 进行哈希处理
 * 基于 Promise
 * 文件或 blob 排队等待在 WebWorker 上处理
 *
 * @see
 * <p>仓库: https://www.npmjs.com/package/ts-md5</p>
 * <p>算法: https://www.myersdaily.org/joseph/javascript/md5-text.html</p>
 */
export const tsMd5 = sTsMd5;

/**
 * node-forge
 *
 * @description
 * nodejs/浏览器
 *
 * @description
 * Forge 软件是 TLS 协议的完全原生实现 在 JavaScript 中，一组加密实用程序和一组用于 开发利用大量网络资源的 Web 应用程序。
 *
 * @see
 * <p>仓库: https://www.npmjs.com/package/node-forge</p>
 * <p>Github & Doc: https://github.com/digitalbazaar/forge/tree/main?tab=readme-ov-file#installation</p>
 */
export const forge = sforge;

/**
 * jsrsasign
 *
 * @description
 * nodejs/浏览器
 *
 * @description
 * “jsrsasign”（RSA-Sign JavaScript 库）是一个开源的免费加密库，支持纯 JavaScript 中的 RSA/RSAPSS/ECDSA/DSA 签名/验证、ASN.1、PKCS#1/5/8 私钥/公钥、X.509 证书、CRL、OCSP、CMS SignedData、TimeStamp、CAdES JSON Web 签名/令牌/密钥。
 *
 * @see
 * <p>仓库: https://www.npmjs.com/package/jsrsasign</p>
 * <p>Home: https://kjur.github.io/jsrsasign/</p>
 * <p>文档: https://kjur.github.io/jsrsasign/api/
 */
export const jsr = sjsr;

/**
 * jose
 *
 * @description
 * nodejs/浏览器
 *
 * @description
 * jose是用于 JSON 对象签名和加密的 JavaScript 模块，支持 JSON Web 令牌 （JWT）、JSON Web 签名 （JWS）、JSON Web 加密 （JWE）、JSON Web 密钥 （JWK）、JSON Web 密钥集 （JWKS） 等。
 * 该模块旨在跨各种 Web 互操作运行时工作，包括 Node.js、浏览器、Cloudflare Workers、Deno、Bun 等。
 *
 * @see
 * <p>仓库: https://www.npmjs.com/package/jose</p>
 * <p>文档: https://github.com/panva/jose/blob/HEAD/docs/jwt/verify/functions/jwtVerify.md
 */
export const jose = sJose;

/**
 * crypto-ts
 *
 * @description
 * nodejs/浏览器
 *
 * @description
 * 加密标准的 Typescript 库。准备好与 Angular 和其他现代 typescript 框架结合使用 AOT 和 treeshaking。
 *
 * @see
 * <p>仓库: https://www.npmjs.com/package/crypto-ts</p>
 */
export const cryptoTs = sCryptoTs;

/**
 * AES 加密结果
 */
export type CipherParams = ReturnType<typeof cryptoTs.AES.encrypt>;

/**
 * word 字面量
 */
export type WordArray = Exclude<Parameters<typeof cryptoTs.AES.encrypt>[0], string>;

/**
 * 加密配置
 */
export type BufferedBlockAlgorithmConfig = Parameters<typeof cryptoTs.AES.encrypt>[2];

/**
 * AES 加密算法
 */
export const aesEncryptAlgorithm = cryptoTs.AES.encrypt;

/**
 * AES 解密算法
 */
export const aesDecryptAlgorithm = cryptoTs.AES.decrypt;

/**
 * 预设默认加密字面量
 */
export const AES_DEFAULT_KEY = `crypto-ts` as string;

/**
 * aes 加密
 */
export const aesEncrypt = <Data extends (string | WordArray)>(data: Data, key: string | WordArray = AES_DEFAULT_KEY, config?: BufferedBlockAlgorithmConfig): CipherParams => aesEncryptAlgorithm(data, key, config);

/**
 * aes 解密
 */
export const aesDecrypt = <Data extends (string | CipherParams)>(data: Data, key: string | WordArray = AES_DEFAULT_KEY, config?: BufferedBlockAlgorithmConfig): WordArray => aesDecryptAlgorithm(data, key, config);


