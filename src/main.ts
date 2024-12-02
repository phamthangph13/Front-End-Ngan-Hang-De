import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'



import App from './App.vue'
import router from './router'
import i18n from '@/plugins/i18n'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(i18n)


// app.config.globalProperties.$filters = {
//     capitalize(value: string) {
//         if (!value) return ''
//         value = value.toString()
//         return value.charAt(0).toUpperCase() + value.slice(1)
//     }
// }


app.mount('#app')
