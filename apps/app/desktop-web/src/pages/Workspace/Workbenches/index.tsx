import { memo, useEffect } from 'react';
import { Tldraw, useEditor, getDefaultCdnBaseUrl } from 'tldraw';
import { FullSize, useAsyncEffect } from '@rapid/libs-web';
import { tldrawStoreMutations, useTldrawStore } from '@/features';
import { ErrorShapeUtil, StickerTool, tools, Brush, Scribble, SnapIndicator, Toolbar, InFrontOfTheCanvas, KeyboardShortcutsDialog, MainMenu, PageMenu } from '@/tldraw';
import { getAssetUrls } from '@tldraw/assets/selfHosted';

import './tldraw.scss';

export const Workbenches = memo(() => {
	const tlShapes = useTldrawStore(store => store.tlShapeUtils);
	const tlTools = useTldrawStore(store => store.tlTools);
	const tlUiOverrides = useTldrawStore(store => store.tlUiOverrides);
	const tlComponents = useTldrawStore(store => store.tlComponents);

	useEffect(() => {
		const unregisterBrush = tldrawStoreMutations.registerComponent('Brush', Brush);
		const unregisterScribble = tldrawStoreMutations.registerComponent('Scribble', Scribble);
		const unregisterSnapIndicator = tldrawStoreMutations.registerComponent('SnapIndicator', SnapIndicator);
		const unregisterToolbar = tldrawStoreMutations.registerComponent('Toolbar', Toolbar);
		const unregisterInFrontOfTheCanvas = tldrawStoreMutations.registerComponent('InFrontOfTheCanvas', InFrontOfTheCanvas);
		const unregisterKeyboardShortcutsDialog = tldrawStoreMutations.registerComponent('KeyboardShortcutsDialog', KeyboardShortcutsDialog);
		const unregisterMainMenu = tldrawStoreMutations.registerComponent('MainMenu', MainMenu);
		const unregisterPageMenu = tldrawStoreMutations.registerComponent('PageMenu', PageMenu);

		const unregisterShapeList = tldrawStoreMutations.registerUiOverride('tools', tools);
		const unregisterStickerTool = tldrawStoreMutations.registerTool(StickerTool);

		const unregisterErrorShapeUtil = tldrawStoreMutations.registerShapeUtil(ErrorShapeUtil);

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
				assetUrls={getAssetUrls({
					baseUrl: getDefaultCdnBaseUrl()
				})}
				isShapeHidden={(s) => !!s.meta.hidden}
			/>
		</FullSize>
	)
})

export default Workbenches;
