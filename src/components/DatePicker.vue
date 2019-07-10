<template>
  <div class="calendarContainer">
    <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="value1"
      type="daterange" class="calendar" range-separator="至"
      start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
    <!-- <div class="el-input-group__append">
      <el-button class="calendarButton" @click="$emit('DatepickerSend')" icon="el-icon-search"></el-button>
    </div> -->

  </div>
</template>
<script>
export default {
  props: ['pic'],
  data() {
    return {
      value1: '',
    }
  },
  watch: {
    pic(newVal, oldVal) {
      this.value1 = newVal
    },
    value1(newVal, oldVal) {
      console.log(newVal)
      this.$emit('update:pic', newVal)
    }
  }
}
</script>
<style lang="scss" scoped>
.calendarContainer {
  display: flex;
  width: 280px;
  height: 28px;
  .el-input-group__append {
    width: 13px;
    height: 26px;
  }
  .calendarButton {
    font-size: 1px;
    margin: -5px -20px;
  }
}
</style>

