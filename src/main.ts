import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import 'uno.css'

import CuCustom from './color-ui/components/cu-custom.vue'
import ColorUi from './color-ui/init'

export function createApp() {
  const app = createSSRApp(App)

  app.use(createPinia())

  app.use(ColorUi)

  app.component('CuCustom', CuCustom)

  return {
    app,
  }
}
