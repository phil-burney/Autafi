import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './routes/routes'
const VueCookie = require('vue-cookie');

const router = new VueRouter({ routes, mode: 'history' });
Vue.use(VueRouter);
Vue.use(VueCookie);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!document.cookie.split('; ').find(row => row.startsWith('name'))) {
      console.log("Invalid access")
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
