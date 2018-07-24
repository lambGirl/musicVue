import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';
import App from './App';
import router from './router/index.js';
import store from './store/index';
import vueLazy from 'vue-lazyload';
import './common/less/index.less';
import loadImg from './common/image/default.png';
fastclick.attach(document.body);
Vue.use(vueLazy,{
  loading:loadImg
});
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
