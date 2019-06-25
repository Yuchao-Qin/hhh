<template>
  <div class="breadcrumb-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,index) in crumData" :key="index">{{item.name}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>账户权限</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item> -->
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    crumData:Array
  },
  data() {
    return {
      // crumData: this.crumData
    }
  }
}
</script>




<style lang="scss" scoped>
.breadcrumb-box {
  border: 1px solid #e1e1e1;
  padding: 20px;
  border-right: none;
  border-left: none;
}
</style>

