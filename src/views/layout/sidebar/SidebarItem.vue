<template>
  <div class="menu-wrapper">
    <template v-for="(item, index) in menuData">
      <el-submenu v-if="item.children && !item.hidden" :key="index" :index="item.actionUrl">
        <template slot="title">
          <i :class="item.icon" />
          <span slot="title">{{ item.name }}</span>
        </template>
        <template v-for="(child, key) in item.children">
          <sidebar-item v-if="!item.hidden && child.children" :key="key" :menu-data="[child]" />
          <menu-item :key="key" :path="child.actionUrl" :title="child.name" :icon="child.icon" />
        </template>
      </el-submenu>
      <menu-item v-else-if="!item.hidden" :key="index" :path="item.actionUrl" :title="item.name" :icon="item.icon" />
    </template>
  </div>
</template>

<script>
import MenuItem from './MenuItem'
export default {
  name: 'SiderbarItem',
  components: {
    MenuItem
  },
  props: {
    menuData: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
