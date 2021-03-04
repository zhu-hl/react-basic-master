<template>
  <el-aside class="sidebar-container">
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        :default-active="matchPath"
        class="el-menu-vertical-demo sidebar-menu"
        background-color="#2d303e"
        text-color="#cccccc"
        active-text-color="#ffffff"
        unique-opened
        router
        :collapse="isCollapsed"
      >
        <sidebar-item :menu-data="menuData" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { mapState } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  props: {
  },
  computed: {
    ...mapState({
      isCollapsed: state => state.common.isCollapsed,
      matchPath: state => state.common.matchPath
    })
  },
  watch: {
    $route: {
      handler() {
        this.handlePath()
      },
      immediate: true
    }
  },
  created() {
    this.menuData = this.$helper.getItem('userInfo').auths
  },
  methods: {
    handlePath() {
      const matchPath = `/${this._.trimStart(this.$route.path, '/').split('/', 2).join('/')}`
      this.$store.commit('common/updateMatchPath', matchPath)
      this.getLevelIcon()
    },
    getLevelIcon() {
      setTimeout(() => {
        const firstPath = `/${this._.trimStart(this.$route.path, '/').split('/', 1).join('/')}`
        const levelIcon = this.menuData.find((item) => item.actionUrl === firstPath).icon
        this.$store.commit('common/updateLevelIcon', levelIcon)
      }, 50)
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/sidebar";
</style>
