import { defineConfig, presetIcons } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'

export default defineConfig({
  presets: [
    presetWeapp(),
    presetIcons({
      scale: 1.2,
      prefix: 'i-',
      warn: true,
    }),
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500_10',
      'center': 'flex justify-center items-center',
    },
  ],
})
