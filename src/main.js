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

import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

dom.watch()
library.add(fas)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(PrimeVue)
app.use(store)
app.use(router)

app.mount('#app')

//createApp(App).use(PrimeVue).use(store).use(router).mount('#app')
