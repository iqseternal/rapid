import { memo, useEffect, useRef } from 'react';
import type { TLComponents } from 'tldraw';
import {
	DefaultKeyboardShortcutsDialog, DefaultKeyboardShortcutsDialogContent, TldrawUiMenuItem, DefaultToolbar,
	toDomPrecision, useIsToolSelected, useTools, useTransform, useEditor, useValue, DefaultToolbarContent
} from 'tldraw';

import { ShapePanel, ContextToolbarComponent } from './InFrontOfTheCanvas';

/**
 * @description 画笔组件
 */
export const Brush: TLComponents['Brush'] = memo(({ brush }) => {
	const rSvg = useRef<SVGSVGElement>(null)

	useTransform(rSvg, brush.x, brush.y)

	const w = toDomPrecision(Math.max(1, brush.w))
	const h = toDomPrecision(Math.max(1, brush.h))

	return (
		<svg ref={rSvg} className="tl-overlays__item">
			<rect className="tl-brush" stroke="red" fill="none" width={w} height={h} />
		</svg>
	)
})

/**
 * @description 涂鸦组件
 */
export const Scribble: TLComponents['Scribble'] = memo(({ scribble, opacity, color }) => {
	return (
		<svg className="tl-overlays__item">
			<polyline points={scribble.points.map((p) => `${p.x},${p.y}`).join(' ')} stroke={color ?? 'black'} opacity={opacity ?? '1'} fill="none" />
		</svg>
	)
})

export const SnapIndicator: TLComponents['SnapIndicator'] = null;

/**
 * @description 工具栏组件
 */
export const Toolbar: TLComponents['Toolbar'] = memo((props) => {
	const tools = useTools();
	const isStickerSelected = useIsToolSelected(tools['sticker']);

	return (
		<DefaultToolbar {...props}>
			<TldrawUiMenuItem {...tools['sticker']} isSelected={isStickerSelected} />
			<DefaultToolbarContent />
		</DefaultToolbar>
	)
})

/**
 * @description 画布前组件
 */
export const InFrontOfTheCanvas: TLComponents['InFrontOfTheCanvas'] = memo(() => {

	return (
		<div>
			<ShapePanel />
			<ContextToolbarComponent />
		</div>
	)
})

/**
 * @description 快捷键对话框组件
 */
export const KeyboardShortcutsDialog: TLComponents['KeyboardShortcutsDialog'] = memo((props) => {
	const tools = useTools()

	return (
		<DefaultKeyboardShortcutsDialog {...props}>
			<DefaultKeyboardShortcutsDialogContent />
			{/* Ideally, we'd interleave this into the tools group */}
			<TldrawUiMenuItem {...tools['sticker']} />
		</DefaultKeyboardShortcutsDialog>
	)
})




export const MainMenu: TLComponents['MainMenu'] = memo((props) => {


	return (
		<div>


		</div>
	)
})

export const PageMenu: TLComponents['PageMenu'] = memo((props) => {
	return (

		<div></div>
	)
})

