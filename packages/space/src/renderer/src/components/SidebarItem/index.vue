<script lang="tsx">
import { defineComponent } from 'vue';
import { Tooltip } from 'ant-design-vue';
import type { TooltipProps } from 'ant-design-vue';
import { CONFIG } from '#/constants';

type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export default defineComponent({
  props: {
    src: { type: String, required: false, defeault: '' },
    text: { type: String, required: false },
    placement: { type: String as PropType<TooltipPlacement>, default: 'right' }
  },
  setup(props, { slots }) {
    return () => (
      <div class="sidebarItem">
        { slots.default
          ? (
              props.text
                ? (<Tooltip mouseEnterDelay={CONFIG.VIEW.TOOLTIP_ENTER_TIME} title={props.text} placement={props.placement} trigger={'hover'}>{slots.default()}</Tooltip>)
                : (slots.default())
            )
          : (
              props.text
                ? (<Tooltip mouseEnterDelay={CONFIG.VIEW.TOOLTIP_ENTER_TIME} title={props.text} placement={props.placement}  trigger={'hover'}><img src={props.src} alt="" /></Tooltip>)
                : (<img src={props.src} alt="" />)
            )
        }
      </div>
    )
  }
})

</script>

<style lang="scss" scoped>

.sidebarItem {
  --size: calc(var(--s-main-frame-sidebar-width) - 16px);
  position: relative;

  width: var(--size);
  height: var(--size);
  cursor: pointer;

  display: flex;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:deep(span) {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 2px;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
