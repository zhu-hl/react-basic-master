<template>
  <div :class="tableClass" class="table-container">
    <div v-if="showOperation" class="operation-panel">
      <el-button v-if="showAddBtn" v-debounce="addItem" type="primary" class="add-btn">
        添加
      </el-button>
      <div class="operation-area">
        <slot name="operation" />
      </div>
    </div>
    <el-table
      :ref="id"
      :data="dataList"
      stripe
      fit
      border
      header-cell-class-name="custom-header"
      @select="handleSelectItem"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @expand-change="expandChange"
    >
      <el-table-column v-if="showSelectColumn" :selectable="canSelectRow" type="selection" align="center" width="55" />
      <template v-for="(colConfig, index) in tableColumns">
        <component
          :is="colConfig.component"
          v-if="colConfig.component"
          :key="index"
          :col-config="colConfig"
        />
        <el-table-column
          v-else-if="colConfig.link"
          :key="index"
          v-bind="colConfig"
          :width="colConfig.width"
          :min-width="colConfig.minWidth"
          :prop="colConfig.prop"
          :label="colConfig.label"
          :formatter="colConfig.formatter || defaultFormatter"
        >
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click="colConfig.detailHandler(scope.row)">
              {{ scope.row[colConfig.prop] }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          v-bind="colConfig"
          :width="colConfig.width"
          :min-width="colConfig.minWidth"
          :prop="colConfig.prop"
          :label="colConfig.label"
          :formatter="colConfig.formatter || defaultFormatter"
        />
      </template>
    </el-table>
    <slot name="pagination">
      <div class="pagination-container">
        <el-pagination
          v-if="dataList.length > 0 && showPaging"
          :current-page.sync="paging.currentPage"
          :page-sizes="[5,10,20,30,50]"
          :page-size="paging.pageSize"
          :total="paging.total"
          layout="total, prev, pager, next, sizes, jumper"
          background
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
        />
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    id: { // $ref
      type: String,
      required: false,
      default: 'basicTable'
    },
    tableClass: { // el-table组件父级className
      type: String,
      required: false,
      default: 'abc'
    },
    showOperation: { // 是否展示表格上方操作按钮
      type: Boolean,
      required: false,
      default: true
    },
    showAddBtn: { // 是否展示Add按钮
      type: Boolean,
      required: false,
      default: false
    },
    pageObj: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    showPaging: {
      type: Boolean,
      required: false,
      default: true
    },
    showSelectColumn: {
      type: Boolean,
      required: false,
      default: false
    },
    canSelectRow: {
      type: Function,
      required: false,
      default: () => {
        return true
      }
    },
    tableData: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    },
    tableColumns: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    },
    expandChangeHandler: {
      type: Function,
      required: false,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      dataList: [],
      paging: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      search: {}
    }
  },
  watch: {
    pageObj(newVal) {
      this.paging = { ...newVal }
    },
    searchForm(newVal) {
      this.search = newVal
    },
    tableData(newVal) {
      this.dataList = newVal
    }
  },
  methods: {
    async pageSizeChange(size) {
      this.$emit('pageSizeChangeHandler', size)
    },
    async currentPageChange(page) {
      this.$emit('pageChangeHandler', page)
    },
    handleSelectItem(selection, row) {
      this.$emit('select', selection, row)
    },
    handleSelectAll(selection) {
      this.$emit('select-all', selection)
    },
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    defaultFormatter(row, column) {
      return row[column.property]
    },
    expandChange(rowExpand, expandedRows) {
      this.$emit('expandChangeHandler', rowExpand, expandedRows)
    },
    addItem() {
      this.$emit('add-handler')
    }
  }
}
</script>
<style lang="scss">
.table-container {
  .operation-panel {
    display: flex;
    align-content: flex-start;
    flex-flow: row;
    .operation-area {
      order: 1;
      flex-grow: 2;
      text-align: right;
    }
    .add-btn {
      margin-left: 10px;
      order: 2;
    }
    .el-button {
      margin-bottom: 10px;
    }
  }
  .pagination-container {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
