<template>
  <div>
    <el-button @click="testClick" type="primary">click</el-button>
    <div>{{childValue}}</div>
  </div>

</template>
<script>
export default {
  props: ['pic'],
  data () {
    return {
      childValue:0
    }
  },
  methods:{
    testClick() {
      this.$emit('update:pic',this.childValue++)
    }
  }
}
</script>
