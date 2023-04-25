import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
app.use(vue3GoogleLogin, {
  clientId: '190201322883-q54jq2k5qjccdig30khuq257i1j188jd.apps.googleusercontent.com'
})

// import './assets/main.css'
import './assets/output.css'

app.mount('#app')
