<template>
    <el-table :inline="true" :data="tableData" class="ui-table">
        <el-table-column prop="name" label="角色名"></el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column prop="date" label="添加时间"></el-table-column>
        <el-table-column width="220" label="操作">
            <template>
                <el-button size="mini">权限</el-button>
                <el-button
                        size="mini"
                >编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                >删除</el-button>
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
                    name: '王二',
                    describe: '描述',
                    date: '2019-07-09 00:51:55'
                }, {
                    name: '王二',
                    describe: '描述',
                    date: '2019-07-09 00:51:55'
                }, {
                    name: '王二',
                    describe: '描述',
                    date: '2019-07-09 00:51:55'
                }, {
                    name: '王二',
                    describe: '描述',
                    date: '2019-07-09 00:51:55'
                }]
            }
        }
    }
</script>

<style scoped>

</style>
