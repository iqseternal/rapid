
import { userLogin } from '@/features';
import { retrieveRoutes } from '@router/index';
import { isNull, toPicket } from '@suey/pkg-utils';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leafer, Rect, App, UI } from 'leafer-ui';
import type { IEditorBase } from '@leafer-ui/interface';

import '@leafer-in/arrow';
import '@leafer-in/editor';
import '@leafer-in/html';
import '@leafer-in/scroll';
import '@leafer-in/state';
import '@leafer-in/text-editor';

export let leaferApp: App | null = null;

export const destroyLeaferApp = () => {
  if (isNull(leaferApp)) return;
  leaferApp.destroy(true);
}

export const initLeaferApp = (container: HTMLElement) => {
  if (!isNull(leaferApp)) destroyLeaferApp();

  leaferApp = new App({
    view: container,
    sky: {},
    tree: {},
    editor: {}
  });

  leaferApp.tree = leaferApp.addLeafer();
  leaferApp.sky = leaferApp.addLeafer({ type: 'draw', usePartRender: false });
}

export const addGraph = (json: any) => {
  leaferApp?.tree.add(UI.one(json));
}
