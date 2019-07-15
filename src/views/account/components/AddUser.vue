<template>
    <el-dialog :title="dialogTitle" :width="'400px'" :visible.sync="showDialog">
        <el-form ref="form" :model="form" :rules="rules" label-width="85px">
            <el-form-item  label="用户名" prop="username">
                <el-input v-model="form.username" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item  label="真实姓名" prop="realname">
                <el-input v-model="form.realname" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item  label="登录密码" prop="password" placeholder="6-20位">
                <el-input type="password" v-model="form.password" autocomplete="off" clearable></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="doSubmit('form')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    const defaultRule = { required: true, message: '请输入正确', trigger: 'change' };
    export default {
        data() {
            return {
                showDialog: false,
                isEdit: true,
                dialogTitle: '',
                form: {
                    username: '',
                    realname: '',
                    roleId: '', // 编辑时需要
                },
                rules: {
                    username: [
                        {...defaultRule}
                    ],
                    realname: [{ ...defaultRule}],
                    password:[{ ...defaultRule, trigger: 'blur', min: 6, max: 20 }]
                }
            }
        },
        watch: {
            showDialog: {
                handler(curr) {
                    if (!curr) {
                        this.form = this.$options.data().form
                        this.$refs.form.resetFields()
                    }
                },
            },
        },
        methods: {
            async doSubmit(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid){
                        //表单验证成功后提交操作
                    }
                })
            },
            open() {
                this.isEdit = false;
                this.showDialog = true;
                this.dialogTitle = '新增用户'
            },
            edit(info){
                this.isEdit = true;
                this.showDialog = true;
                this.dialogTitle = '编辑用户';
                this.form = {
                    username:info.username,
                    realname:info.realname,
                    password:'',
                    userId:info.userId
                }
            }
        }
    }
</script>

<style scoped>

</style>
