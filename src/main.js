// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/customCheckbox.css'
import Vuelidate from 'vuelidate'
import Axios from 'axios'
import vueAwesomeCountdown from 'vue-awesome-countdown'
import VueRandomColor from 'vue-randomcolor'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Msg from 'vue-message'
const Authorization = require('@/helper/authHeader')

Vue.use(BootstrapVue)
Vue.use(router)
Vue.use(Vuelidate)
Vue.use(require('vue-moment'))
Vue.use(vueAwesomeCountdown)
Vue.use(VueRandomColor)
Vue.use(VueLoading, {
  color: '#000000',
  loader: 'spinner',
  width: 100,
  height: 100,
  backgroundColor: '#343A40',
  opacity: 0.4
})
Vue.use(Msg, {
  duration: 5000, background: '#CC0000'
})
Vue.config.productionTip = false
Vue.config.devtools = true
window.addEventListener('error', function (err) {
  alert('window.onerror-\n' + err.message)
})
Vue.config.errorHandler = function (err) {
  console.log('handle error', err.message)
}

Vue.prototype.$http = Axios
if (Authorization.authToken()) {
  Vue.prototype.$http.defaults.headers.common['authorization'] = Authorization.authToken()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
