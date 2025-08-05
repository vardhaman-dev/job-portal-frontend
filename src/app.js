import { createApp } from 'vue'
import { Quasar } from 'quasar'
import quasarUserOptions from '../quasar-user-options'
import App from '../App.vue'
import router from './router' // ✅ folder with index.js
import { createPinia } from 'pinia';

const app = createApp(App)

app.use(createPinia());
app.use(Quasar, quasarUserOptions)
app.use(router) // ✅ router instance

app.mount('#app')
