<template>
  <div class="personal-info">
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="user-content">
        <i class="el-icon-user-solid" />
        {{ userData.name }}<i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="modifyPwd">
          <i class="el-icon-lock" /> 修改密码
        </el-dropdown-item>
        <el-dropdown-item command="personInfo">
          <i class="el-icon-user" /> 个人信息
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          <i class="el-icon-switch-button" /> 退出
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Personal',
  data() {
    return {
      userData: {}
    }
  },
  mounted() {
    this.userData = this.$helper.getItem('userInfo').user
  },
  methods: {
    logout() {
      this.$store.dispatch('userInfo/logout')
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.logout()
      }
    }
  }
}
</script>

<style lang="scss">
.personal-info {
  flex: 1;
  text-align: right;
  .el-dropdown {
    color: #CCCCCC;
    bottom: 3px;
    cursor: pointer;
    .user-content {
      .el-icon-user-solid {
        font-size: 18px;
      }
    }
  }
}
</style>
