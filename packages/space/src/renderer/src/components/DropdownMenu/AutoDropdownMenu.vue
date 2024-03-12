<script lang="tsx">
import type { Ref } from 'vue';
import { withDefaults, defineComponent, computed } from 'vue';
import type { DropdownDataType } from './declare';
import { isComboBoxMenuData, isMenuDriverData, isSingleMenuData } from './declare';
import type { DropdownProps, Dropdown as DropdownMenuVue } from 'ant-design-vue';

import Dropdown from './DropdownMenu.vue';
import MenuDriver from './MenuDriver.vue';
import ComboBoxMenu from './ComboBoxMenu.vue';
import SingleMenu from './SingleMenu.vue';

const renderMenu = (menus: DropdownDataType) => {
  return menus.map((item, index) => {
    if (isMenuDriverData(item)) return <MenuDriver />;
    if (isSingleMenuData(item)) return <SingleMenu {...item}>{item.title}</SingleMenu>;
    if (isComboBoxMenuData(item)) {
      const comboxBoxMenuProps = { ...item, children: void 0 };
      delete comboxBoxMenuProps.children;
      return <ComboBoxMenu {...comboxBoxMenuProps}>
        {renderMenu(item.children)}
      </ComboBoxMenu>
    }
    return <></>;
  })
}

export default defineComponent({
  props: {
    trigger: { type: String as PropType<Required<DropdownProps>['trigger']>, default: () => 'contextmenu' },
    menu: { type: Array as PropType<DropdownDataType | Ref<DropdownDataType>>, default: () => ([]) }
  },
  setup(props, { slots, attrs }) {
    const contextMenu = computed(() => renderMenu(props.menu as DropdownDataType));

    const Cpt = Dropdown as (typeof Dropdown & typeof DropdownMenuVue);

    return () => <Cpt {...attrs} trigger={props.trigger}>
      {{
        default: slots.default,
        overlay: () => contextMenu.value
      }}
    </Cpt>
  }
})
</script>
