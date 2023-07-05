import { computed, ref, unref } from 'vue'
import { useElementSize } from '@radical/utils'
import { useConfigStore } from './projConfig'
import { storeToRefs } from 'pinia'

export const useComosables = () => {
  const headerRef = ref<HTMLElement | null>(null)
  const tabRef = ref<HTMLElement | null>(null)
  const contentRef = ref<HTMLElement | null>(null)
  const { height: headerHeight, width: headerWidth } = useElementSize(headerRef)
  const { height: tabHeight, width: tabWidth } = useElementSize(tabRef)

  const { getDarkMode } = storeToRefs(useConfigStore())

  const omitContentHeight = computed(() => {
    return unref(headerHeight) + unref(tabHeight)
  })
  const contentFixedHeight = computed(() => {
    return `calc(100vh - ${unref(omitContentHeight)}px)`
  })
  const contentStyle = computed(() => {
    return {
      height: unref(contentFixedHeight),
      minHeight: unref(contentFixedHeight),
    }
  })
  const mainStyle = computed(() => {
    return {
      minHeight: `calc(100vh - ${unref(omitContentHeight)}px)`,
    }
  })

  const headerStyle = computed(() => ({
    padding: 0,
    height: 'auto',
    background: unref(getDarkMode) === 'dark' ? '#000' : '#fff',
  }))

  return {
    headerRef,
    tabRef,
    contentRef,
    headerHeight,
    headerWidth,
    tabHeight,
    tabWidth,
    omitContentHeight,
    headerStyle,
    contentStyle,
    mainStyle,
  }
}
