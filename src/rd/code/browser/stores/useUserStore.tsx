import type { UseStoreType } from './declare';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { innerSelector } from './declare';
import { toNil } from '@suey/pkg-utils';
import { logoutApi } from '../api';

export interface UserStore {
	userinfo?: {
		roles?: string[];
		id?: number;
		username?: string;
	};
	accessToken: string;
}

export interface UseUserStore extends UseStoreType<UserStore> {
	getAccessToken: () => Promise<string>;
	setAccessToken: (accessToken: string) => Promise<void>;

	logout: () => Promise<void>;
}

const innerStoreDefaultState: UserStore = {
	userinfo: void 0,
	accessToken: ''
}

const innerStore = create<UserStore>()(
	persist(
		immer(() => innerStoreDefaultState
	),
	{
		name: 'userStore',
		storage: createJSONStorage(() => window.sessionStorage)
	}
));

const useUserStore: UseUserStore = (selector) => innerSelector.useZustandSelector(innerStore, selector);

useUserStore.getState = () => innerStore.getState();

useUserStore.init = async () => {
	const accessToken = await injector.stores.appStore.get('accessToken');
	if (accessToken !== innerStore.getState().accessToken) innerStore.setState({ accessToken: accessToken });
}

useUserStore.getAccessToken = async () => {
	const accessToken = await injector.stores.appStore.get('accessToken');
	if (accessToken !== innerStore.getState().accessToken) innerStore.setState({ accessToken: accessToken });
	return accessToken;
}

useUserStore.setAccessToken = async (accessToken: string) => {
	const [err, res] = await toNil(injector.stores.appStore.set('accessToken', accessToken));
	if (err) return Promise.reject(err);
	innerStore.setState({ accessToken });
	return res;
}

useUserStore.logout = async () => {
	await toNil(logoutApi({}));
}

export { useUserStore }
