import { lazy } from 'react';
import { makeRoute } from '@rapid/libs-web/router';
import type { CompleteRouteConfig } from '@rapid/libs-web/router';
import { ticketRoute, notFoundRoute, notRoleRoute } from './basic';

import RootLayoutWrapper from '@/layout/RootLayout';
import WorkspaceLayoutWrapper from '@/layout/WorkspaceLayout';

export const workbenchesRoute = makeRoute({
	name: `Workbenches`,
	path: `/workspace`,
	redirect: '/workspace/extensions',
	component: <WorkspaceLayoutWrapper />,
	hasErrorBoundary: true,
	errorElement: (
		<div>

		</div>
	),
	ErrorBoundary: () => {

		return (
			<div>
				工作区出现错误
			</div>
		)
	},
	children: [
		{
			name:  'WorkspaceHome',
			path: '/workspace/home',
			meta: {
				title: '主页',
				icon: 'HomeOutlined'
			},
			component: lazy(() => import('@/pages/Workspace/Home')),
		},
		{
			name:  'WorkspaceWorkstation',
			path: '/workspace/workstation',
			meta: {
				title: '工作区',
				icon: 'FileWordOutlined'
			},
			component: lazy(() => import('@/pages/Workspace/Workstation')),
		},
		{
			name: 'WorkspaceSkin',
			path: '/workspace/skin',
			meta: {
				title: '皮肤',
				icon: 'SkinOutlined',
				more: {
					hiddenInMenu: false
				}
			},
			component: lazy(() => import('@/pages/Workspace/Skin'))
		},
		{
			name: 'WorkspaceExtensions',
			path: '/workspace/extensions',
			meta: {
				title: '插件',
				icon: 'ExperimentOutlined',
				more: {
					hiddenInMenu: false
				}
			},
			component: lazy(() => import('@/pages/Workspace/Extensions'))
		}
	]
} as const);


export const [] = (workbenchesRoute as CompleteRouteConfig).children;
