<template>
  <div class="pageImage">
    <input class="fileInput" type="file" name="file" ref="file"
      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
      @change="handleFileChnage">
    <!-- <el-button type="primary" @click="upLoad" multiple size="mini">
      <slot>上传图片</slot>
    </el-button> -->
    <div class="upLoadImg" style="">
      <el-image style="width:100px;" fit="fill" :src="upImg">
        <slot slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </slot>
      </el-image>
    </div>
    <el-button @click="upLoad" type="primary" size="mini" class="upBtn"><slot name="picBtn"><slot>点击上传图片</slot></slot>
    </el-button>
    <!-- <img :src="upImg" alt=""> -->
  </div>
</template>
<script>
export default {
  props: ['upImgEdit'],
  data() {
    return {
      fileName: '',
      file: '',
      formData: null,
      pid: '',
      upImg: this.upImgEdit,
    }
  },
  methods: {
    handleFileChnage(e) {
      let file = e.target.files[0]
      let that = this
      this.fileName = file.name
      this.file = file
      this.formData = new FormData()
      this.formData.append('file', file)
      this.$http({
        method: 'post',
        url: '/upload',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: this.formData
      }).then(res => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = e => {
          that.upImg = e.target.result
        }
        this.pid = res.data.id
        that.$emit('update:pid', that.pid )
      })
    },
    upLoad() {
      this.$refs.file.click()
    }
  },
  mounted() {
  },
  destroyed() {
    console.log(1)
  }
}
</script>
<style lang="scss">
.upLoadImg {
  text-align: center;
  color: #c0c4cc;
  background: #f5f7fa;
  width: 100px;
  height: 100px;
  font-size: 14px;
  color: #c0c4cc;
  line-height: 100px;
  margin: auto;
  .el-image {
    line-height: 100px;
    img {
      display: inline-block;
      vertical-align: middle;
    }
  }
}

.upBtn {
  margin-top: 10px;
}

.fileInput {
  display: none;
}
.pageImage {
  text-align: center;

}
</style>


