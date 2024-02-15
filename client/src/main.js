import {
	createApp
} from 'vue'
import App from './App.vue'
//导入路由
import router from './router'
// 导入EL组件库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'



const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(ElementPlus, {
	locale: zhCn,
})
app.use(router).use(ElementPlus)
//挂载
app.mount('#app')