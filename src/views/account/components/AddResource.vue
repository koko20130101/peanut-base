<template>
    <el-dialog
            :visible.sync="showDialog"
            :title="dialogTitle"
            width="500px">
        <el-form ref="form" :model="form" :rules="rules" label-width="85px">
            <el-form-item label="资源名称" prop="resourceName">
                <el-input
                        v-model="form.resourceName"
                        clearable/>
            </el-form-item>
            <el-form-item label="资源编码" prop="resourceCode">
                <el-input
                        v-model="form.resourceCode"
                        clearable/>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input
                        v-model="form.description"
                        clearable/>
            </el-form-item>
            <el-form-item label="资源类型" prop="resourceType">
                <!--<el-select v-model="form.resourceType" placeholder="请选择" value="">
                    <el-option
                            :key="1"
                            :label="'菜单'"
                            :value="2"/>
                </el-select>-->
            </el-form-item>
            <el-form-item label="是否级联" prop="isCascade">
                <el-switch v-model="form.isCascade"/>
            </el-form-item>
            <el-form-item label="父级id" prop="parentId">
                <el-input
                        v-model="form.parentId"
                        placeholder="仅对级联菜单有效" clearable/>
            </el-form-item>
            <el-form-item label="参数约束" prop="parameterRestriction">
                <el-input
                        v-model="form.parameterRestriction"
                        clearable/>
            </el-form-item>
            <el-form-item label="排序号" prop="orderNum">
                <el-input
                        v-model="form.orderNum"
                        placeholder="从小到大排序" clearable/>
            </el-form-item>
        </el-form>
        <template>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" :loading="isSubmit">确 定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
    const defaultRule = { required: true, message: '请输入正确', trigger: 'change' };
    export default {
        name: "ResourceAdd",
        data() {
            return {
                showDialog:false,
                isEdit: true,
                isSubmit:false,
                dialogTitle:'',
                form: {
                    resourceName: '',
                    resourceCode: '',
                    description: '',
                    resourceType: '',
                    isCascade: false,
                    parentId: '',
                    parameterRestriction: '',
                    orderNum: '',
                    id: '', // 编辑时需要
                },
                rules: {
                    resourceName: [{ ...defaultRule }],
                    resourceCode: [{ ...defaultRule }],
                    resourceType: [{ ...defaultRule }],
                },
            }
        },
        methods:{
            open(){
                this.isEdit = false;
                this.showDialog = true;
                this.dialogTitle = '添加资源'
            },
            edit(info){
                console.log(info)
                this.showDialog = true;
                this.isEdit = true;
                this.dialogTitle = '编辑资源'
            }
        }
    }
</script>
