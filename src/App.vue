<template>
  <div id="app">
    <router-view />
    <el-dialog
      title="提示"
      :show-close="false"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-alert
        title="温馨提示"
        type="error"
        :closable="false"
        description="请注意，您正在使用的是#石器#浏览器，为了更好的用户体验，建议更换谷歌、火狐等现代浏览器"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>
<style>
</style>
