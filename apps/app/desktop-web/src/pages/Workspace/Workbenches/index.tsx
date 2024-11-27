import { memo, useEffect } from 'react';
import { Tldraw } from 'tldraw';
import { FullSize } from '@rapid/libs-web';
import { polotnoMutations, usePolotnoStore } from '@/features';
import { ErrorShapeUtil, StickerTool, tools, Brush, Scribble, SnapIndicator, Toolbar, InFrontOfTheCanvas, KeyboardShortcutsDialog } from '@/tldraw';

import './tldraw.scss';

export const Workbenches = memo(() => {
  const tlShapes = usePolotnoStore(store => store.tlShapeUtils);
	const tlTools = usePolotnoStore(store => store.tlTools);
	const tlUiOverrides = usePolotnoStore(store => store.tlUiOverrides);
	const tlComponents = usePolotnoStore(store => store.tlComponents);

	useEffect(() => {
		const unregisterBrush = polotnoMutations.registerComponent('Brush', Brush);
		const unregisterScribble = polotnoMutations.registerComponent('Scribble', Scribble);
		const unregisterSnapIndicator = polotnoMutations.registerComponent('SnapIndicator', SnapIndicator);
		const unregisterToolbar = polotnoMutations.registerComponent('Toolbar', Toolbar);
		const unregisterInFrontOfTheCanvas = polotnoMutations.registerComponent('InFrontOfTheCanvas', InFrontOfTheCanvas);
		const unregisterKeyboardShortcutsDialog = polotnoMutations.registerComponent('KeyboardShortcutsDialog', KeyboardShortcutsDialog);

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
        initialState="sticker"
        overrides={tlUiOverrides}
        components={tlComponents}
        // assetUrls={customAssetUrls}
        isShapeHidden={(s) => !!s.meta.hidden}
      />
    </FullSize>
  )
})

export default Workbenches;
