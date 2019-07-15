<template>
<el-dialog
        title="权限设置"
        :width="'400px'"
        :visible.sync = "showDialog">
    <el-tree ref="tree" :props="treeProps" :data="treeData" show-checkbox>

    </el-tree>
    <template #footer>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" :loading="isSubmit">确 定</el-button>
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
                treeProps: {
                    label: 'resourceName'
                },
                treeData: [],
            }
        },
        methods:{
            async doSubmit(){
                this.isSubmit = true
            },
            //获取权限分配数据
            async getTreeData(){
                try{
                    //返回权限数据
                    this.treeData = [{
                        resourceName: '账户管理',
                        children: [{
                            resourceName: '用户管理'
                        },{
                            resourceName: '角色管理'
                        },{
                            resourceName: '资源管理'
                        }]
                    }]

                }catch(error){
                    //
                }
            },
            open(info){
                this.showDialog = true
                this.getTreeData()
            }
        }
    }
</script>
