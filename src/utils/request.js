import axios from "axios";
import store from "../store";
import { Loading } from "element-ui";
import Storage from "@/utils/storage";
// import { pre } from "@/permission"; //路由访问权限
import router from "@/router";

let loading;
let $startLoading = function () {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
var $endLoading = function () {   
  loading.close()
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL, // api 的 base_url
  // timeout: 5000 // 请求超时时间
  // withCredentials: true,
});

// request拦截器
service.interceptors.request.use(
  
  config => {
    if (store.getters.token) {
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.headers["authorization"] = store.getters.token;
    }
    if (config.method === "post") {
      config.data = config.params;
      config.params = "";
    }
    $startLoading()
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  
  response => {
    let { data, code, result, message } = response.data;
    if (code !== 200) {
      // if(status===500) 处理token过期等
      // return Promise.resolve(false);
      $endLoading()
      return { data, result, message, code };
    } else {
      $endLoading()
      return { data, result, message, code };
     
    }
  },
  error => {
    // console.log(error)
    console.log("err" + error); // for debug
    let { data, code,  message } = error.response.data
    if (code == 401 && message == "无效的token") {
      // console.log(112312321321)
      Storage.del('token');
      Storage.del('routeName');
      router.push({name:'Login'})
      // pre();
    }
    return Promise.reject(error);
    // $endLoading()
  }
);
service.__proto__ = axios
export default service;