<template>
    <div>
        <el-form :inline="true" :label-position="'right'" size="small" ref="form" :model="form" class="demo-form-inline">
            <el-form-item label="用户名:">
                <el-input v-model="form.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="真实姓名:">
                <el-input v-model="form.realname" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button plain type="primary" icon="el-icon-plus" @click="$refs['add-user'].open()">添加用户</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" class="ui-table">
            <el-table-column prop="userId" label="ID"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="realname" label="真实姓名"></el-table-column>
            <el-table-column width="100"  label="状态">
                <template slot-scope="scope">
                    <el-button size="mini"
                               :type="scope.row.userStatus === 1 ? 'success' : 'info'"
                               @click="updateUserStatus(scope.row)">
                        {{scope.row.userStatus == 1 ? '已启用' : '已禁用'}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="userStatus" width="260" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="$refs['add-user'].edit(scope.row)">编辑
                    </el-button>
                    <el-button size="mini" @click="$refs['bind-user'].open(scope.row)">关联角色</el-button>
                    <el-button size="mini" @click="$refs['reset-pwd'].edit(scope.row)">修改密码</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                :page-count="pageCount"
                layout="total, prev, pager, next"
                :total="total">
        </el-pagination>
        <add-user ref="add-user" @on-success="getUserList()"></add-user>
        <reset-pwd ref="reset-pwd"></reset-pwd>
        <bind-user ref="bind-user"/>
    </div>
</template>

<script>
    import AddUser from './components/AddUser';
    import ResetPwd from './components/ResetPwd';
    import BindUser from './components/BindUser';

    export default {
        name: 'UserList',
        components: {
            AddUser,
            ResetPwd,
            BindUser
        },
        data() {
            return {
                form: {
                    username: '',
                    realname: ''
                },
                tableData: [],
                currentPage: 1,
                pageSize:0,
                pageCount:0,
                total:0
            }
        },
        methods:{
            onSearch(){
                this.getUserList(1)
            },
            async getUserList(currentPage = this.currentPage) {
                try {
                    const {data: {data}} = await this.api.getUserList({
                        ...this.form,
                        currentPage,
                        pageSize: 10
                    });
                    this.tableData = data['records'];
                    this.currentPage = data.currentPage;
                    this.pageSize = data.pageSize;
                    this.total = data.total;
                    this.pageCount = data.pages
                } finally {
                    this.isSubmit = false
                }
            },
            async updateUserStatus({ userId, userStatus }){
                let params = {
                    userId,
                    status: userStatus === 1 ? 2:1
                };
                await this.api.updateUserStatus(params);
                this.$message({
                    message: '操作成功',
                    type: 'success',
                });
                await this.getUserList();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.getUserList(val)
            }
        },
        created() {
            this.getUserList()
        }
    }
</script>

<style scoped>

</style>
