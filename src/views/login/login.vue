<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      label-position="left"
      label-width="0px"
      class="login-form"
      @keyup.enter.native="handleLogin"
    >
      <div class="form-title">
        超声后台管理系统
      </div>
      <div class="form-container">
        <el-form-item :rules="$rules({ required: true, message: '请输入登录账户' })" prop="username">
          <el-input
            v-model="loginForm.username"
            name="email"
            type="text"
            prefix-icon="el-icon-user"
            placeholder="登录账户"
          />
        </el-form-item>
        <el-form-item :rules="$rules({ required: true, message: '请输入密码', options: [{ type: 'password' }] })" prop="password">
          <el-input
            v-model="loginForm.password"
            name="password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="密码"
          />
        </el-form-item>
        <el-checkbox v-model="remember" class="m-b-sm text-white">
          记住密码
        </el-checkbox>
        <div class="form-area">
          <el-button type="primary" class="w-full" :loading="loading" @click="handleLogin()">
            登录
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      remember: false,
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  created() {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.submitForm()
        }
      })
    },
    async submitForm() {
      this.loading = true
      const result = await this.$store.dispatch('userInfo/login', this.loginForm)
      this.loading = false
      const firstMenu = result.data.auths[0]
      let path
      if (!firstMenu.children) {
        path = firstMenu.actionUrl
      } else {
        path = firstMenu.children[0].actionUrl
      }
      this.$router.push({ path: path })
    }
  }
}
</script>

<style lang="scss">
.login-container {
  height: 100vh;
  background: url("../../assets/img/bg_login.jpg") #2d3a4b no-repeat;
  background-size: cover;
  .login-form {
    width: 400px;
    height: 350px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .form-title {
      font-size: 25px;
      color: #FFFFFF;
      line-height: 80px;
      text-align: center;
    }
    .form-container {
      width: 80%;
      margin: 0 auto;
    }
    .form-area {
      margin-top: 20px;
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
