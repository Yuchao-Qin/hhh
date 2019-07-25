<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData" @downLoad="downLoad">
      <template v-slot:out>数据导出</template></Breadcrumb>
    <h3 class="headGroup">
      菜单商品管理————热销专区
    </h3>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="24" class="fl margin10">
          <el-select v-model="productSelect" size="mini">
            <el-option value="all" label="全部商品"></el-option>
            <el-option value="1" label="今日推荐商品"></el-option>
            <el-option value="0" label="其他商品"></el-option>
          </el-select>
        </span>
        <span class="fl">
          <el-button type="primary" size="mini" @click="screen">筛选</el-button>
          <el-button type="primary" size="mini" @click="Allscreen">查看全部
          </el-button>
        </span>
        <span class="fr">
          <el-button size="mini" type="primary" @click="settodayRecommendFun">
            设为今日推荐</el-button>
          <el-button size="mini" type="primary"
            @click="canceltodayRecommendFun">
            取消今日推荐</el-button>
          <el-button size="mini" type="primary" @click="deletCheck">删除所有选项
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
        <el-table-column prop="is_recommend" label="是否为今日推荐">
          <template slot-scope="scope">
            {{scope.row.is_recommend==0?'非今日推荐':'是今日推荐'}}
          </template>
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

      <!-- 分页 -->
      <el-pagination v-if="total&&total>10" class="pagination" background layout="prev, pager, next"
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
      x: 1,
      multipleSelection: [],
      searchData: {},
      currentPage: 1,
      total: 0,
      id: this.$route.params.id,
      productSelect: '',
      addSubject: false,
      radio1: '账户管理',
      crumData: {
        breadItem: [{ name: '内容' }, { name: '菜单管理', bits: 'Cdgl-3-3' }, { name: '商品管理' }],
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
  watch: {
    radio1(newValue) {
      this.crumData = [{ name: '设置' }, { name: '账户权限' }, { name: newValue }]
    }
  },
  methods: {
    // 数据导出,
    downLoad() {
      let searchData = this.searchData
      searchData.id = this.id
      this.$http({ method: 'get', url: '/menu/product/export', params: this.searchData }).then(res => {
        if (res) {
          console.log(res)
          this.download(res.request.responseURL)
        }
      })
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
    // 设为今日推荐
    settodayRecommendFun() {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请选择商品')
        return
      }
      let deletIdArr = this.multipleSelection.map(item => {
        return item.group_id
      })
      this.$http({
        method: 'PATCH',
        url: '/menu/product/recommend',
        params: {
          ids: deletIdArr.join(','),
          val: '1'
        }
      }).then(res => {
        if (res.code == 200) {
          this.$message({ type: 'success', message: res.message })
          this.tableListAPI()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 取消今日推荐
    canceltodayRecommendFun() {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请选择商品')
        return
      }
      let deletIdArr = this.multipleSelection.map(item => {
        return item.group_id
      })
      this.$http({
        method: 'PATCH',
        url: '/menu/product/recommend',
        params: {
          ids: deletIdArr.join(','),
          val: '0'
        }
      }).then(res => {
        if (res.code == 200) {
          this.$message({ type: 'success', message: res.message })
          this.tableListAPI()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 删除选中项
    deletCheck() {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请选择商品')
        return
      }
      let deletIdArr = this.multipleSelection.map(item => {
        return item.group_id
      })
      let stringdelet = deletIdArr.join(',')
      this.$http({
        method: 'DELETE',
        url: '/menu/products',
        params: { ids: stringdelet }
      }).then(res => {
        if (res.code == 200) {
          if (res.code == 200) {
            this.$message({ type: 'success', message: res.message })
          } else {
            this.$message.error(res.message)
          }
          this.$http
            .get(`/menu/product/lists${this.currentPage ? '/' + this.currentPage : ''}`, {
              params: { id: this.id, ...this.searchData }
            })
            .then(res => {
              if (res.code == 200) {
                if (res.data.list.length == 0) {
                  this.currentPage -= 1
                  let page = this.currentPage
                  console.log(page)
                  this.tableListAPI({ ...this.searchData }, this.id, page)
                } else {
                  this.tableData = res.data.list
                  this.total = res.data.total
                }
              }
            })
        }
      })
    },
    // 选中项数据
    handleSelectionTable(val) {
      this.multipleSelection = val
    },
    // 分页
    handleCurrentChange(val) {
      this.productSelect = this.searchData.type
      this.currentPage = val
      this.tableListAPI({ ...this.searchData }, this.id)
    },
    // 查看全部
    Allscreen() {
      this.productSelect = ''
      this.searchData.type = ''
      this.currentPage = 1
      this.initTable()
    },
    // 筛选
    screen() {
      this.currentPage = 1
      this.searchData.type = this.productSelect
      this.tableListAPI({ ...this.searchData })
    },
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
    newAccount() {},
    // 列表接口
    tableListAPI(params = this.searchData, id = this.id, page = this.currentPage) {
      let res = this.$http
        .get(`/menu/product/lists${page ? '/' + page : ''}`, { params: { id, ...params } })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data.list
            this.total = res.data.total
          }
        })
    },
    async initTable() {
      await this.tableListAPI()
    }
  },
  mounted() {
    this.initTable()
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

.el-select {
  margin-left: 10px;
}
</style>

<style>
.addSubjectTitle .el-dialog__header {
  text-align: center;
}
</style>