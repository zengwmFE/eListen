// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/"
import 'vue-awesome/icons/angle-right'
import 'vue-awesome/icons/angle-left'
import 'vue-awesome/icons/align-justify'

import 'vue-awesome/icons/angle-down'
import 'vue-awesome/icons/home';
import 'vue-awesome/icons/book';
import 'vue-awesome/icons/heartbeat';
import 'vue-awesome/icons/clock';
import 'vue-awesome/icons/music'
import 'vue-awesome/icons/paw';
import 'vue-awesome/icons/music';
import 'vue-awesome/icons/hand-point-up';
import 'vue-awesome/icons/times-circle';
import 'vue-awesome/icons/retweet';
import 'vue-awesome/icons/random';
import 'vue-awesome/icons/download';
import 'vue-awesome/icons/share';
import Icon from 'vue-awesome/components/Icon'
require("@/assets/css/base.css");
require("@/assets/css/fl.css");
require("@/assets/css/media.css");
import axios from "axios";
import Vueaxios from "vue-axios";
import qs from "qs";
import { mapGetters } from 'vuex'

/*axios.defaults.baseURL = 'http://localhost:3000/';*/
/*axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'*/
Vue.prototype.$http = axios;


Vue.config.productionTip = false;
/*console.log(store.getters.showNav);
console.log(store.getters.showNav);
store.dispatch("hideNav")*/
/* eslint-disable no-new */
//遍历localStorage
/*var storage = [];
var storagelength = window.localStorage.length;
for(var i=1;i<storagelength;i++){
  var getKey=localStorage.key(i);
  var getItem=localStorage.getItem(getKey);
  storage[getKey] = getItem;
}*/

if(localStorage.getItem("userInfo")){
  var userInfo=localStorage.getItem("userInfo");
  var userInfo1 = JSON.parse(userInfo);
  store.dispatch("setUserInfo", userInfo1);
}
console.log(store.state.mutations.userInfo.username);
router.beforeEach((to,from ,next)=>{
  var _this =this;
  if(localStorage.getItem("userInfo")){
    var userInfo=localStorage.getItem("userInfo");
    var userInfo1 = JSON.parse(userInfo);
    store.dispatch("setUserInfo", userInfo1);
  }
    if(to.path==="/"||to.path==="/res"){
      store.dispatch("hideNav");
      store.dispatch("hideTop");
      if(store.state.mutations.userInfo.username){
        next({
          path:'/home'
        });
      }else if(!store.state.mutations.userInfo.username){

        next();
      }

    }

    else if(to.path==="/home"||to.path==="/word"||to.path==="/habit"){

      store.dispatch("showNav");
      store.dispatch('showTop');
      store.dispatch("hideSelfCenter");
      //去除掉localstorage 然后再登陆，直接刷新就会bug  原因：loglevel:webpack-dev-server自动添加localStorage,而且默认位置高于原来的
      //之后再刷新就正常
      if(store.state.mutations.userInfo.username){
        next();
      }else{
        store.dispatch("hideNav");
        store.dispatch("hideTop");
        next({path:"/"});

      }


    }

});

//跨域post请求发送配置请求头
var axios_instance = axios.create({
transformRequest: [function (data) {
  data = qs.stringify(data);
  return data;
}],
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
});
Vue.use(Vueaxios, axios_instance);




Vue.component('icon', Icon);
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
