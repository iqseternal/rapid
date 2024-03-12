import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getToken, removeToken, setToken } from '@libs/storage';
import { apiUrl, apiPost } from '@renderer/api';
import type { RouteRecordRaw } from 'vue-router';
import store from '@renderer/store';

export const USER_STORE_NAME = 'userStore';

export const useUserStore = defineStore(USER_STORE_NAME, () => {
  const token = ref<string>(getToken() || '');
  const roles = ref<string[]>([]);
  const username = ref<string>('');
  const routes = ref<RouteRecordRaw[]>([]);

  /** 设置用户路由 */
  const setRoutes = (value: RouteRecordRaw[]) => { routes.value = value; };

  /** 设置角色数组 */
  const setRoles = (value: string[]) => { roles.value = value };

  /** 获取用户详情 */
  const getInfo = () => {
    return new Promise((resolve, reject) => {
      apiPost<any>(apiUrl.getUserinfo)
        .then((res) => {
          const data = res.data
          username.value = data.username
          roles.value = data.roles
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 登录 */
  const login = (loginData) => {
    return new Promise((resolve, reject) => {
      apiPost<any>(apiUrl.login, {
        data: {
          username: loginData.username,
          password: loginData.password,
          code: loginData.code
        }
      }).then((res) => {
        setToken(res.data.userinfo.token)
        token.value = res.data.token
        resolve(true)
      }).catch((error) => reject(error))
    })
  }

  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ''
    roles.value = []
  }

  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ''
    roles.value = []
  }

  return { routes, setRoutes, token, roles, username, setRoles, login, getInfo, logout, resetToken };
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}


