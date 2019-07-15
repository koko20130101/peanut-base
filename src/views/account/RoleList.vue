<template>
    <div>
        <el-row>
            <el-col :span="24" align="right">
                <div class="tool-buttons">
                    <el-button plain type="primary" icon="el-icon-plus" @click="$refs['add-role'].open(row)">添加角色</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table :inline="true" :data="tableData" class="ui-table">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="角色名"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="date" label="添加时间"></el-table-column>
            <el-table-column width="220" label="操作">
                <template  #default="{ row }">
                    <el-button size="mini" @click="$refs['resource'].open(row)">权限</el-button>
                    <el-button
                            size="mini"
                            @click="$refs['add-role'].edit(row)"
                    >编辑</el-button>
                    <el-button
                            @click.native.prevent="deleteRow(row)"
                            size="mini"
                            type="danger"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <add-role ref="add-role"></add-role>
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
                tableData: [{
                    id:'1',
                    name: '王二',
                    description: '描述',
                    date: '2019-07-09 00:51:55'
                }, {
                    id:'2',
                    name: '王二',
                    description: '描述',
                    date: '2019-07-09 00:51:55'
                }, {
                    id:'3',
                    name: '王二',
                    description: '描述',
                    date: '2019-07-09 00:51:55'
                }, {
                    id:'4',
                    name: '王二',
                    description: '描述',
                    date: '2019-07-09 00:51:55'
                }]
            }
        },
        methods:{
            async deleteRow({id}) {
                try{
                    await this.$confirm('确定删除该角色？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    });
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                    })
                } catch {
                    //
                }
            }
        }
    }
</script>

<style scoped>

</style>
