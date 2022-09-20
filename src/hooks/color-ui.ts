import { assert } from '@bryce-loskie/utils'
import type { Ref } from 'vue'

export const useColorUI = () => {
  const instance = getCurrentInstance()
  assert(instance, 'useCustomNav must be called within a setup function')

  const statusBarHeight = inject<Ref<number>>($StatusBarHeight, ref(44))
  const customBarHeight = inject<Ref<number>>($CustomBarHeight, ref(84))
  const colorList = inject<{ title: string; name: string; color: string }[]>($ColorList, [])

  return {
    statusBarHeight,
    customBarHeight,
    colorList,
  }
}
