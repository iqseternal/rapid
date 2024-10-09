
import { userLogin } from '@/features';
import { retrieveRoutes } from '@router/index';
import { isNull, toPicket } from '@suey/pkg-utils';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leafer, Rect, App, UI } from 'leafer-ui';
import { Ruler } from 'leafer-x-ruler';
import { HTMLText } from '@leafer-in/html';
import { ScrollBar } from '@leafer-in/scroll';
import { PathDrawer } from 'leafer-draw';
import { Editor, InnerEditor } from '@leafer-in/editor';
import { TextEditor } from '@leafer-in/text-editor';
import { Arrow } from '@leafer-in/arrow';
import type { IEditorBase } from '@leafer-ui/interface';

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

  const editor = new Editor() as unknown as IEditorBase;
  const arrow = new Arrow();

  leaferApp.editor = editor;

  leaferApp.startArrow = arrow.startArrow;
  leaferApp.endArrow = arrow.endArrow;
}
