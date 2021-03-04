<template>
  <el-main class="app-main">
    <level-bar />
    <el-scrollbar class="custom-scrollbar">
      <transition enter-active-class="fadeInUp" mode="out-in">
        <router-view />
      </transition>
    </el-scrollbar>
  </el-main>
</template>

<script>
import LevelBar from './LevelBar'
export default {
  name: 'AppMain',
  components: {
    LevelBar
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
.app-main {
  background: #f5f7f9;
  overflow-y: hidden;
  .custom-scrollbar {
    height: calc(100% - 36px);
    background-color: #ffffff;
    .el-scrollbar__wrap {
      margin-right: -19px;
      overflow-x: hidden;
    }
  }
}
</style>
