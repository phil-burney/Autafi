import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './routes/routes'
import axios from 'axios'
import * as config from "./config.json";
import VueCookies from 'vue-cookie'

const router = new VueRouter({ routes });
Vue.use(VueRouter);
Vue.use(VueCookies);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem(config.TOKEN) == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  el: "#app",
  router: router,
  render: h => h(App),
}).$mount('#app')
