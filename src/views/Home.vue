<template>
  <div class="homePage">
    <!-- titleHeader -->
    <el-row class="pageTitle" type="flex" justify="space-between">
      <el-col :span="10" class="homeTitle">
        <h1 class="logo">logo</h1>
        <h3>后台管理平台</h3>
      </el-col>
      <el-col class="userName">
        <i class="el-icon-user">{{userinfo.admin_name}}</i>
        <i class="el-icon-switch-button logOut" @click="logOut">退出</i>
      </el-col>
    </el-row>
    <!-- content -->
    <el-row class="content" type="flex" justify="space-between">
      <el-col class="contentNav">
        <el-scrollbar>
          <el-menu :default-active="refreshActive" class="el-menu-vertical-demo menu-native"
            @open="handleOpen" @select="handleSelect" :collapse="isCollapse">
            <el-submenu v-for="(titleItem, titleIndex) in menuData"
              :key="titleIndex" :index="(titleIndex + 1).toString()">
              <template slot="title">
                <i :class="titleItem.icon"></i>
                <span slot="title" v-html="titleItem.title"></span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(modulItem, itemIndex) in titleItem.item"
                  :key="itemIndex" :index="modulItem.index">{{ modulItem.name
                  }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-col>
      <el-col class="contentContainer">
        <router-view class="view one" name="default1"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Storage from '@/utils/storage.js'
export default {
  data() {
    return {
      isCollapse: false,
      userinfo:'',
      menuData: [
        { title: '数据查看', icon: 'el-icon-pie-chart', item: [{ name: '数据查看', index: 'sjck-1-1' }] },
        {
          title: '管理',
          icon: 'el-icon-menu',
          item: [
            { name: '用户管理', index: 'yhgl-2-1' },
            { name: '商家管理', index: 'sjgl-2-2' },
            { name: '卡券管理', index: 'kqgl-2-3' },
            { name: '反馈管理', index: 'fkgl-2-4' }
          ]
        },
        {
          title: '内容',
          icon: 'el-icon-folder-opened',
          item: [
            { name: '商品管理', index: 'spgl-3-6' },
            { name: '广告管理', index: 'gggl-3-1' },
            { name: '导航管理', index: 'dhgl-3-2' },
            { name: '菜单管理', index: 'cdgl-3-3' },
            { name: '专题管理', index: 'ztgl-3-4' },
            { name: '其他管理', index: 'qtgl-3-5' }
          ]
        },
        {
          title: '设置',
          icon: 'el-icon-setting',
          item: [
            { name: '账户管理', index: 'zhqx-4-1' },
            { name: '工作日志', index: 'gzrz-4-2' },
            { name: '权限管理', index: 'tjqx-4-3' }
          ]
        }
      ]
    }
  },
  computed: {
    // ...mapGetters(['userInfo']),
    refreshActive() {
      return Storage.get('routeName')
    }
  },
  mounted() {
    // this.$router.push({ name:'Sjck-1-1' })
    this.userinfo = JSON.parse(Storage.get('userinfo'));
    
  },
  beforeRouteEnter(to, from, next) {
    console.log(from)
    if (from.name == 'Login') {
      Storage.set('routeName', 'sjck-1-1')
    }
    next()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(index, indexPath, e) {
      const name = index.slice(0, 1).toUpperCase() + index.slice(1)
      this.$router.push({ name })
      Storage.set('routeName', index)
    },
    userLogout() {
      this.$store.dispatch('logOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    logOut() {
      this.$http({
        url: '/re/logout',
        method: 'POST'
      }).then(res => {
        if (res.code == 200) {
          Storage.del('token')
          Storage.del('routeName')
          window.location.reload()
          this.$message({
            type: 'success',
            message: '退出成功'
          })
        }
      })
    }
    // ...mapMutations(['set_routeName'])
  }
}
</script>

<style lang="scss" scoped>
h1,h3{
  margin: 10px 0;
}
.logOut{
  cursor:pointer;
}
.pageTitle {
  background: #409eff;
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
  width: 204px;
  height: calc(100vh - 78px);
}

.contentNav {
  width: 206px;
}

.contentContainer {
  width: calc(100% - 215px);
}

//  .el-submenu__title {
//   text-align: left !important;
// }

// .menu-native .el-submenu__title {
//   text-align: left;
// }
// .content {
//   overflow: auto;
// }

// .el-menu {
//   overflow-y: auto;
//   overflow-x: hidden;
// }
</style>
<style>
.menu-native .el-submenu__title {
   text-align: left;
 }

.menu-native .el-submenu .el-menu-item {
  text-align: left;
}
</style>

