<template>
    <el-dialog :title="dialogTitle" :width="'400px'" :visible.sync="showDialog">
        <el-form ref="form" :model="form" :rules="rules" label-width="85px">
            <el-form-item  label="用户名" prop="username" >
                <el-input :disabled="isEdit" v-model="form.username" autocomplete="off" placeholder="限字母数字下划线" clearable></el-input>
            </el-form-item>
            <el-form-item  label="真实姓名" prop="realname">
                <el-input v-model="form.realname" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="!isEdit"  label="登录密码" prop="password" >
                <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入6-20位密码" clearable></el-input>
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
                        this.form = this.$options.data().form;
                        this.$refs.form.resetFields()
                    }
                },
            },
        },
        methods: {
            async doSubmit(formName) {
                this.$refs[formName].validate(async valid => {
                    if(!valid) return;
                    let {password, ...params} = this.form;

                    if(this.isEdit){
                        await this.api.updateUser(params);
                        this.$message({
                            message: '修改成功',
                            type: 'success',
                        });
                        //发出事件，父级组件监听，重新加载列表
                        this.$emit('on-success')
                    }else{
                        params.password = MD5(password).toString();
                        await this.api.doRegister(params);
                        this.$message({
                            message: '添加成功',
                            type: 'success',
                        });
                        //发出事件，父级组件监听，重新加载列表
                        this.$emit('on-success');
                    }

                    //关闭弹窗
                    this.showDialog = false;
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
