<template>
  <div  class="calendarContainer">
    <el-date-picker @change ="$emit('Datepicker',value1)" size="mini" v-model="value1" type="daterange" class="calendar"
      range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
    <div class="el-input-group__append">
      <el-button class="calendarButton" icon="el-icon-search"></el-button>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.calendarContainer {
  display: flex;
  width: 270px;
  .el-input-group__append {
    width: 13px;
  }
  .calendarButton {
    font-size: 1px;
    margin: -5px -20px;
  }
}
</style>

