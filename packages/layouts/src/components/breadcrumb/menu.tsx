import { Menu, MenuItem, SubMenu } from 'ant-design-vue'
import { useI18n } from '@radical/locale'
import { defineComponent } from 'vue'
import { useGo } from '@radical/hooks'

const generateItem = (item) => {
  const { t } = useI18n()
  if (item?.length) {
    const component =
      item?.length &&
      item.map((child) => {
        if (child.children) {
          return (
            <SubMenu key={child.path} title={t(child.title)}>
              {generateItem(child.children)}
            </SubMenu>
          )
        } else {
          return <MenuItem key={child.path}>{t(child.title)}</MenuItem>
        }
      })
    return component
  }
  return null
}

export default defineComponent({
  props: {
    items: {
      type: Array,
    },
  },
  setup(props) {
    const go = useGo()
    const handleClick = (pathArr) => {
      go(pathArr[pathArr.length - 1])
    }
    return () => {
      const children = generateItem(props.items)
      return (
        <Menu onClick={({ keyPath }) => handleClick(keyPath)}>{children}</Menu>
      )
    }
  },
})
