<template>
  <div class="breadcrumb-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,index) in crumData.breadItem" :key="index">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-button v-if="crumData.leadingOut" size="mini" type="primary">导出数据</el-button>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    crumData: Object
  },
  data() {
    return {
      headers:{'Content-Type': 'multipart/form-data'}
      // crumData: this.crumData
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>




<style lang="scss" scoped>
.breadcrumb-box {
  border: 1px solid #e1e1e1;
  padding: 15px;
  border-right: none;
  border-left: none;
  display: flex;
  justify-content: space-between;
}

.el-breadcrumb {
  display: flex;
  align-items: center;
}
</style>

