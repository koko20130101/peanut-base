//主视图
const main = () => import(/* webpackChunkName: "home" */ '@/views/Home');
export default [
    {
        path: '/',
        name: 'Home',
        component: main,
        meta:{
            title:'首页',
            isAuth:true
        }
    },
    {
        path: '',
        name: 'account',
        meta:{
            title:'系统管理',
            isAuth:true
        },
        component: main,
        children:[
            {
                path:'user/list',
                name:'UserList',
                meta:{
                    title: '用户管理',
                    isAuth:true,
                },
                component: () => import(/* webpackChunkName: "userList" */ '@/views/account/UserList')
            },
            {
                path:'role/list',
                name:'RoleList',
                meta:{
                    title: '角色管理',
                    isAuth:true,
                },
                component: () => import(/* webpackChunkName: "userList" */ '@/views/account/RoleList')
            },
            {
                path:'resource/list',
                name:'ResourceList',
                meta:{
                    title:'权限管理',
                    isAuth:true
                },
                component:() => import(/* webpackChunkName */ '@/views/account/ResourceList')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            requireAuth: false,
            keepAlive: true
        },
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login')
    }
]
