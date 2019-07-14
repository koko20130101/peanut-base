import Vue from 'vue' // 引入Vue
import Router from 'vue-router' // 引入 vue-router
import routes from './routers' // 引入路由配置

Vue.use(Router) // Vue全局使用Router

const router = new Router({
    mode: 'history', // 去掉url中的#
    base: process.env.BASE_URL,
    routes
})

// beforeEach钩子函数：在跳转之前执行
router.beforeEach((to, from, next) => {
    /* to:将要进入的路由
       from:当前导航即将离开的路由
       next:Function,进行管道中的一个钩子，如果执行完了，
            则导航的状态就是 confirmed （确认的）；否则为false，终止导航。
     */
    // 根据路由设置的requireAuth决定该路由是否要检查登录
    if (to.meta.isAuth) {
        next()
        // 检查是否登录
        /*if (store.getters['app/isLogin']) {
            next()
        } else {
            next({
                name: 'Login'
            })
        }*/
    } else {
        next()
    }
})
// afterEach钩子函数：在跳转之后判断
router.afterEach(() => {
    // 路由跳转完成后
})

export default router
