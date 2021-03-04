<template>
  <div>
    <div class="page-title">
      {{ setting['title'] }}
    </div>
    <el-form
      :inline="true"
      :label-suffix="$store.state.common.LABEL_SUFFIX"
      :label-width="$store.state.common.LABEL_WIDTH"
      class="detail-form"
    >
      <el-row>
        <template v-for="(item, index) in setting.columns">
          <el-col :key="index" :span="item.col || defaultSpan" :class="item.className">
            <el-form-item :label="item.label">
              {{ detailData[item.value] }}
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <slot />
    </el-form>
    <div class="submit-btn-area">
      <slot name="operation" />
      <el-button type="ghost" icon="el-icon-back" plain @click="goBack()">
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonDetail',
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    setting: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      defaultSpan: 8
    }
  },
  computed: {
    // 针对过滤器做处理
    detailData: function() {
      const data = { ...this.data }
      this.setting.columns && this.setting.columns.forEach((item) => {
        if (item.filter) {
          data[item.value] = item.filter(data[item.value], item.arg, item.options)
        }
      })
      return data
    }
  },
  methods: {
    goBack() {
      this.$emit('goBack')
    }
  }
}
</script>

<style scoped>

</style>
