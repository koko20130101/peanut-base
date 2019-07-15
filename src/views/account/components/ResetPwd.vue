<template>
    <el-dialog title="修改密码" :width="'400px'" :visible.sync="showDialog">
        <el-form ref="form" :model="form" :rules="rules" label-width="85px">
            <el-form-item  label="登录名" prop="_username">
                <el-input v-model="form._username" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item  label="密码" prop="newPassword" placeholder="6-20位">
                <el-input type="password" v-model="form.newPassword" autocomplete="off" clearable></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="doSubmit('form')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    const defaultRule = { required: true, message: '请输入正确', trigger: 'change' }
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
        methods: {
            async doSubmit(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid){
                        //表单验证成功后提交操作
                    }
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
