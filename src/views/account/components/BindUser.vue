<template>
    <el-dialog title="关联角色" :visible.sync="showDialog">
        <el-table ref="multipleTable" :data="tableData" class="ui-table" @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="角色名"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
        </el-table>
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
                form:{
                    userId:''
                },
                tableData:[],
                multipleSelection:[]
            }
        },
        methods:{
            async open(info){
                this.form.userId = info.userId;
                this.showDialog = true;

                //获取角色列表
                let {data: {data: {records}}} = await this.api.getRoleList({
                    currentPage: 1,
                    pageSize: 1000
                });
                this.tableData = records;

                //获取已选择角色
                let {data: {data}} = await this.api.getRoleUserList(this.form);

                //清空选择
                this.$refs.multipleTable.clearSelection();
                //循环加上选择状态
                this.tableData.forEach(row => {
                    for(let id of data){
                        if(row['id'] === id){
                            this.$refs.multipleTable.toggleRowSelection(row);
                            break;
                        }
                    }
                });
            },
            async doSubmit() {
                try {
                    const params = {
                        ...this.form,
                        roleIds: this.multipleSelection.map(item => item.id).join(),
                    };

                    await this.api.saveRoleUser(params);
                    this.$message({
                        message: '关联成功',
                        type: 'success',
                    });
                    this.showDialog = false
                } finally {
                    this.isSubmit = false
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>

</style>
