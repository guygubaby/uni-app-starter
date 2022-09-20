import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import 'uno.css'

import ColorUI from './modules/color-ui'

export function createApp() {
  const app = createSSRApp(App)

  app.use(createPinia())

  app.use(ColorUI)

  return {
    app,
  }
}
