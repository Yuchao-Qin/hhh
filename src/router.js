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
      children: [
      {
        path:'OverView/Sjck-1-1',
        name:'Sjck-1-1',
        components:  {default1:()=>import("./views/OverView/Sjck-1-1")}
      },
      {
        path:'Management/Yhgl-2-1',
        name:'Yhgl-2-1',
        components:  {default1:()=>import("./views/Management/Yhgl-2-1")},
      },
      {
        path:'Management/Sjgl-2-2',
        name:'Sjgl-2-2',
        components:  {default1:()=>import("./views/Management/Sjgl-2-2")}
      },
      {
        path:'Management/Kqgl-2-3',
        name:'Kqgl-2-3',
        components:  {default1:()=>import("./views/Management/Kqgl-2-3")}
      },
      {
        path:'Management/Fkgl-2-4',
        name:'Fkgl-2-4',
        components:  {default1:()=>import("./views/Management/Fkgl-2-4")}
      },
      {
        path:'Content/Gggl-3-1',
        name:'Gggl-3-1',
        components:  {default1:()=>import("./views/Content/Gggl-3-1")}
      },
      {
        path:'Content/Dhgl-3-2',
        name:'Dhgl-3-2',
        components:  {default1:()=>import("./views/Content/Dhgl-3-2")}
      },
      {
        path:'Content/Cdgl-3-3',
        name:'Cdgl-3-3',
        components:  {default1:()=>import("./views/Content/Cdgl-3-3")}
      },
      {
        path:'Content/Ztgl-3-4',
        name:'Ztgl-3-4',
        components:  {default1:()=>import("./views/Content/Ztgl-3-4")}
      },
      {
        path:'Content/Qtgl-3-5',
        name:'Qtgl-3-5',
        components:  {default1:()=>import("./views/Content/Qtgl-3-5")}
      },
      {
        path:'Content/Spgl-3-6',
        name:'Spgl-3-6',
        components:  {default1:()=>import("./views/Content/Spgl-3-6")}
      },
      {
        path:'Setting/Zhqx-4-1',
        name:'Zhqx-4-1',
        components:  {default1:()=>import("./views/Setting/Zhqx-4-1")}
      },
      {
        path:'Setting/Gzrz-4-2',
        name:'Gzrz-4-2',
        components:  {default1:()=>import("./views/Setting/Gzrz-4-2")}
      },
      {
        path:'Setting/Tjqx-4-3',
        name:'Tjqx-4-3',
        components:  {default1:()=>import("./views/Setting/Tjqx-4-3")}
      },
      {
        path:'Management/Yhgl-2-1/BillDetail',
        name:'BillDetail',
        components:  {default1:()=>import("./views/Management/inPage/BillDetail")},
      },
      {
        path:'Management/Yhgl-2-2/userManager',
        name:'userManager',
        components:  {default1:()=>import("./views/Management/inPage/userManager")},
      },
      {
        path:'Content/Ztgl-3-4/ProdectManage',
        name:'ProdectManage',
        components:  {default1:()=>import("./views/Content/inPage/ProdectManage")},
      },
      {
        path:'Content/Ztgl-3-4/MenuManage',
        name:'MenuManage',
        components:  {default1:()=>import("./views/Content/inPage/MenuManage")},
      },
      {
        path:'Content/Zhqx-4-1/permissions/:id/:name',
        name:'permissions',
        components:  {default1:()=>import("./views/Setting/inPage/permissions")},
      },
    ]
    }
  ]
})
