import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import './styles/index.css'
import testPlugin from './test.plugin'
const app = createApp(App)
app.use(testPlugin)
library.add(fas)
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
