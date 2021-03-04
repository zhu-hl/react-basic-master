<template>
  <div class="wrapper-container">
    <div class="page-title">
      {{ isAdding ? '添加用户' : '编辑用户' }}
    </div>
    <el-form
      ref="userData"
      :inline="true"
      :model="userData"
      :label-width="$store.state.common.LABEL_WIDTH"
      class="add-edit-form"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户工号" :rules="$rules({ required: true, maxLength: 20 })" prop="userId">
            <el-input v-model="userData.userId" :disabled="!isAdding" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名" :rules="$rules({ required: true, maxLength: 20 })" prop="username">
            <el-input v-model="userData.username" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" :rules="$rules({ required: true })" prop="sex">
            <el-radio-group v-model="userData.sex">
              <el-radio v-for="(item, index) in common['system_sex']" :key="index" :label="item.value">
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="移动电话" :rules="$rules({ required: true, options: ['mobile'] })" prop="phone">
            <el-input v-model="userData.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" :rules="$rules({ required: true, options: ['email'] })" prop="email">
            <el-input v-model="userData.email" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="userData.remark" type="textarea" rows="3" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="submit-btn-area">
      <el-button v-debounce="checkValidate" type="primary" icon="el-icon-check">
        提交
      </el-button>
      <el-button type="ghost" icon="el-icon-close" plain @click="goBack('cancel')">
        取消
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Add',
  data() {
    return {
      userData: {
        userId: '',
        username: '',
        sex: '01',
        phone: '',
        email: '',
        remark: ''
      }
    }
  },
  computed: {
    ...mapState(['common']),
    isAdding() {
      return this.$route.params.id === undefined
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const userId = this.$route.params.id
      if (userId) {
        const result = await this.$store.dispatch('system/user/getUserDetail', { userId })
        if (result.success) {
          this.userData = { ...this._.pick(result.data, [...this._.keys(this.userData), 'id']) }
        }
      }
    },
    checkValidate() {
      this.$refs['userData'].validate(valid => {
        if (!valid) {
          this.$message.error('请检查必填字段')
          return false
        }
        this.submitForm()
      })
    },
    async submitForm() {
      let result
      if (this.isAdding) {
        result = await this.$store.dispatch('system/user/addUser', this.userData)
      } else {
        result = await this.$store.dispatch('system/user/updateUser', this.userData)
      }
      if (result.success === true) {
        this.$helper.notify(this, { message: '提交成功' })
        this.goBack()
      }
    },
    goBack(cancel) {
      if (this.isAdding && !cancel) {
        this.$router.push('/system/user/list')
        return
      }
      this.$router.push('/system/user/list?cancel=true')
    }
  }
}
</script>

<style scoped>

</style>
