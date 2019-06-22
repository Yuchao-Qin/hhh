import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("./views/Login.vue")
    },
    {
      path: '/',
      name: 'home',
      component: () => import("./views/Home.vue"),
      children: [{
        path:'DataSee1-1',
        name:'DataSee1-1',
        components:  {default1:()=>import("./views/DataSee1-1")}
      }]
    }
  ]
})
