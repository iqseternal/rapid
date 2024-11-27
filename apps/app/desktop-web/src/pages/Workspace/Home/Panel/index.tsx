import { memo, useRef, useState } from 'react'
import { DefaultSizeStyle, Editor, TLShapeId, TldrawUiIcon, track, useEditor, useValue, type TLComponents, useTransform, toDomPrecision, DefaultKeyboardShortcutsDialogContent, useIsToolSelected, TldrawUiMenuItem, DefaultToolbarContent, DefaultToolbar, useTools, DefaultKeyboardShortcutsDialog, type TLUiOverrides, type TLUiAssetUrlOverrides } from 'tldraw'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import './index.scss';

const selectedBg = '#E8F4FE'
const childSelectedBg = '#F3F9FE'
const childBg = '#00000006'

function ShapeItem({
	shapeId,
	depth,
	parentIsSelected,
	parentIsHidden,
}: {
	shapeId: TLShapeId
	depth: number
	parentIsSelected?: boolean
	parentIsHidden?: boolean
}) {
	const editor = useEditor()

	const shape = useValue('shape', () => editor.getShape(shapeId), [editor])
	// @ts-ignore
	const children = useValue('children', () => editor.getSortedChildIdsForParent(shapeId), [editor])
	const isHidden = useValue('isHidden', () => editor.isShapeHidden(shapeId), [editor])
	const isSelected = useValue('isSelected', () => editor.getSelectedShapeIds().includes(shapeId), [
		editor,
	])
	const shapeName = useValue('shapeName', () => getShapeName(editor, shapeId), [editor])

	const [isEditingName, setIsEditingName] = useState(false)

	if (!shape) return null

	return (
		<>
			{!!shape && (
				<div
					className="shape-item"
					onDoubleClick={() => {
						setIsEditingName(true)
					}}
					onClick={() => {
						// We synchronize the selection state of the layer panel items with the selection state of the shapes in the editor.
						if (editor.inputs.ctrlKey || editor.inputs.shiftKey) {
							if (isSelected) {
								editor.deselect(shape)
							} else {
								editor.select(...editor.getSelectedShapes(), shape)
							}
						} else {
							editor.select(shape)
						}
					}}
					style={{
						paddingLeft: 10 + depth * 20,
						opacity: parentIsHidden || isHidden ? 0.5 : 1,
						background: isSelected
							? selectedBg
							: parentIsSelected
								? childSelectedBg
								: depth > 0
									? childBg
									: undefined,
					}}
				>
					{isEditingName ? (
						<input
							autoFocus
							className="shape-name-input"
							defaultValue={shapeName}
							onBlur={() => setIsEditingName(false)}
							onChange={(ev) => {
								if (shape.type === 'frame') {
									editor.updateShape({ ...shape, props: { name: ev.target.value } })
								} else {
									editor.updateShape({ ...shape, meta: { name: ev.target.value } })
								}
							}}
							onKeyDown={(ev) => {
								// finish editing on enter
								if (ev.key === 'Enter' || ev.key === 'Escape') {
									ev.currentTarget.blur()
								}
							}}
						/>
					) : (
						<div className="shape-name">{shapeName}</div>
					)}
					<button
						className="shape-visibility-toggle"
						onClick={(ev) => {
							editor.updateShape({ ...shape, meta: { hidden: !shape.meta.hidden } })
							ev.stopPropagation()
						}}
					>
						{shape.meta.hidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
					</button>
				</div>
			)}
			{!!children?.length && (
				<ShapeList
					shapeIds={children}
					depth={depth + 1}
					parentIsHidden={parentIsHidden || isHidden}
					parentIsSelected={parentIsSelected || isSelected}
				/>
			)}
		</>
	)
}

export function ShapeList({
	shapeIds,
	depth,
	parentIsSelected,
	parentIsHidden,
}: {
	shapeIds: TLShapeId[]
	depth: number
	parentIsSelected?: boolean
	parentIsHidden?: boolean
}) {
	if (!shapeIds.length) return null
	return (
		<div className="shape-tree">
			{shapeIds.map((shapeId) => (
				<ShapeItem
					key={shapeId}
					shapeId={shapeId}
					depth={depth}
					parentIsHidden={parentIsHidden}
					parentIsSelected={parentIsSelected}
				/>
			))}
		</div>
	)
}


const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getShapeName(editor: Editor, shapeId: TLShapeId) {
	const shape = editor.getShape(shapeId)
	if (!shape) return 'Unknown shape'
	return (
		(shape.meta.name as string) ||
		editor.getShapeUtil(shape).getText(shape) ||
		capitalize(shape.type + ' shape')
	)
}

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
	if (!showToolbar) return null
	const selectionRotatedPageBounds = editor.getSelectionRotatedPageBounds()
	if (!selectionRotatedPageBounds) return null

	// [2]
	const size = editor.getSharedStyles().get(DefaultSizeStyle)
	if (!size) return null
	const currentSize = size.type === 'shared' ? size.value : undefined

	const pageCoordinates = editor.pageToViewport(selectionRotatedPageBounds.point)

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
					const isActive = value === currentSize
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














