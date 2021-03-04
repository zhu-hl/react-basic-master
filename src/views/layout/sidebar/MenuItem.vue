<template>
  <router-link :to="path">
    <el-menu-item :index="path">
      <i v-if="icon" :class="icon" />
      <span slot="title">{{ title }}</span>
    </el-menu-item>
  </router-link>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    path: {
      type: String,
      required: false,
      default: '/'
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
