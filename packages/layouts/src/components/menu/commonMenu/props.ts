import type { PropType } from 'vue'
import type { MenuMode } from 'ant-design-vue/lib/menu/src/interface'
import { MenuModeEnum, MenuTypeEnum } from '@radical/constants'
import { Menu } from '@radical/types'

export const basicProps = {
  items: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
  // 最好是4 倍数
  inlineIndent: {
    type: Number,
    default: 20,
  },
  // 菜单组件的mode属性
  mode: {
    type: String as PropType<MenuMode>,
    default: MenuModeEnum.INLINE,
  },
  type: {
    type: String as PropType<MenuTypeEnum>,
    default: MenuTypeEnum.MIX,
  },
  isHorizontal: Boolean,
}

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: () => ({}),
  },
  level: {
    type: Number,
    default: 0,
  },
  showTitle: Boolean,
  isHorizontal: Boolean,
}

export const contentProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  isHorizontal: {
    type: Boolean,
    default: true,
  },
}
