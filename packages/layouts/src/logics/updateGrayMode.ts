import { toggleClass } from '@radical/utils'

/**
 * Change project gray mode status
 * @param gray
 */
export function updateGrayMode(gray: boolean) {
  toggleClass(gray, 'gray-mode', document.body)
}
