import { BaseBoxShapeUtil, TLBaseShape } from 'tldraw'

export type ErrorShape = TLBaseShape<'error', { w: number; h: number; message: string }>

/**
 * 处理误差错误
 */
export class ErrorShapeUtil extends BaseBoxShapeUtil<ErrorShape> {
	public static override type = 'error' as const;

	public type = 'error' as const;
	public typeName = 'Error';

	getDefaultProps() {
		return { message: 'Error!', w: 100, h: 100 }
	}

	component(shape: ErrorShape) {
		throw new Error(shape.props.message)
	}

	indicator() {
		throw new Error(`Error shape indicator!`)
	}
}

