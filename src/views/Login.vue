<template>
  <div class="page">
    <div class="pageContent">
      <h1>logo</h1>
      <h2>渠道商管理平台</h2>
      <el-input placeholder="账号"></el-input>
      <el-input placeholder="账户密码"></el-input>
      <el-button type="primary">登录</el-button>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/userApi'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    async userLogin() {
      let res = await userApi.login(this.user)
      if (res) {
        this.$store.dispatch('setToken', res.result.token)
        this.$router.push({ path: this.redirect || '/' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
h1, h2 {
  margin: 0;
}
.page {
  display: flex;
  height: 100vh;
  flex-direction: column;
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

