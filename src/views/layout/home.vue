<template>
  <el-container direction="vertical" class="app-wrapper" :class="[{ hideSidebar: isCollapsed }]">
    <Header>
      <Personal />
    </Header>
    <el-container class="app-container">
      <Sidebar />
      <app-main />
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import Header from './Header'
import Personal from './Personal'
import AppMain from './AppMain'
import Sidebar from './sidebar/Sidebar'
export default {
  name: 'Home',
  components: {
    Header,
    Personal,
    AppMain,
    Sidebar
  },
  computed: {
    ...mapState({
      isCollapsed: state => state.common.isCollapsed
    })
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper{
  height: 100%;
  .app-container {
    height: calc(100% - 80px);
  }
}
</style>
