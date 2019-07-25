import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import 'element-ui/lib/theme-chalk/index.css';
import VueCropper from 'vue-cropper';
import "./publicStyle/public.css";
import Request from '@/utils/request.js';
import { Message,Loading,MessageBox } from 'element-ui';
import { pre } from "@/permission"; //路由访问权限
pre();
let loading = null;
Vue.prototype.$startLoading = function () {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

Vue.prototype.$endLoading = function () {
  loading.close()
}
Vue.prototype.$message = Message;
Vue.prototype.$http = Request;
Vue.prototype.$confirm = MessageBox.confirm ;



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
         DatePicker,
         Divider,
         Popover,
         Upload,
         Tag,
         Image,
         ColorPicker,
         InputNumber
        } from "element-ui";
        
Vue.config.productionTip = false;

// 注册组件
Vue.use(VueCropper);
Vue.use(InputNumber);
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
Vue.use(Divider);
Vue.use(Select);
Vue.use(Collapse);
Vue.use(Popover);
Vue.use(Upload);
Vue.use(Tag);
Vue.use(Image);
Vue.use(ColorPicker);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

console.log(process.env.BASE_URL)
