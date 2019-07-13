<template>
  <div class="aside">
    <div class="logo">
      <img src="../assets/img/logo.png" alt="">
    </div>
    <el-menu :default-active="onRoute" @select="selectMenu" :collapse="collapse">
      <template v-for="item in menuList">
        <el-submenu v-if="item.children && item.children.length  > 0" :key="item.routerName" :index="item.routerName">
          <template slot="title">
            <i class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <template v-for="sub in item.children">
            <el-submenu v-if="sub.children && sub.children.length > 0" :key="sub.routerName" :index="sub.routerName">
              <span slot="title">{{sub.title}}</span>
              <el-menu-item v-for="third in sub.children" :key="third.routerName" :index="third.routerName">
                {{third.title}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="sub.routerName" :index="sub.routerName">{{sub.title}}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :key="item.routerName" :index="item.routerName">
          <i class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'SideBar',
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isCollapse: false,
      onRoute: 'UserList',
      menuList: [
        {
          'id': 53,
          'title': '系统管理',
          'icon': 'ios-settings',
          'routerName': '7',
          'children': [
            {
              'id': 58,
              'title': '用户管理',
              'icon': null,
              'routerName': 'UserList',
              'children': []
            },
            {
              'id': 59,
              'title': '角色管理',
              'icon': null,
              'routerName': 'RoleList',
              'children': []
            },
            {
              'id': 98,
              'title': '权限管理',
              'icon': '',
              'routerName': 'ResourceList',
              'children': []
            }
          ]
        }
      ]
    }
  },
  /*computed: {
    ...mapState({
      menuList: state => state.app.menuList
    }),
    onRoute () {
      return this.$route.name
    }
  },*/
  methods: {
    selectMenu (routerName, indexPath) {
        console.log(this.$router)
      // this.$emit('change-router')
      /*this.$router.push({
        name: routerName
      })*/
        console.log(this.$router)
    }
  }
}
</script>

<style scoped>
</style>
