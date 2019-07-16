<template>
    <div>
        <el-form :inline="true" :label-position="'right'" size="small" class="demo-form-inline">
            <el-form-item>
                <el-button plain type="primary" icon="el-icon-plus" @click="$refs['add-role'].open()">添加角色</el-button>
            </el-form-item>
        </el-form>
        <el-table :inline="true" :data="tableData" class="ui-table">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="角色名"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="date" label="添加时间"></el-table-column>
            <el-table-column width="220" label="操作">
                <template  slot-scope="scope">
                    <el-button size="mini" @click="$refs['resource'].open(scope.row)">权限</el-button>
                    <el-button
                            size="mini"
                            @click="$refs['add-role'].edit(scope.row)"
                    >编辑</el-button>
                    <el-button
                            @click.native.prevent="deleteRole(scope.row)"
                            size="mini"
                            type="danger"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="1"
                layout="total, prev, pager, next"
                :total="1">
        </el-pagination>
        <add-role ref="add-role" @on-success="getRoleList()"></add-role>
        <distribute-resource ref="resource"></distribute-resource>
    </div>
</template>

<script>
    import AddRole from './components/AddRole'
    import DistributeResource from './components/DistributeResource'
    export default {
        name: 'RoleList',
        components:{
            AddRole,
            DistributeResource
        },
        data () {
            return {
                tableData: [],
                currentPage:1,
            }
        },
        methods:{
            async getRoleList(){
                let {data: {data}} = await this.api.getRoleList({
                    currentPage: this.currentPage,
                    pageSize: 10,
                });
                this.tableData = data.records;
            },
            async deleteRole({id}) {
                try{
                    await this.$confirm('确定删除该角色？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    });
                    await this.api.deleteRole({
                        roleId: id
                    });
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                    });
                    this.getRoleList();
                } catch (e) {
                    if (e !== 'cancel') throw e
                } finally {
                    //
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        created(){
            this.getRoleList()
        }
    }
</script>

<style scoped>

</style>
