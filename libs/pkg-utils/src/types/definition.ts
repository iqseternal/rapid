

export interface RPromiseLike<Success, Failure extends any = any> extends Promise<Success> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which every callback is executed.
   */
  then<TResult1, TResult2 = Failure>(onfulfilled?: ((value: Success) => any) | undefined | null, onrejected?: ((reason: Failure) => TResult2 | RPromiseLike<TResult1, TResult2>) | undefined | null): RPromiseLike<TResult1, TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = Failure>(onrejected?: ((reason: Failure) => TResult | RPromiseLike<TResult, TResult>) | undefined | null): RPromiseLike<TResult, TResult>;
}
