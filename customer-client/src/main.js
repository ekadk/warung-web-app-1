import { createApp } from 'vue'
import { markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

import './assets/output.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: '190201322883-q54jq2k5qjccdig30khuq257i1j188jd.apps.googleusercontent.com'
})

app.mount('#app')