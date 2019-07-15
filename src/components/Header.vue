<template>
    <div>
        <div class="header">
            <div class="welcome">
                <el-button type="text" icon="el-icon-s-fold" @click="collapsedSideBar"></el-button>
                您好，a491810145, 欢迎登录花生小店运营系统
            </div>
            <el-dropdown class="top-dropdown" @command="handleCommand">
      <span class="el-dropdown-link">
        管理员<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
                <el-dropdown-menu>
                    <el-dropdown-item command="1">修改密码</el-dropdown-item>
                    <el-dropdown-item command="2">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- 修改密码 -->
        <el-dialog
                :visible.sync="showPwdDialog"
                :append-to-body="true"
                title="修改密码"
                width="30%"
                @closed="ClosedDialog"
        >
            <el-form
                    ref="pwd-form"
                    :model="passwordForm"
                    :rules="rules"
                    label-width="70px"
            >
                <el-form-item
                        label="旧密码"
                        prop="password"
                >
                    <el-input v-model="passwordForm.password" />
                </el-form-item>
                <el-form-item
                        label="新密码"
                        prop="newPassword"
                >
                    <el-input
                            v-model="passwordForm.newPassword"
                            type="password"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPwdDialog = false">取 消</el-button>
          <el-button
                  :loading="isSubmit"
                  type="primary"
          >确 定</el-button>
        </span>
            </template>
        </el-dialog>
    </div>

</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'Header',
        data(){
          return {
              showPwdDialog:false,
              isSubmit: false,
              passwordForm:{
                  password:'',
                  newPassword:''
              },
              rules: {
                  password: [
                      { required: true, message: '请填写旧密码', trigger: 'change' },
                  ],
                  newPassword: [
                      { required: true, message: '请填写新密码', trigger: 'change' },
                  ],
              }
          }
        },
        methods: {
            ...mapActions({
                logout: 'app/logout'
            }),
            collapsedSideBar: function () {
                this.$emit('change-collapse')
            },
            handleCommand(command) {
                switch (command) {
                    case '1':
                        this.showPwdDialog = true
                        break;
                    case '2':
                        this.logout()
                }
            },
            ClosedDialog() {
                this.$refs['pwd-form'].resetFields()
            },
        }
    }
</script>

<style lang="scss">

</style>
