<template>
  <el-container class="container">
    <el-aside width="200px" class="side-bar">
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
    data(){
        return {
            collapse: false
        }
    },
  components: {
      Header,
      SideBar,
      Breadcrumb
  },
    methods: {
        aliveHandle () {
            console.log(this.$route)
        },
        changeCollapse () {
            this.collapse = !this.collapse
        }
    },
}
</script>
