import './assets/common.css'
import router from './router/index'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/iconfont/font.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
/* 创建pinia */
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// import { Edit } from '@element-plus/icons-vue' // 引入 Edit 图
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
// 引用持久化这里不能使用createPinia
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
