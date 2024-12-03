import './assets/main.css'
import 'primeicons/primeicons.css'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const vuetify = createVuetify({
    components,
    directives,
})
const app = createApp(App)


app.use(router)
app.use(vuetify)

app.mount('#app')
