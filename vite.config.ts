import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UnoCss from 'unocss/vite'
import TransformWeClass from 'unplugin-transform-we-class/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VantAutoImport from 'uni-app-vant-auto-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Uni({
      vueOptions: {
        reactivityTransform: true,
      },
    }),
    UnoCss(),
    TransformWeClass(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        {
          '@dcloudio/uni-app': [
            'onShow',
            'onHide',
            'onLoad',
            'onUnload',
          ],
        },
      ],
      dirs: ['./src/store', './src/utils'],
      dts: './src/auto-import.d.ts',
    }),
    VantAutoImport(),
  ],
})
