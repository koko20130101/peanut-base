export default [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
        children:[
            {
                path:'user/list',
                name:'UserList',
                meta:{
                    title: '用户管理',
                    isAuth:true,
                },
                component: () => import(/* webpackChunkName: "userList" */ '@/views/account/UserList')
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
