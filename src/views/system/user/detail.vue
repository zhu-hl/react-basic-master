<template>
  <div class="wrapper-container">
    <common-detail :setting="detailSetting" :data="userDetail" @goBack="goBack" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dictLabel } from '@/utils/filters'
const detailSetting = (vm) => ({
  title: '用户详情',
  columns: [
    { label: '用户工号', value: 'userId' },
    { label: '用户名', value: 'username' },
    { label: '性别', value: 'sex', filter: dictLabel, arg: vm.common['system_sex'] },
    { label: '移动电话', value: 'phone' },
    { label: '邮箱', value: 'email' },
    { label: '角色', value: 'roleName' },
    { label: '备注', value: 'remark' }
  ]
})
export default {
  name: 'Detail',
  data() {
    return {
      pageId: this.$route.params.id
    }
  },
  computed: {
    ...mapState(['common', 'system']),
    userDetail() {
      return this.system.user.userDetail[this.pageId] || {}
    },
    // 需要写在computed中vm.common才会有值
    detailSetting() {
      return detailSetting(this)
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getUserDetail(this.$route.params.id)
    }
  },
  methods: {
    getUserDetail(userId) {
      this.$store.dispatch('system/user/getUserDetail', { userId })
    },
    goBack() {
      this.$router.push({ path: '/system/user/list?cancel=true' })
    }
  }
}
</script>

<style scoped>

</style>
