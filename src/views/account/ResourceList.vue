<template>
    <el-table :data="tableData" border class="ui-table">
        <el-table-column
                type="index"
                label="id"
                width="50">
        </el-table-column>
        <el-table-column prop="name" label="账号"></el-table-column>
        <el-table-column prop="relName" label="用户名称"></el-table-column>
        <el-table-column prop="addDate" label="创建日期"></el-table-column>
        <el-table-column prop="reviseDate" label="修改日期"></el-table-column>
        <el-table-column width="340" label="操作">
            <template slot-scope="scope">
                <el-button size="mini">编辑</el-button>
                <el-button type="danger" size="mini">删除</el-button>
                <el-button size="mini">修改密码</el-button>
                <el-button size="mini">权限分配</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: 'RoleList',
        data () {
            return {
                tableData: [{
                    name: 'wanger',
                    relName: '王二',
                    addDate: '2019-07-09 00:51:55',
                    reviseDate: '2019-07-09 00:51:55'
                }, {
                    name: 'wanger',
                    relName: '王二',
                    addDate: '2019-07-09 00:51:55',
                    reviseDate: '2019-07-09 00:51:55'
                }, {
                    name: 'wanger',
                    relName: '王二',
                    addDate: '2019-07-09 00:51:55',
                    reviseDate: '2019-07-09 00:51:55'
                }]
            }
        }
    }
</script>

<style scoped>

</style>
