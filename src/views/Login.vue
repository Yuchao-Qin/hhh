<template>
  <div class="page">
    <div class="pageContent">
      <h1>logo</h1>
      <h2>渠道商管理平台</h2>
      <el-input placeholder="账号" v-model="user.admin_account_number"></el-input>
      <el-input placeholder="账户密码" v-model="user.password"></el-input>
      <el-button type="primary" @click="userLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/userApi'
import Storage from '@/utils/storage'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      user: {
        admin_account_number: '',
        password: ''
      },
      redirect: '/'
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    async userLogin() {
      let res = await userApi.login(this.user)
      if (res) {
        if (res.code == 200) {
          this.$store.dispatch('setToken', res.data.token)
          this.$store.commit('SET_USER_INFO', res.data)
          Storage.set('userinfo',res.data)
          this.$router.push({ path: this.redirect || '/' })
        } else {
          this.$message(
            this.$message.error(res.message)
          )
        } 
      }
    }
  }
}
</script>
<style lang="scss" scoped>
h1,
h2 {
  margin: 0;
}
.page {
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: #fad961;
  background-image: linear-gradient(86deg, #fad961 0%, #f76b1c 100%);
  background-image: -webkit-linear-gradient(86deg, #fad961 0%, #f76b1c 100%);
  background-image: -moz-linear-gradient(86deg, #fad961 0%, #f76b1c 100%);
  background-image: -o-linear-gradient(86deg, #fad961 0%, #f76b1c 100%);
  // justify-content:center;
  justify-content: center;
  align-items: center;
}
.pageContent {
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>

