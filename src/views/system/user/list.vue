<template>
  <div class="wrapper-container">
    <el-form ref="searchForm" :inline="true" :model="searchForm">
      <el-form-item label="用户工号" prop="userId">
        <el-input v-model="searchForm.userId" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="searchForm.username" />
      </el-form-item>
      <el-form-item label="性别" prop="username">
        <el-select v-model="searchForm.sex" clearable>
          <el-option v-for="item in common['system_sex']" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="移动电话" prop="phone">
        <el-input v-model="searchForm.phone" />
      </el-form-item>
      <el-form-item>
        <el-button v-debounce="handleQuery" type="primary" icon="el-icon-search">
          查询
        </el-button>
        <el-button type="ghost" icon="el-icon-refresh" @click="resetFields()">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <basic-table
      ref="tableList"
      :table-columns="tableColumns"
      :page-obj="system.user.paging"
      :search-form="system.user.searchForm"
      :table-data="system.user.userList"
      show-add-btn
      @pageChangeHandler="handlePage"
      @pageSizeChangeHandler="handlePageSize"
      @add-handler="goAdd"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
const OperationColumn = {
  props: ['colConfig'],
  template: `
    <el-table-column :label="colConfig.label" :width="colConfig.width">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="colConfig.editHandler(scope.row)"><i class="el-icon-edit"/>编辑</el-button>
        <el-button type="text" size="small" @click="colConfig.deleteHandler(scope.row)"><i class="el-icon-delete"/>删除</el-button>
      </template>
    </el-table-column>
  `
}
export default {
  name: 'List',
  data() {
    return {
      tableColumns: [
        {
          label: '用户工号',
          prop: 'userId',
          link: true,
          detailHandler: this.goDetail
        },
        {
          label: '用户名',
          prop: 'username'
        },
        {
          label: '性别',
          prop: 'sex',
          formatter: (row, column, cellValue, index) => this.$helper.getOptioinsName(cellValue, this.common['system_sex'])
        },
        {
          label: '移动电话',
          prop: 'phone'
        },
        {
          label: '邮箱',
          prop: 'email'
        },
        {
          label: '角色',
          prop: 'roleName'
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          component: OperationColumn,
          label: '操作',
          width: 200,
          editHandler: this.goEdit,
          deleteHandler: this.handleDelete
        }
      ]
    }
  },
  computed: {
    ...mapState(['common', 'system']),
    searchForm() {
      return this.system.user.searchForm
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.cancel === 'true') {
      next(vm => {
        vm.handlePage()
      })
      return
    }
    next(vm => {
      vm.$store.commit('system/user/updateSearchForm')
      vm.handlePage(1, 10)
    })
  },
  methods: {
    handlePage(currentPage, pageSize) {
      this.$store.dispatch('system/user/getUserList', { currentPage, pageSize })
    },
    handlePageSize(pageSize) {
      this.handlePage(undefined, pageSize)
    },
    handleQuery() {
      this.$store.commit('system/user/updateSearchForm', this.searchForm)
      this.handlePage(1)
    },
    resetFields() {
      this.$store.commit('system/user/updateSearchForm')
    },
    goAdd() {
      this.$router.push({ path: '/system/user/add' })
    },
    goEdit(row) {
      this.$router.push({ path: `/system/user/edit/${row.userId}` })
    },
    goDetail(row) {
      this.$router.push({ path: `/system/user/detail/${row.userId}` })
    },
    async handleDelete(row) {
      await this.$helper.confirm(this)
      const result = await this.$store.dispatch('system/user/deleteUser', { userId: row.userId })
      if (result.success) {
        this.$helper.notify(this, { message: '删除记录成功' })
        this.handlePage()
      }
    }
  }
}
</script>

<style scoped>

</style>
