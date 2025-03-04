

import { StateNode } from 'tldraw'

const OFFSET = 12;

export class StickerTool extends StateNode {
	public static override id = 'sticker';

	public override onEnter() {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	public override onPointerDown() {
		const { currentPagePoint } = this.editor.inputs
		this.editor.createShape({
			type: 'text',
			x: currentPagePoint.x - OFFSET,
			y: currentPagePoint.y - OFFSET,
			props: { text: '❤️' },
		})
	}
}
