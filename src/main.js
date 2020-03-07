import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Swiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import '@/style/common.scss'

Vue.use(Swiper)
Vue.config.productionTip = false

Vue.use(VueAxios, axios)
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error)
});
Vue.prototype.$axios = axios

//time
function getLocalTime(nS) {
  let time = new Date(parseInt(nS) * 1000);
  return time.Format("MM-dd hh:mm");
}
Date.prototype.Format = function(fmt) {
  if(this.getMonth() + 1==1&&this.getDate()==1&&this.getMinutes()==0&&this.getSeconds()==0){
    return fmt=this.getFullYear();
  }
  var o = {
    "M+" : this.getMonth() + 1,
    "d+" : this.getDate(),
    "h+" : this.getHours(),
    "m+" : this.getMinutes(),
    "s+" : this.getSeconds(),
    "q+" : Math.floor((this.getMonth() + 3) / 3),
    "S" : this.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
        .substr(4 - RegExp.$1.length));
  for ( var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
          : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
Vue.prototype.getNormalTime = function(ms){
  let pubTime='';
  if(ms){
      if (isNaN(ms)) {
          pubTime = new Date(ms);
      } else {
          pubTime = new Date(parseInt(ms));
      }
      pubTime = getLocalTime(pubTime.getTime() / 1000);
  }
  if(pubTime!="NaN-aN-aN"&&pubTime!="NaN/aN/aN"){
      return pubTime;
  }else{
      return ms;
  }
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
