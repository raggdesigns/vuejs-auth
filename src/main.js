import Vue from 'vue'
import App from '@/App.vue'
import 'element-theme-chalk'
import Meta from 'vue-meta'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/sr'
import router from '@/routes/index'
import config from '@/config'
import store from '@/store'
import API from '@/api'

Vue.use(Meta)
Vue.use(ElementUI, { locale })

Vue.prototype.$appConfig = config
Vue.prototype.$api = API

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
