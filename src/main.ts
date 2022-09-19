import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import 'uno.css'

import { colorInit } from './color-ui/init'

export function createApp() {
  const app = createSSRApp(App)

  app.use(createPinia())

  colorInit(app)

  return {
    app,
  }
}
