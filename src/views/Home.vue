<template>
  <div class="homePage">
    <!-- titleHeader -->
    <el-row class="pageTitle" type="flex" justify="space-between">
      <el-col class="homeTitle">
            <h1 class="logo">logo</h1>
            <h3>后台管理平台</h3>
      </el-col>
      <el-col class="userName">
            <i class="el-icon-user">xxx管理员</i>
            <i class="el-icon-switch-button logOut">退出</i>
      </el-col>
    </el-row>
    <!-- content -->
    <el-row class="content">
      <el-col :span="5">
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @select="handleSelect" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">导航一</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="1-1hahahhahaha">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">导航二</span>
  </el-menu-item>
  <el-menu-item index="3">
    <i class="el-icon-document"></i>
    <span slot="title">导航三</span>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <span slot="title">导航四</span>
  </el-menu-item>
</el-menu>
      </el-col>
      <el-col :span="16">
        <router-view class="view one" name="default1"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    isCollapse: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index, indexPath, e) {
      console.log(index, e.target) 
      this.$router.push({name:"DataSee1-1"})
    },
    userLogout() {
      this.$store.dispatch('logOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pageTitle {
  background: #409EFF;
  color: #fff;
}
.homeTitle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .logo {
    width: 200px;
  }
}
.userName {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    i {
      flex: none;
    }
    .logOut {
      margin-right: 20px;
    }
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

