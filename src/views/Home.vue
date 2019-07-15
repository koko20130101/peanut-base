<template>
    <el-container class="container">
        <el-aside class="side-bar" :style="{width:sideBarWidth+'px'}">
            <side-bar :collapse="collapse"></side-bar>
        </el-aside>
        <el-container>
            <el-header height="40px" class="main-nav-top">
                <Header @change-collapse="changeCollapse"></Header>
            </el-header>
            <el-main class="main-content">
                <Breadcrumb></Breadcrumb>
                <div class="content">
                    <router-view/>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/Header/'
    import SideBar from '@/components/SideBar/'
    import Breadcrumb from '@/components/Breadcrumb/'

    export default {
        name: 'home',
        data() {
            return {
                collapse: false,
                sideBarWidth:200
            }
        },
        components: {
            Header,
            SideBar,
            Breadcrumb
        },
        methods: {
            aliveHandle() {
            },
            changeCollapse() {
                this.collapse = !this.collapse;
                //左侧导航收缩和展开的宽度
                if(this.collapse){
                    this.sideBarWidth = 64;
                }else{
                    this.sideBarWidth = 200;
                }
            }
        },
        /*beforeCreate(){
            console.log(1)
        },
        created(){
            console.log(2)
        },
        beforeMount(){
            console.log(3)
        },
        mounted(){
            console.log(4)
        },
        beforeUpdate(){
            console.log(5)
        },
        beforeDestroy(){
            console.log(6)
        },
        destroyed(){
            console.log(7)
        }*/

    }
</script>
<style scoped>

</style>
