import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css'
import PrimeVue from 'primevue/config'

const app = createApp(App)
app.use(PrimeVue)
app.use(store)
app.use(router)

app.mount('#app')

//createApp(App).use(PrimeVue).use(store).use(router).mount('#app')
