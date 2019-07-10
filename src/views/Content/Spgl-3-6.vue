<template>
  <!-- 用户管理 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="6" class="searchContainer fl">
          <el-input size="mini" placeholder="请输入内容"
            v-model="searchItem.searchValue" class="searchInput">
            <el-select v-model="searchItem.searchSelect" slot="prepend"
              class="searchSelect" placeholder="请选择">
              <el-option label="商品ID" value="gid"></el-option>
              <el-option label="商品名称" value="name"></el-option>
              <el-option label="商品类目" value="type"></el-option>
            </el-select>
          </el-input>
        </span>
        <span :span="8" class="fr">
          <el-button size="mini" type="primary" @click="search">筛选</el-button>
          <el-button size="mini" type="primary">查看全部</el-button>
          <el-button size="mini" type="primary" @click="deleTable">删除选中项
          </el-button>
          <el-popover class="popoverButton" placement="left" width="200"
            trigger="click" v-model="subjectVisible">
            <el-select size="mini" v-model="subjectMenu">
              <!-- <el-option value="1" label="专题A"></el-option>
              <el-option value="2" label="专题B"></el-option>
              <el-option value="3" label="专题C"></el-option> -->
              <el-option v-for="(item,index) in menuList" :key="index"
                :value="item.id" :label="item.title"></el-option>
            </el-select>
            <div class="addMenuButtonContainer">
              <el-button size="mini" type="primary"
                @click="subjectVisible=false">确认添加</el-button>
            </div>
            <el-button slot="reference" size="mini" type="primary">添加至专题
            </el-button>
          </el-popover>

          <el-popover class="popoverButton" placement="left" width="200"
            trigger="click" v-model="menuVisible">
            <el-select size="mini" v-model="mid">
              <el-option v-for="(item,index) in menuList" :key="index"
                :value="item.id" :label="item.title"></el-option>
            </el-select>
            <div class="addMenuButtonContainer">
              <el-button size="mini" type="primary" @click="addMenu">
                确认添加</el-button>
            </div>
            <el-button slot="reference" size="mini" type="primary">添加至菜单
            </el-button>
          </el-popover>

        </span>
      </div>
      <div class="scroll">
        <div class="table-con">
          <el-table ref="multipleTable" size="mini" max-height="650"
            style="width:100%" @selection-change="handleSelectionTable"
            :fit="true" :data="tableData" border stripe>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="编号">
            </el-table-column>
            <el-table-column prop="gid" label="商品ID">
            </el-table-column>
            <el-table-column prop="name" label="商品名称">
            </el-table-column>
            <el-table-column prop="pic" label="商品主图">
              <template slot-scope="scope">
                <a :href="scope.row.pic" target="view_window">
                  <el-image style="width: 100px; height: 100px"
                    :src="scope.row.pic" fit="fill"></el-image>
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="detail_url" label="商品详情页链接地址">
              <template slot-scope="scope">
                <a :href="scope.row.detail_url"
                  target="view_window">{{scope.row.detail_url}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="first_type" label="商品一级类目">
            </el-table-column>
            <el-table-column prop="price" label="商品价格（元）">
            </el-table-column>
            <el-table-column prop="sales_volume" label="商品月销量">
            </el-table-column>
            <el-table-column prop="shop_name" label="店铺名称">
            </el-table-column>
            <el-table-column prop="coupon_id" label="优惠券ID">
            </el-table-column>
            <el-table-column prop="coupon_remainder" label="优惠券剩余量">
            </el-table-column>
            <el-table-column prop="coupon_amount" label="优惠券面额">
            </el-table-column>
            <el-table-column prop="coupon_start" :formatter="formatDate"
              label="优惠券开始时间">
            </el-table-column>
            <el-table-column prop="end_start" :formatter="formatDate"
              label="优惠券结束时间">
            </el-table-column>

          </el-table>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination v-if="total>10" class="pagination" background
        layout="prev, pager, next" @current-change="handleCurrentChange"
        :current-page.sync="currentPage" :total="total">
      </el-pagination>
    </div>

    <!-- 编辑模态 -->
    <el-dialog width="30%" title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="微信昵称" prop="nickName">
          <el-input v-model="ruleForm.account" size="small" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input type="password" size="small" v-model="ruleForm.pass"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="绑定商家" prop="bangding">
          <el-input type="password" size="small" v-model="ruleForm.checkPass"
            autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <vueCropper>111111</vueCropper>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import { isNull } from 'util'
export default {
  data() {
    return {
      searchItem: {
        searchValue: '',
        searchSelect: ''
      },
      menuList: {},
      slectInputData: null,
      searchData: {},
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      dialogTableVisible: false,
      radio1: '账户管理',
      crumData: {
        breadItem: [{ name: '内容' }, { name: '商品管理' }],
        leadingIn: true,
        leadingOut: true
      },
      tableData: [],
      value1: '',
      value2: '',
      multipleSelection: [],
      ruleForm: {
        nickName: '',
        phoneNumber: '',
        bangding: ''
      },
      mid: '',
      menuVisible: false,
      subjectVisible: false,
      subjectMenu: ''
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData = [{ name: '设置' }, { name: '账户权限' }, { name: newValue }]
    }
  },
  methods: {
    formatDate(row, column) {
      let date = new Date(parseInt(row.coupon_start) * 1000)
      let Y = date.getFullYear() + '-'
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-'
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
    // 筛选
    search() {
      console.log(isNull)
      let { searchSelect, searchValue } = this.searchItem
      this.slectInputData = { [searchSelect]: searchValue }
      this.searchData = { ...this.slectInputData }
      console.log(this.searchData)
      this.tableListData(this.searchData).then(res => {
        this.tableData = res.data.data_list.list
        this.total = res.data.data_list.total
        this.currentPage = 1
      })
    },
    // 分页
    handleCurrentChange(val) {
      console.log(isNull(this.slectInputData))

      if (!isNull(this.slectInputData)) {
        this.searchItem.searchSelect = Object.keys(this.slectInputData)[0]
        this.searchItem.searchValue = this.slectInputData[this.searchItem.searchSelect]
      } else {
        this.searchItem.searchSelect = ''
        this.searchItem.searchValue = ''
      }
      console.log(val)
      this.searchData.page = val
      this.tableListData(this.searchData).then(res => {
        this.tableData = res.data.data_list.list
      })
    },
    // 选中项数据
    handleSelectionTable(val) {
      this.multipleSelection = val
    },
    // 删除选中项
    deleTable() {
      if (this.multipleSelection.length == 0) { 
        this.$message.error('请选择商品')
        return
      }
      let deletIdArr = this.multipleSelection.map(item => {
        return item.id
      })
      let stringdelet = deletIdArr.join(',')
      this.tableDeleApi({ ids: stringdelet }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.tableListData().then(res => {
            console.log(res)
            this.tableData = res.data.data_list.list
            this.total = res.data.data_list.total
            if (res.data.data_list.list.length == 0 && this.currentPage > 0) {
              this.currentPage -= 1
              this.tableListData().then(res => {
                this.tableData = res.data.data_list.list
                this.total = res.data.data_list.total
              })
            }
          })
        }
      })
    },
    edit() {
      this.dialogFormVisible = true
    },
    toBillDetail() {
      this.$router.push({ name: 'BillDetail' })
    },
    // 添加至菜单按钮
    addMenu() {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请选择商品')
        return
      }
      let addMenuArr = this.multipleSelection.map(item => {
        return item.id
      })
      let stringMenu = addMenuArr.join(',')
      this.addMenuApi({ mid: this.mid, ids: stringMenu }).then(res => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.menuVisible = false
          this.$refs.multipleTable.clearSelection()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    async tableListData(params = { page: this.currentPage }) {
      let res = await this.$http({
        method: 'get',
        url: `/product/lists${params.page ? '/' + params.page : ''}`,
        params: {
          limit: 10,
          ...params
        }
      })
      return res
    },
    async tableDeleApi(params) {
      let res = await this.$http({
        method: 'DELETE',
        url: `/product/all`,
        params: { ...params }
      })
      return res
    },
    // 菜单列表
    async menuListApi() {
      let res = await this.$http({
        method: 'GET',
        url: '/menu/lists'
      })
      if (res.code == 200) {
        this.menuList = res.data
      }
    },
    // 添加之菜单
    async addMenuApi(params = {}) {
      let res = this.$http.post('/product/group', { ...params })

      return res
    }
  },

  mounted() {
    this.tableListData().then(res => {
      if (res.code == 200) {
        this.tableData = res.data.data_list.list
        this.total = res.data.data_list.total
      } else {
        this.$messgae.error(res.message)
      }
    })
    this.menuListApi()
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="scss" scoped>
// .scroll{
//   width: 100%;
//   overflow-x:auto;
// }
.popoverButton {
  margin-left: 10px;
}

.table-con {
  overflow: auto;
}
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.headGroup {
  padding-top: 20px;
  text-align: left;
}

.tableContainer {
  text-align: left;
  padding: 0 15px;
  .tableTitle {
    padding: 10px 0;
  }
}

.tableName {
  font-weight: bold;
  align-self: flex-end;
  text-align: right;
}
.addAccount {
  text-align: left;
}
.delet {
  color: red;
}

.searchInput {
  width: 80%;
}

.calendar {
  max-width: 200px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.calendarContainer {
  display: flex;
  .el-input-group__append {
    width: 13px;
  }
  .calendarButton {
    font-size: 1px;
    margin: -5px -20px;
  }
}

.el-select .el-input {
  width: 130px;
}

.searchSelect {
  width: 100px;
}

.vue-cropper {
  height: 100px;
}

.addMenuButtonContainer {
  text-align: center;
  margin-top: 28px;
}

// .el-table--scrollable-y .el-table__body-wrapper {
//   overflow-x:auto;
// }
</style>

<style>
.searchContainer .searchInput .el-input-group__prepend {
  background: #fff;
}

/* table{table-layout:auto;word-break:break-all;} */
/* .el-table__body, .el-table__footer, .el-table__header{
  table-layout:auto !important;
} */
</style>