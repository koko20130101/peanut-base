<template>
    <div>
        <el-row type="flex" justify="space-between">
            <el-col :span="20">
                <el-form :inline="true" :label-position="'right'" ref="form" :model="form" class="demo-form-inline">
                    <el-form-item label="用户名:">
                        <el-input v-model="form.username" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名:">
                        <el-input v-model="form.realname" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="4" align="right">
                <div class="tool-buttons">
                    <el-button plain type="primary" icon="el-icon-plus" @click="$refs['add-user'].open()">添加用户</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table :data="tableData" class="ui-table">
            <el-table-column prop="userId" label="ID"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="realname" label="真实姓名"></el-table-column>
            <el-table-column prop="action" width="260" label="操作">
                <template #default="{ row }">
                    <el-button size="mini" @click="$refs['add-user'].edit(row)">编辑
                    </el-button>
                    <el-button size="mini">关联角色</el-button>
                    <el-button size="mini" @click="$refs['reset-pwd'].edit(row)">修改密码</el-button>
                </template>
            </el-table-column>
        </el-table>
        <add-user ref="add-user"></add-user>
        <reset-pwd ref="reset-pwd"></reset-pwd>
    </div>
</template>

<script>
    import AddUser from './components/AddUser';
    import ResetPwd from './components/ResetPwd';

    export default {
        name: 'UserList',
        components: {
            AddUser,
            ResetPwd
        },
        data() {
            return {
                form: {
                    username: '',
                    realname: ''
                },
                tableData: [{
                    userId: '324343',
                    username: '王二',
                    realname: '王二',
                }, {
                    userId: '324343',
                    username: '王二',
                    realname: '王二',
                }]
            }
        }
    }
</script>

<style scoped>

</style>
