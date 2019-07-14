<template>
  <div class="header">
    <div class="welcome">
      <el-button type="text" icon="el-icon-s-fold" @click="collapsedSideBar"></el-button>
      您好，a491810145, 欢迎登录花生小店运营系统
    </div>
    <el-dropdown class="top-dropdown" @command="handleCommand">
      <span class="el-dropdown-link">
        管理员<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu>
        <el-dropdown-item command="1">修改密码</el-dropdown-item>
        <el-dropdown-item command="2">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'Header',
  methods: {
    ...mapActions({
      logout: 'app/logout'
    }),
    collapsedSideBar: function () {
      this.$emit('change-collapse')
    },
    handleCommand (command) {
      switch (command) {
        case '2':
          this.logout()
      }
    }
  }
}
</script>

<style lang="scss">

</style>
