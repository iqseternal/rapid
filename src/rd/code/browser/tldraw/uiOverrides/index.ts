import type { TLUiOverrides } from 'tldraw';


export const tools: TLUiOverrides['tools'] = (editor, tools) => {
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
}
