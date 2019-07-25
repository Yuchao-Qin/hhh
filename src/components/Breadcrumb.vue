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
        @change="handleFileChnage" >
      <el-button v-if="crumData.leadingIn" type="primary" @click="upLoad"
        multiple size="mini">表格上传</el-button>
      <el-button v-if="crumData.leadingOut" size="mini" @click="downLoad" type="primary">
        <slot name="out">商品导出</slot>
        
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
      file: '',
      formData:null
    }
  },
  methods: {
    handleFileChnage(e) {
      let file = e.target.files[0]
      this.fileName = file.name
      this.file = file
      this.formData = new FormData()
      this.formData.append('file', file)
      // console.log(file)
      // console.log(formData.get('file'))
      this.$emit('update:formData',this.formData)
      // console.log(this.formData)
      // request({
      //   method: 'post',
      //   url: '/product/save',
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   data: this.formData
      // }).then(res => {
      //   console.log(res)
      // })
    },
    upLoad() {
      this.$refs.file.click()
    },
    downLoad() {
      this.$emit('downLoad')
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

