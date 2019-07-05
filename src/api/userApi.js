import request from "@/utils/request";

const user = {
  //登录
  login({ admin_account_number, password }) {
    console.log({
      admin_account_number,
      password
    })
    return request({
      url: "/re/login",
      method: "post",
      params: {
        admin_account_number,
        password
      }
    });
  },
  //用户信息
  getInfo({ token }) {
    return request({
      url: "/userInfo",
      method: "post",
      params: {
        token
      }
    });
  },
  //登出
  logOut({ token }) {
    return request({
      url: "/userLogout",
      method: "post",
      params: {
        token
      }
    });
  }
};
export default user;