import { memo, useRef, useState } from 'react'
import { DefaultSizeStyle, Editor, TLShapeId, TldrawUiIcon, track, useEditor, useValue, type TLUiAssetUrlOverrides } from 'tldraw'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

export const customAssetUrls: TLUiAssetUrlOverrides = {
	icons: {
		// 'heart-icon': '/heart-icon.svg',
	},
}

const SIZES = [
	{ value: 's', icon: 'size-small' },
	{ value: 'm', icon: 'size-medium' },
	{ value: 'l', icon: 'size-large' },
	{ value: 'xl', icon: 'size-extra-large' },
] as const

export const ContextToolbarComponent = track(() => {
	const editor = useEditor()
	const showToolbar = editor.isIn('select.idle')

	if (!showToolbar) return <></>;

	const selectionRotatedPageBounds = editor.getSelectionRotatedPageBounds()
	if (!selectionRotatedPageBounds) return <></>;

	// [2]
	const size = editor.getSharedStyles().get(DefaultSizeStyle);

	if (!size) return <></>;
	const currentSize = size.type === 'shared' ? size.value : void 0;

	const pageCoordinates = editor.pageToViewport(selectionRotatedPageBounds.point);

	return (
		<div
			style={{
				position: 'absolute',
				pointerEvents: 'all',
				top: pageCoordinates.y - 42,
				left: pageCoordinates.x,
				// [3]
				width: selectionRotatedPageBounds.width * editor.getZoomLevel(),
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			// [4]
			onPointerDown={(e) => e.stopPropagation()}
		>
			<div
				style={{
					borderRadius: 8,
					display: 'flex',
					boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)',
					background: 'var(--color-panel)',
					width: 'fit-content',
					alignItems: 'center',
				}}
			>
				{SIZES.map(({ value, icon }) => {
					const isActive = value === currentSize;

					return (
						<div
							key={value}
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								height: 32,
								width: 32,
								background: isActive ? 'var(--color-muted-2)' : 'transparent',
							}}
							onClick={() => editor.setStyleForSelectedShapes(DefaultSizeStyle, value)}
						>
							<TldrawUiIcon icon={icon} />
						</div>
					)
				})}
			</div>
		</div>
	)
})
