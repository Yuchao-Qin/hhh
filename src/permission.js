// 路由访问权限
import router from "./router";
import store from "./store";
import Storage from "@/utils/storage"; // 验权
function pre() {

  const whiteList = ["/login"]; // 不重定向白名单
  return router.beforeEach((to, from, next) => {
    console.log(to,from);
    if (Storage.get("token")) {
      console.log()
      if (to.path === "/login") {
        next({ path: "/" });
      } else {
        // if (!store.getters.userInfo) {
        //   console.log('why')
        //   // store.dispatch("getUserInfo");
        //   // store.commit("SET_USER_INFO", res.result.userInfo);
        //   next();
        // }
        next();
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        console.log('why1')
        next();
      } else {
        console.log('why2')
        next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      }
    }
  });
}
export {pre}

