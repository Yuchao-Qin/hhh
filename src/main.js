import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
// import "@/permission"; //路由访问权限
import { Button, Checkbox, Row, Col, Icon} from "element-ui";
Vue.config.productionTip = false;

// 注册组件
Vue.use(ElementUI);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

console.log(process.env.BASE_URL)
