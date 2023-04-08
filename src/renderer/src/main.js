import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

//css
import './assets/styles/style.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles/css-vars.css'
//store
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(router).component('simplebar', simplebar).mount('#app')
