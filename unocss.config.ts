import { defineConfig } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'

export default defineConfig({
  presets: [
    presetWeapp(),
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500_10',
      'center': 'flex justify-center items-center',
    },
  ],
})
