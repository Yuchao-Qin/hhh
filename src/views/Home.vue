<template>
  <div class="homePage">
    <!-- titleHeader -->
    <el-row class="pageTitle" type="flex">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div>
            <h1 class="logo"></h1>
            <div>后台管理平台</div>
          </div>
          <div>
            <i class="el-icon-message">xxx管理员</i>
            <div icon="el-icon-switch-button">退出</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- content -->
    <el-row class="content">
      <el-col :span="4">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    userLogout() {
      this.$store.dispatch('logOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

