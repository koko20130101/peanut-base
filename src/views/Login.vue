<template>
    <div class="login-container">
        <div class="login-main">
            <div class="theme">
                <img src="../assets/img/login_bg_2.png" alt="">
            </div>
            <div class="box">
                <el-form ref="form" label-position="left" :rules="rules" :model="loginInfo" label-width="80px">
                    <el-form-item label="用户名：" prop="username">
                        <el-input placeholder="请输入用户名" v-model="loginInfo.username" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="pwd">
                        <el-input placeholder="请输入密码" v-model="loginInfo.pwd" show-password clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')">登 录</el-button>
                        <el-button @click="resetForm('form')">重 置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import MD5 from 'crypto-js/md5'
    import {mapState, mapGetters, mapActions} from 'vuex'

    export default {
        name: 'Login',
        data() {
            return {
                loginInfo: {
                    username: '',
                    pwd: '',
                    code: ''
                },
                rules: { // 表单验证规则
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    pwd: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            ...mapActions({
                doLogin: 'app/login',
                getMenu: 'permission/getMenu',
            }),
            submitForm(formName) {
                // 表单验证
                this.$refs[formName].validate(/* 异步 */ async valid => {
                    if (valid) {
                        try {
                            await this.doLogin({
                                username: this.loginInfo.username,
                                password: MD5(this.loginInfo.pwd).toString()
                            }).then(res =>{
                                alert(9)
                                console.log(res)
                            })
                        } catch (e){
                            //
                        }
                        // 等待登录成功
                        /*await this.login({
                            username: this.loginInfo.username,
                            password: MD5(this.loginInfo.pwd).toString()
                        })
                        this.$router.push({
                            name: 'userList'
                        })*/
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    @import '../styles/login.scss';
</style>
