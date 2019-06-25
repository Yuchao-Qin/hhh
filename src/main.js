import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
// import "@/permission"; //路由访问权限
import { Option, 
         Select,
         Input,
         FormItem,
         Form,
         Button,
         Checkbox,
         Row, 
         Col, 
         Icon, 
         Collapse, 
         CollapseItem, 
         RadioButton, 
         RadioGroup, 
         Menu, 
         Submenu, 
         MenuItemGroup, 
         MenuItem, 
         Breadcrumb, 
         BreadcrumbItem, 
         Table, 
         TableColumn, 
         Scrollbar, 
         Pagination 
         ,Dialog , 
         CheckboxGroup, 
         DatePicker
        } from "element-ui";
        
Vue.config.productionTip = false;

// 注册组件
Vue.use(Option);
Vue.use(Select);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
// Vue.use(Radio);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Menu);
Vue.use(RadioButton);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Scrollbar);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(CheckboxGroup);
Vue.use(DatePicker);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

console.log(process.env.BASE_URL)
