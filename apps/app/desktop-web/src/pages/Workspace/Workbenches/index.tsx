import { memo, useEffect } from 'react';
import { Tldraw, useEditor } from 'tldraw';
import { FullSize } from '@rapid/libs-web';
import { polotnoMutations, useTldrawStore } from '@/features';
import { ErrorShapeUtil, StickerTool, tools, Brush, Scribble, SnapIndicator, Toolbar, InFrontOfTheCanvas, KeyboardShortcutsDialog, MainMenu, PageMenu } from '@/tldraw';
import { getAssetUrlsByMetaUrl } from '@tldraw/assets/urls';

import './tldraw.scss';

export const Workbenches = memo(() => {
  const tlShapes = useTldrawStore(store => store.tlShapeUtils);
	const tlTools = useTldrawStore(store => store.tlTools);
	const tlUiOverrides = useTldrawStore(store => store.tlUiOverrides);
	const tlComponents = useTldrawStore(store => store.tlComponents);

	useEffect(() => {
		const unregisterBrush = polotnoMutations.registerComponent('Brush', Brush);
		const unregisterScribble = polotnoMutations.registerComponent('Scribble', Scribble);
		const unregisterSnapIndicator = polotnoMutations.registerComponent('SnapIndicator', SnapIndicator);
		const unregisterToolbar = polotnoMutations.registerComponent('Toolbar', Toolbar);
		const unregisterInFrontOfTheCanvas = polotnoMutations.registerComponent('InFrontOfTheCanvas', InFrontOfTheCanvas);
		const unregisterKeyboardShortcutsDialog = polotnoMutations.registerComponent('KeyboardShortcutsDialog', KeyboardShortcutsDialog);
		const unregisterMainMenu = polotnoMutations.registerComponent('MainMenu', MainMenu);
		const unregisterPageMenu = polotnoMutations.registerComponent('PageMenu', PageMenu);

		const unregisterShapeList = polotnoMutations.registerUiOverride('tools', tools);
		const unregisterStickerTool = polotnoMutations.registerTool(StickerTool);

		const unregisterErrorShapeUtil = polotnoMutations.registerShapeUtil(ErrorShapeUtil);

		return () => {
			unregisterBrush();
			unregisterScribble();
			unregisterSnapIndicator();
			unregisterToolbar();
			unregisterInFrontOfTheCanvas();
			unregisterKeyboardShortcutsDialog();
			unregisterMainMenu();
			unregisterPageMenu();

			unregisterShapeList();

			unregisterStickerTool();

			unregisterErrorShapeUtil();
		}
	}, []);

	return (
		<FullSize>
      <Tldraw
        shapeUtils={tlShapes}
        tools={tlTools}
        initialState='sticker'
				persistenceKey='tldraw'
        overrides={tlUiOverrides}
        components={tlComponents}
				assetUrls={getAssetUrlsByMetaUrl()}
        isShapeHidden={(s) => !!s.meta.hidden}
      />
    </FullSize>
  )
})

export default Workbenches;
