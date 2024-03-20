

export const runAndErrorCallback = async (runFn: () => void | Promise<void>, failedFn?: (e: Error) => void) => {
  return Promise.resolve(runFn()).catch((err) => {
    failedFn?.(err);

    return err;
  });
}
