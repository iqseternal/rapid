import { Nil, asynced, toNil, toNils } from './index';
import { randomRegionForInt } from '../random';
import type { RPromiseLike } from '../types';

describe('promise解析函数: toNil and toNils', () => {
  describe('toNil', () => {
    test('是否正确处理返回值', async () => {
      {
        const [err, res] = await toNil(Promise.resolve(1));
        expect(err).toBeUndefined();
        expect(res).toBe(1);
      }
      {
        const [err, res] = await toNil(Promise.reject('custom error'));
        expect(err?.reason).toBe('custom error');
        expect(res).toBeUndefined();
      }
    });

    test('默认错误是否是 Error 实例', async () => {
      {
        const errorInstance = new Error('Test error');
        const [err, res] = await toNil(Promise.reject(errorInstance));
        expect(Nil.isNilRefusedReason(err)).toEqual(true);
        expect(err?.reason).toBe(errorInstance);
        expect(res).toBeUndefined();
      }
      {
        const [err, res] = await toNil(Promise.reject(undefined));
        if (err) {
          expect(Nil.isNilRefusedReason(err)).toEqual(true);
          expect(err.reason).toBe(void 0);
          expect(res).toBeUndefined();
        }
      }
      {
        const [err, res] = await toNil(Promise.reject(null));
        if (err) {
          expect(Nil.isNilRefusedReason(err)).toEqual(true);
          expect(err.reason).toBe(null);
          expect(res).toBeUndefined();
        }
      }
      {
        const [err, res] = await toNil(Promise.reject(0));
        if (err) {
          expect(Nil.isNilRefusedReason(err)).toEqual(true);
          expect(err.reason).toBe(0);
          expect(res).toBeUndefined();
        }
      }
    });
  });

  describe('toNils', () => {
    test('should resolve all promises successfully', async () => {
      const [p1, p2] = await toNils(Promise.resolve(1), Promise.resolve('a'));
      expect(p1).toEqual([undefined, 1]);
      expect(p2).toEqual([undefined, 'a']);
    });

    test('should handle mixed resolutions and rejections', async () => {
      const [p1, p2, p3] = await toNils(Promise.resolve(1), Promise.reject('error'), Promise.resolve('a'));
      expect(p1).toEqual([undefined, 1]);

      const [err, res] = p2;
      expect(Nil.isNilRefusedReason(err)).toEqual(true);
      expect(err?.reason).toEqual('error');
      expect(res).toBeUndefined();

      expect(p3).toEqual([undefined, 'a']);
    });

    test('should handle all promises being rejected', async () => {
      const [p1, p2] = await toNils(Promise.reject('error1'), Promise.reject('error2'),);
      {
        const [err, res] = p1;
        expect(Nil.isNilRefusedReason(err)).toEqual(true);
        expect(err?.reason).toEqual('error1');
        expect(res).toBeUndefined();
      }
      {
        const [err, res] = p2;
        expect(Nil.isNilRefusedReason(err)).toEqual(true);
        expect(err?.reason).toEqual('error2');
        expect(res).toBeUndefined();
      }
    });

    test('should handle empty promise array', async () => {
      const results = await toNils();
      expect(results).toEqual([]);
    });

    test('should handle rejection with no error value', async () => {
      const [p1, p2] = await toNils(Promise.reject(), Promise.reject(undefined));
      {
        const [err, res] = p1;
        expect(Nil.isNilRefusedReason(err)).toEqual(true);
        expect(err?.reason).toBeUndefined();
        expect(res).toBeUndefined();
      }
      {
        const [err, res] = p2;
        expect(Nil.isNilRefusedReason(err)).toEqual(true);
        expect(err?.reason).toBeUndefined();
        expect(res).toBeUndefined();
      }
    });

    test('should maintain promise order in results', async () => {
      const results = await toNils(Promise.resolve('first'), new Promise(resolve => setTimeout(() => resolve('second'), 10)), Promise.resolve('third'),);
      expect(results).toEqual([
        [undefined, 'first'],
        [undefined, 'second'],
        [undefined, 'third'],
      ]);
    });
  });
});

