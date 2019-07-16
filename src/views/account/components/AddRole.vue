<template>
    <el-dialog :title="dialogTitle" :width="'400px'" :visible.sync="showDialog">
        <el-form ref="form" :model="form" :rules="rules" label-width="85px">
            <el-form-item  label="角色名称" prop="name">
                <el-input v-model="form.name" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item  label="描述" prop="description">
                <el-input type="textarea" v-model="form.description" autocomplete="off" clearable></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="doSubmit('form')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                showDialog: false,
                isEdit: true,
                dialogTitle: '',
                form: {
                    name: '',
                    description: '',
                    roleId: '', // 编辑时需要
                },
                rules: {
                    name: [{required: true, message: '角色名不能为空', trigger: 'change'}],
                    description: [{required: true, message: '描述不能为空', trigger: 'change'}],
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
                    if(!valid) return;
                    let params = {...this.form};

                    if (this.isEdit) {
                        await this.api.updateRole(params);
                        this.$message({
                            message: '保存成功',
                            type: 'success',
                        });
                        this.$emit('on-success')
                    } else {
                        delete params.roleId;
                        await this.api.saveRole(params);
                        this.$message({
                            message: '添加成功',
                            type: 'success',
                        });
                        this.$emit('on-success')
                    }
                    this.showDialog = false;
                })
            },
            open() {
                this.isEdit = false
                this.showDialog = true
                this.dialogTitle = '新增角色'
            },
            edit(info){
                this.isEdit = true
                this.showDialog = true
                this.form.name = info.name
                this.form.description = info.description
                this.form.roleId = info.id
                this.dialogTitle = '编辑角色'
            }
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
