import { Space, Card, Button, message, Input, App } from 'antd';
import { Stack, toPicket } from '@rapid/libs';
import { Guards } from '@router/guards';
import type { FC } from 'react';
import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FullSizeWidth, FullSize } from '@rapid/libs-web';
import { bus } from '../../../libs/events';
import { rApp } from '@rapid/extensions';
import { RegisterPoints } from '../../../libs/extensions';
import { commonStyles } from '@scss/common';

import IconFont from '@components/IconFont';
import './tldraw.scss';

import { ContextMenu, TLComponents, TLEditorSnapshot, Tldraw, toDomPrecision, useEditor, useTransform, useValue, PageRecordType } from 'tldraw'
import {
	DefaultKeyboardShortcutsDialog,
	DefaultKeyboardShortcutsDialogContent,
	DefaultToolbar,
	DefaultToolbarContent,
	TLUiAssetUrlOverrides,
	TLUiOverrides,
	TldrawUiMenuItem,
	useIsToolSelected,
	useTools,
} from 'tldraw'
import { ContextToolbarComponent, ErrorShapeUtil, ShapeList, StickerTool } from './Panel';

const uiOverrides: TLUiOverrides = {
	tools(editor, tools) {
		// Create a tool item in the ui's context.
		tools.sticker = {
			id: 'sticker',
			icon: 'heart-icon',
			label: 'Sticker',
			kbd: 's',
			onSelect: () => {
				editor.setCurrentTool('sticker')
			},
		}
		return tools
	},
}


const components: TLComponents = {
  /**
   * 框选
   * @param param0
   * @returns
   */
  Brush: function MyBrush({ brush }) {
		const rSvg = useRef<SVGSVGElement>(null)

		useTransform(rSvg, brush.x, brush.y)

		const w = toDomPrecision(Math.max(1, brush.w))
		const h = toDomPrecision(Math.max(1, brush.h))

		return (
			<svg ref={rSvg} className="tl-overlays__item">
				<rect className="tl-brush" stroke="red" fill="none" width={w} height={h} />
			</svg>
		)
	},
  /**
   * 橡皮
   * @param param0
   * @returns
   */
	Scribble: ({ scribble, opacity, color }) => {
		return (
			<svg className="tl-overlays__item">
				<polyline
					points={scribble.points.map((p) => `${p.x},${p.y}`).join(' ')}
					stroke={color ?? 'black'}
					opacity={opacity ?? '1'}
					fill="none"
				/>
			</svg>
		)
	},
	SnapIndicator: null,
  Toolbar: (props) => {
		const tools = useTools()
		const isStickerSelected = useIsToolSelected(tools['sticker'])
		return (
			<DefaultToolbar {...props}>
				<TldrawUiMenuItem {...tools['sticker']} isSelected={isStickerSelected} />
				<DefaultToolbarContent />
			</DefaultToolbar>
		)
	},
  // [1]
  InFrontOfTheCanvas: () => {
    const editor = useEditor()
    const shapeIds = useValue(
      'shapeIds',
			// @ts-ignore
      () => editor.getSortedChildIdsForParent(editor.getCurrentPageId()),
      [editor]
    )
    return (
      <div className="layer-panel">
        <div className="layer-panel-title">Shapes</div>

        <ShapeList
          // [2]
          shapeIds={shapeIds}
          depth={0}
        />

        <ContextToolbarComponent />
      </div>
    )
  },
  KeyboardShortcutsDialog: (props) => {
		const tools = useTools()
		return (
			<DefaultKeyboardShortcutsDialog {...props}>
				<DefaultKeyboardShortcutsDialogContent />
				{/* Ideally, we'd interleave this into the tools group */}
				<TldrawUiMenuItem {...tools['sticker']} />
			</DefaultKeyboardShortcutsDialog>
		)
	},
}

export const customAssetUrls: TLUiAssetUrlOverrides = {
	icons: {
		// 'heart-icon': '/heart-icon.svg',
	},
}

const customTools = [StickerTool]

const shapes = [ErrorShapeUtil]

export const Home = memo(() => {


  return (
    <FullSize

    >
      <Tldraw
        shapeUtils={shapes}
        tools={customTools}
        initialState="sticker"
        overrides={uiOverrides}
        components={components}

        // assetUrls={customAssetUrls}
        // [3]
        isShapeHidden={(s) => !!s.meta.hidden}
      />
    </FullSize>
  )
})

export default Home;

