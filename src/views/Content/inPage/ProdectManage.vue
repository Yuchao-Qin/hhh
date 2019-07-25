<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData" @downLoad="downLoad"></Breadcrumb>
    <h3 class="headGroup">
      {{$route.params.name}}商品管理
    </h3>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="6">
          <el-button size="mini" type="primary" @click="deleteItem">删除所有选项
          </el-button>
        </span>
      </div>
      <el-table size="mini" max-height="550" :data="tableData" border stripe
        @selection-change="handleSelectionTable" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="gid" label="商品ID">
        </el-table-column>
        <el-table-column prop="name" label="商品名称">
        </el-table-column>
        <el-table-column prop="pic" label="商品主图">
          <template slot-scope="scope">
            <a :href="scope.row.pic" target="view_window">
              <el-image style="width: 100px; height: 100px" :src="scope.row.pic"
                fit="fill">
              </el-image>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="detail_url" label="商品详情页链接地址">
          <template slot-scope="scope">
            <a :href="scope.row.pic" target="view_window">
              {{scope.row.pic}}
            </a>
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
        <el-table-column prop="coupon_denomination" label="优惠券面额">
        </el-table-column>
        <el-table-column prop="coupon_start" :formatter="formatDate"
          label="优惠券开始时间">
        </el-table-column>
        <el-table-column prop="coupon_end" :formatter="formatDate"
          label="优惠券结束时间">
        </el-table-column>
        <el-table-column prop="coupon_link" label="优惠券链接">
          <template slot-scope="scope">
            <a :href="scope.row.coupon_link" target="view_window">
              {{scope.row.coupon_link}}
            </a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加专题模态框 -->
      <el-dialog width="40%" class="addSubjectTitle" title="添加专题"
        :visible.sync="addSubject">
        <el-form label-width="180px" :model="ruleForm" status-icon width="40%"
          class="demo-ruleForm">
          <el-form-item class="jueseName" label="专题类名">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="首页专题图片">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="专题详情页标题">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="专题详情页大图">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="专题详情页跳转商品ID">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  data() {
    return {
      multipleSelection: [],
      total: 0,
      currentPage: 0,
      special_id: this.$route.params.special_id,
      addSubject: false,
      radio1: '账户管理',
      crumData: {
        breadItem: [{ name: '内容' }, { name: '专题管理', bits: 'Ztgl-3-4' }, { name: '商品管理' }],
        leadingIn: false,
        leadingOut: true
      },
      tableData: [],
      value1: '',
      value2: '',
      searchValue: '',
      ruleForm: {
        jueSeName: ''
      }
    }
  },
  watch: {},
  methods: {
    newAccount() {},
    // 导出商品
    downLoad() {
      let deletIdArr = this.multipleSelection.map(item => {
        return item.id
      })
      let stringdelet = deletIdArr.join(',')
      this.$http({ method: 'get', url: '/st/proExport', params: { gid: stringdelet, sid: this.special_id } }).then(
        res => {
          if (res) {
            this.download(res.request.responseURL)
          }
        }
      )
    },
    download(responseUrl) {
      if (!responseUrl) {
        return
      }
      let url = responseUrl
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      // link.setAttribute('download', 'excel.csv')

      document.body.appendChild(link)
      link.click()
    },
    // 删除多个选项
    deleteItem() {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请选择商品')
        return
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.DELETFUN()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除函数
    DELETFUN() {
      let deletIdArr = this.multipleSelection.map(item => {
        return item.id
      })
      let stringdelet = deletIdArr.join(',')
      this.$http.delete(`/st/proDelete`, { params: { gid: stringdelet, sid: this.special_id } }).then(res => {
        if (res.code == 200) {
          this.$message({ type: 'success', message: res.message })
          this.tableListApi({ page: this.currentPage }).then(res => {
            if (res.code == 200) {
              if (res.data.product_list.data.length == 0) {
                this.currentPage -= 1
                this.tableListApi({ page: this.currentPage }).then(res => {
                  if (res.code == 200) {
                    this.tableData = res.data.product_list.data
                    this.total = res.data.product_list.total
                  }
                })
              } else {
                this.tableData = res.data.product_list.data
                this.total = res.data.product_list.total
              }
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 分页
    handleCurrentChange(val) {
      this.tableListApi({ page: val }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.product_list.data
          this.total = res.data.product_list.total
        }
      })
    },
    // 多选
    handleSelectionTable(val) {
      this.multipleSelection = val
    },
    tableListApi(params = {}) {
      let res = this.$http({
        url: `/st${this.special_id ? '/' + this.special_id : ''}`,
        method: 'get',
        params: { ...params }
      })
      return res
    },
    // 日期格式化
    formatDate(row, column) {
      let date = new Date(parseInt(row.coupon_start) * 1000)
      let Y = date.getFullYear() + '-'
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-'
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    }
  },
  mounted() {
    this.tableListApi().then(res => {
      if (res.code == 200) {
        this.tableData = res.data.product_list.data
        this.total = res.data.product_list.total
      }
    })
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.headGroup {
  // text-align: left;
}

.tableContainer {
  text-align: left;
  padding: 0 15px;
  .tableTitle {
    display: flex;
    padding: 10px 0;
  }
}

.tableName {
  font-weight: bold;
  align-self: flex-end;
  text-align: left;
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
  width: 90%;
}

.hidetitle {
  color: red;
  font-size: 14px;
}

.jueseName {
  width: 60%;
}
</style>

<style>
.addSubjectTitle .el-dialog__header {
  text-align: center;
}
</style>