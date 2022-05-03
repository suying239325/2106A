import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'normalize.css'
import './plugins/element.js'
import '@/assets/css.css/css.css'
Vue.config.productionTip = false

Vue.filter('time', function (val) {
  let time = new Date(val * 1000)
  // console.log(date);
  let year = time.getFullYear()
  let mouth = time.getMonth()
  let date = time.getDay()
  let hours = time.getHours()
  let mimute = time.getMinutes()
  let seconds = time.getSeconds()
  return `${year} - ${mouth} - ${date} ${hours}:${mimute}:${seconds}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')