<template>
  <div class="level-bar-container">
    <i :class="levelIcon" class="level-icon" />
    <el-breadcrumb class="app-levelbar" separator="/">
      <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LevelBar',
  computed: {
    ...mapState({
      levelIcon: state => state.common.levelIcon
    })
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.level-bar-container {
  height: 20px;
  line-height: 20px;
  padding-bottom: 16px;
  .level-icon{
    position: relative;
    bottom: 4px;
    font-size: 15px;
    color: #b5b5b5;
    margin-right: 2px;
  }
  .app-levelbar {
    display: inline-block;
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
