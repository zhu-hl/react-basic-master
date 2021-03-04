<template>
  <el-header class="common-header">
    <div class="logo">
      <img :src="logo">
    </div>
    <div class="toggle" @click.prevent="toggleSideBar">
      <i v-if="isCollapsed" class="el-icon-s-unfold" />
      <i v-else class="el-icon-s-fold" />
    </div>
    <slot />
  </el-header>
</template>

<script>
import { mapState } from 'vuex'
import logo from '@/assets/img/logo.jpg'
export default {
  name: 'Header',
  data() {
    return {
      logo
    }
  },
  computed: {
    ...mapState({
      isCollapsed: state => state.common.isCollapsed
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.commit('common/updateCollapsed')
    }
  }
}
</script>

<style lang="scss" scoped>
.common-header {
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  box-sizing: border-box;
  width: 100%;
  height: 80px !important;
  font-size: 22px;
  line-height: 80px;
  padding: 0 10px;
  background: #000;
  display: flex;
  .logo {
    width: 180px;
    height: 100%;
    img {
      width: 180px;
    }
  }
  .toggle {
    width: 50px;
    margin-left: 10px;
    height: 100%;
    i {
      font-size: 28px;
      color: #ffffff;
      line-height: 80px;
      cursor: pointer;
    }
  }
}
</style>
