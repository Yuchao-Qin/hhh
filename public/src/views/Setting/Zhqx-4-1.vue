<template>
  <div class="page">
    <div class="breadcrumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>账户权限</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-radio-group v-model="radio1" class="radioGroup">
      <el-radio-button label="账户管理"></el-radio-button>
      <el-radio-button label="权限管理"></el-radio-button>
    </el-radio-group>
    <div class="tableContainer">
      <div class="tableTitle">
        <span class="tableName">账户列表</span>
        <el-button class="addAccount" type="primary">+ 新增用户</el-button>
      </div>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="accountNumber" label="账号">
        </el-table-column>
        <el-table-column prop="character" label="角色">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号">
        </el-table-column>
        <el-table-column prop="staus" label="状态">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <el-button type="text" size="small" class="delet">删除</el-button>
          <el-button type="text" size="small">修改</el-button>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      radio1: '账户管理',
      tableData: [
        {
          accountNumber: '2016-05-02',
          character: '管理员',
          name: '王小虎',
          phoneNumber: '13888888888',
          staus: 200
        },
        {
          accountNumber: '2016-05-04',
          character: '管理员',
          name: '王小虎',
          phoneNumber: '13888888888',
          staus: 200
        },
        {
          accountNumber: '2016-05-01',
          character: '管理员',
          name: '王小虎',
          phoneNumber: '13888888888',
          staus: 200
        },
        {
          accountNumber: '2016-05-03',
          character: '管理员',
          name: '王小虎',
          phoneNumber: '13888888888',
          staus: 200
        }
      ]
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

.radioGroup {
  margin: 5px 0;
}

.tableContainer {
  padding-left: 10px;
  .tableTitle {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .tableName {
      font-weight: bold;
      margin-right:20px;
      align-self: flex-end;
    }
    .addAccount {
      margin-right: 20px;
    }
  }
}

.delet {
  color: red;
}
</style>


