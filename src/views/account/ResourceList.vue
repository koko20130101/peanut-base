<template>
    <div>
        <el-form :inline="true" :label-position="'right'" size="small" ref="form" :model="form" class="demo-form-inline">
            <el-form-item label="资源类型:">
                <el-input v-model="form.resourceType" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button plain type="primary" icon="el-icon-plus" @click="$refs['add-resource'].open()">添加资源</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" class="ui-table">
            <el-table-column
                    type="index"
                    label="id"
                    width="50">
            </el-table-column>
            <el-table-column prop="resourceName" label="资源名称"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="resourceCode" label="资源编码"></el-table-column>
            <el-table-column prop="isCascade" label="是否级联"></el-table-column>
            <el-table-column prop="resourceType" label="资源类型"></el-table-column>
            <el-table-column prop="id" label="id(父id)"></el-table-column>
            <el-table-column width="150" label="操作">
                <template #default="{ row }">
                    <el-button size="mini"
                               @click="$refs['add-resource'].edit(row)">编辑</el-button>
                    <el-button type="danger"
                               size="mini" @click="deleteResource">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <add-resource ref="add-resource"></add-resource>
    </div>
</template>

<script>
    import AddResource from './components/AddResource';
    export default {
        name: 'RoleList',
        components:{
            AddResource
        },
        data () {
            return {
                form:{
                    resourceType:'',
                },
                tableData: [],
                currentPage:1
            }
        },
        methods:{
            onSearch() {
                this.getResourceList(1)
            },
            async getResourceList(){
                let {data: {data}} = await this.api.getResourceList({
                    ...this.form,
                    currentPage: this.currentPage,
                    pageSize: 10
                });
                this.tableData = data.records;
            },
            async deleteResource(){
                try{
                    await this.$confirm('确定删除该资源？','提示',{
                        confirmButtonText:'确定',
                        cancelButtonText:'取消',
                        type:'warning'
                    })
                }catch(error){
                    //
                }
            }
        },
        created(){
            this.getResourceList()
        }
    }
</script>

<style scoped>

</style>
