

const user = {

}

export const useUserHook = () => {

  const readonlyUser = new Proxy(user, {

    get(target, p, receiver) {
      return Reflect.get(target, p, receiver);
    },

    /**
     * 不允许修改
     */
    set(target, p, newValue, receiver) {


      return false;
    },
  })

  return { user };
}
