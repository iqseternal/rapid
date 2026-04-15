import { EllipsisBase, type EllipsisProps } from './EllipsisBase';
import { EllipsisTooltip, type EllipsisTooltipProps } from './EllipsisTooltip';
import { EllipsisPopover, type EllipsisPopoverProps } from './EllipsisPopover';
import { injectReadonlyVariable } from '@suey/pkg-utils';

export type { EllipsisProps, EllipsisTooltipProps, EllipsisPopoverProps };

export type EllipsisType = typeof EllipsisBase & {
  readonly Tooltip: typeof EllipsisTooltip;
  readonly Popover: typeof EllipsisPopover;
};

const Ellipsis = EllipsisBase as EllipsisType;

injectReadonlyVariable(Ellipsis, 'Tooltip', EllipsisTooltip);
injectReadonlyVariable(Ellipsis, 'Popover', EllipsisPopover);

export { Ellipsis };

export default Ellipsis;
