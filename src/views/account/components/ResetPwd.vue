<template>
    <el-dialog title="修改密码" :width="'400px'" :visible.sync="showDialog">
        <el-form ref="form" :model="form" :rules="rules" label-width="85px">
            <el-form-item  label="登录名" prop="_username">
                <el-input v-model="form._username" autocomplete="off" disabled clearable></el-input>
            </el-form-item>
            <el-form-item  label="密码" prop="newPassword">
                <el-input type="password" v-model="form.newPassword" autocomplete="off" placeholder="请输入6-20位密码" clearable></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="doSubmit('form')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import MD5 from 'crypto-js/md5'
    const defaultRule = { required: true, message: '密码格式不正确', trigger: 'change' }
    export default {
        data() {
            return {
                showDialog: false,
                form: {
                    userId: '',
                    _username: '',
                    newPassword: ''
                },
                rules: {
                    _username: [
                        {...defaultRule}
                    ],
                    newPassword:[{ ...defaultRule, trigger: 'blur', min: 6, max: 20 }]
                }
            }
        },
        watch: {
            showDialog: {
                handler(curr) {
                    if (!curr) {
                        this.form = this.$options.data().form;
                        this.$refs.form.resetFields()
                    }
                },
            },
        },
        methods: {
            async doSubmit(formName) {
                this.$refs[formName].validate(async valid => {
                    if (!valid) return;
                    //解构赋值
                    let {newPassword, ...params} = this.form;
                    params.newPassword = MD5(newPassword).toString();
                    await this.api.resetPassword(params);
                    //关闭弹窗
                    this.showDialog = false;
                })
            },
            edit({userId,username}){
                this.showDialog = true;
                this.form.userId = userId
                this.form._username = username
            }
        }
    }
</script>

<style scoped>

</style>
