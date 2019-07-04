<template>
  <div class="breadcrumb-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <span class="el-breadcrumb__item_box"
        v-for="(item,index) in crumData.breadItem" :key="index">
        <el-breadcrumb-item v-if="item.bits"
          :to="{name:item.bits,params:item.params}">
          {{item.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else>{{item.name}}
        </el-breadcrumb-item>
      </span>
    </el-breadcrumb>
    <div>
      <input class="fileInput" accept=".csv" type="file" name="file" ref="file"
        @change="handleFileChnage">
      <el-button v-if="crumData.leadingIn" type="primary" @click="upLoad"
        multiple size="mini">表格上传</el-button>
      <el-button v-if="crumData.leadingOut" size="mini" type="primary">数据导出
      </el-button>
    </div>

  </div>
</template>

<script>
import request from '@/utils/request.js'
export default {
  props: {
    crumData: Object
  },
  data() {
    return {
      fileName: '',
      file: ''
    }
  },
  methods: {
    handleFileChnage(e) {
      let file = e.target.files[0]
      this.fileName = file.name
      this.file = file
      let formData = new FormData()
      formData.append('file', file)
      console.log(console.log(file.value))
      request({
        method: 'get',
        url: '/product/export',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: formData
      }).then(res => {
        console.log(res)
      })
    },
    upLoad() {
      console.log(this.$refs.file.submit, 1)
      this.$refs.file.click()
    },
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
  height: 28px;
  border-right: 0;
  border-left: 0;
  display: flex;
  justify-content: space-between;
}

.el-breadcrumb {
  display: flex;
  align-items: center;
}

.fileInput {
  display: none;
}
</style>

<style>
.el-breadcrumb__item:last-child .el-breadcrumb__separator {
  display: inline;
}

.el-breadcrumb__item_box:last-child .el-breadcrumb__inner_box:hover {
  font-weight: 400;
  color: #606266;
  cursor: text;
}

.el-breadcrumb__inner.is-link {
  font-weight: 700 !important;
}
.el-breadcrumb__inner.is-link:hover {
  font-weight: 700 !important;
  color: #409eff !important;
  cursor: pointer !important;
}
</style>

