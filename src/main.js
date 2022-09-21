import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Element from 'element-plus'
import "element-plus/dist/index.css";
import './assets/main.css'

const app = createApp(App)
// app.use(Element)
app.use(router)

app.mount('#app')
