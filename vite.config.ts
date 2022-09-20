import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UnoCss from 'unocss/vite'
import TransformWeClass from 'unplugin-transform-we-class/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
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
        'pinia',
        'uni-app',
      ],
      dirs: [
        './src/store',
        './src/utils',
        './src/hooks',
        './src/modules',
        './src/constants',
      ],
      dts: './src/auto-import.d.ts',
    }),
  ],
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
