
import { memo, useMemo, useRef, useState } from 'react';
import { DefaultSizeStyle, Editor, TLShapeId, TldrawUiIcon, track, useEditor, useValue } from 'tldraw';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { StringFilters, useShallowReactive, classnames } from '@rapid/libs-web';
import { commonStyles } from '@scss/common';

import styles from './index.module.scss';

/**
 * 格式化形状名称, 如果形状没有名称, 则返回形状类型 + ' shape'
 */
const formatShapeName = (editor: Editor, shapeId: TLShapeId) => {
  const shape = editor.getShape(shapeId);

  if (!shape) return `未命名 形状`;

  return (
		(shape.meta.name as string) ||
		editor.getShapeUtil(shape).getText(shape) ||
		StringFilters.toCapitalizeFirstLetter(shape.type + ' shape')
	);
}

export interface ShapeItemProps {
	/**
	 * 形状ID
	 */
	shapeId: TLShapeId;
	/**
	 * 深度, 列表会自动展示组合形状的缩进
	 */
	depth: number;
	/**
	 * 父级是否被选中
	 */
	parentIsSelected?: boolean;
	/**
	 * 父级是否被隐藏
	 */
	parentIsHidden?: boolean;
}

/**
 * 展示画布中拥有的某个图形元素的展示列表项
 */
export const ShapeItem = memo((props: ShapeItemProps) => {
	const { shapeId, depth, parentIsSelected, parentIsHidden } = props;

	const editor = useEditor();

	const shape = useValue('shape', () => editor.getShape(shapeId), [editor]);
	const children = useValue('children', () => editor.getSortedChildIdsForParent(shapeId), [editor]);
	const isHidden = useValue('isHidden', () => editor.isShapeHidden(shapeId), [editor]);
	const isSelected = useValue('isSelected', () => editor.getSelectedShapeIds().includes(shapeId), [editor]);
	const shapeName = useValue('shapeName', () => formatShapeName(editor, shapeId), [editor]);

	const [shallowState] = useShallowReactive({
		isEditingShapeName: false
	})

	/**
	 * 选择图形, 但是自动处理多选和单选
	 */
	const deselectShape = () => {
		if (!shape) return;

		if (editor.inputs.ctrlKey || editor.inputs.shiftKey) {
			if (isSelected) editor.deselect(shape)
		 	else editor.select(...editor.getSelectedShapes(), shape);
		} else {
			editor.select(shape);
		}
	}

	const cssBackground = useMemo(() => {
		if (isSelected) return cssVars.tldrawShapeItemParentSelectedBg;
		if (parentIsSelected) return cssVars.tldrawShapeItemParentSelectedBg;
		if (depth > 0) return cssVars.tldrawShapeItemChildSelectedBg;

		return void 0;
	}, [isSelected, parentIsSelected, depth])

	if (!shape) return <></>;

	return (
		<>
			{!!shape && (
				<div
					className={styles.shapeItem}
					onDoubleClick={() => {
						shallowState.isEditingShapeName = true;
					}}
					onClick={deselectShape}
					style={{
						paddingLeft: 10 + depth * 20,
						opacity: parentIsHidden || isHidden ? 0.5 : 1,
						background: cssBackground
					}}
				>
					{shallowState.isEditingShapeName ? (
						<input
							autoFocus
							className={styles.shapeNameInput}
							defaultValue={shapeName}
							onBlur={() => {
								shallowState.isEditingShapeName = false;
							}}
							onChange={(ev) => {
								if (!shape) return;
								if (shape.type === 'frame') {
									editor.updateShape({ ...shape, props: { name: ev.target.value } });
								} else {
									editor.updateShape({ ...shape, meta: { name: ev.target.value } });
								}
							}}
							onKeyDown={(ev) => {
								if (ev.key === 'Enter' || ev.key === 'Escape') {
									ev.currentTarget.blur();
								}
							}}
						/>
					) : (
						<div className={styles.shapeName}>
							{shapeName}
						</div>
					)}

					<button
						className={styles.shapeVisibilityToggle}
						onClick={(ev) => {
							ev.stopPropagation();
							editor.updateShape({ ...shape, meta: { hidden: !shape.meta.hidden } });
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
});

export interface ShapeListProps {
	/**
	 * 形状ID列表
	 */
	shapeIds: TLShapeId[];
	/**
	 * 深度
	 */
	depth: number;
	/**
	 * 父级是否被选中
	 */
	parentIsSelected?: boolean;
	/**
	 * 父级是否被隐藏
	 */
	parentIsHidden?: boolean;
}

/**
 * 展示当前再画布中存在的形状图形列表
 */
export const ShapeList = memo((props: ShapeListProps) => {
	const { shapeIds, depth, parentIsSelected, parentIsHidden } = props;

	if (!shapeIds.length) return null;

	return (
		<div className={commonStyles.flexCol}>
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
})

export interface ShapePanelProps {

}

/**
 * 展示当前再画布中存在的形状图形列表的面板
 */
export const ShapePanel = memo<ShapePanelProps>(() => {
	const editor = useEditor();

	const shapeIds = useValue('shapeIds',	() => editor.getSortedChildIdsForParent(editor.getCurrentPageId()), [editor]);

	return (
		<div className={styles.layerPanel}>
			<div className={styles.layerPanelTitle}>Shapes</div>

			<ShapeList
				shapeIds={shapeIds}
				depth={0}
			/>
		</div>
	)
})
