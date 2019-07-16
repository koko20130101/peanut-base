<template>
<el-dialog
        title="权限设置"
        :width="'400px'"
        :visible.sync = "showDialog">
    <el-tree
            ref="tree"
            :props="treeProps"
            :data="treeData"
            show-checkbox
            node-key="id">

    </el-tree>
    <template #footer>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button  type="primary" :loading="isSubmit" @click="doSubmit">确 定</el-button>
        </div>
    </template>
</el-dialog>
</template>

<script>
    export default {
        name: "DistributeResource",
        data(){
            return {
                showDialog:false,
                isSubmit:false,
                form: {
                    roleId: '',
                },
                treeProps: {
                    label: 'resourceName'
                },
                treeData: [],
            }
        },
        watch: {
            showDialog: {
                handler(curr) {
                    if (!curr) {
                        this.form = this.$options.data().form
                    }
                },
            },
        },
        methods:{
            async doSubmit(){
                try {
                    this.isSubmit = true
                    const params = {
                        ...this.form,
                        resourceIds: this.$refs.tree.getCheckedNodes().map(item => item.id).join(),
                    }
                    await this.api.saveRoleResourceList(params)
                    this.$message({
                        message: '保存成功',
                        type: 'success',
                    })
                    this.$emit('on-success')
                    this.showDialog = false
                } finally {
                    this.isSubmit = false
                }
            },
            //获取权限分配数据
            async getTreeData(){
                try{
                    //返回权限数据
                    this.treeData = [];
                    const {data: {data}} = await this.api.getResourceAuthList(this.form);
                    this.treeData = data;
                    const checkedKeys = this.getCheckedKeysFromTreeData(data)
                    this.$refs['tree'].setCheckedKeys(checkedKeys)
                }catch(error){
                    //
                }
            },
            // 通过后台返回的数据获取选择的keys
            getCheckedKeysFromTreeData(list) {
                const keys = []
                console.log(list)

                list.forEach(item => {
                    if (item.checked) {
                        keys.push(item.id)
                    }
                    if (item.children.length) {
                        keys.push(...this.getCheckedKeysFromTreeData(item.children))
                    }
                })
                return keys
            },
            open(info){
                this.form.roleId = info.id
                this.getTreeData()
                this.showDialog = true
            }
        }
    }
</script>
