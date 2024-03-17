import type { RouteMeta } from 'vue-router';
import { defineComponent, computed } from 'vue';
import * as icons from '@ant-design/icons-vue';

export const IconFont = defineComponent({
  props: {
    type: { type: String as PropType<IconKey>, required: true },
    color: { type: String, default: '' },
    size: { type: [String, Number] },
    className: { type: String, default: '' }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const isIcon = computed(() => props.type && !props.type.startsWith('icon-'));

    const Icon = isIcon.value && props.type ? icons[props.type as IconRealKey] : void 0;

    return () =>
      isIcon.value
        ? (Icon ? <Icon
            style={{ color: props.color, ...((props.size && { fontSize: props.size + 'px' }) ?? {}) }}
            class={props.className}
            onClick={() => emit('click')}
            /> : <div />)
        : (<div />)
  }
})


const c = <IconFont type='' />
