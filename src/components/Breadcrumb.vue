<template>
  <div class="breadcrumb-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-upload class="upload-demo" action="http://192.168.3.5/project/tb_coupon/tp_coupon/public/upload"
        :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
        multiple :limit="3" :on-exceed="handleExceed">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload> -->
      <input type="file" name="file" ref="file" @change="handleFileChnage">
      <el-breadcrumb-item v-for="(item,index) in crumData.breadItem" :key="index">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-button v-if="crumData.leadingOut" size="mini" type="primary">导出数据</el-button>
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
      // headers: { 'Content-Type': 'multipart/form-data' },
      fileName: '',
      file: ''
      // crumData: this.crumData
    }
  },
  methods: {
    handleFileChnage(e) {
      let file = e.target.files[0]
      this.fileName = file.name
      this.file = file
      let formData = new FormData()
      formData.append('file', file)
      console.log(formData.get('file'))
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

