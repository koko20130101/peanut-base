import {api} from '@/api'
import utils from '@/utils'
import {REQ_RETRY_TIME} from '@/config'

const state = {
    token: '',
    index: {}
}

const getters = {
    isLogin(state, getters, rootState) {
        return !!rootState.user.userInfo.userId
    }
}

const mutations = {
    setToken(state, token) {
        state.token = token
        // 存到本地
        utils.storage.set('token', token, {secure: false})
    },
    // 登录后默认页
    updateIndex(state, firstPage) {
        state.index = firstPage
    }
}

const actions = {
    // 登录
    login({commit}, params) {
        return api.doLogin(params).then(res => {
            // 解构赋值
            const {data: {data}} = res
            const {token, ...userInfo} = data
            // 设置状态中的token
            commit('setToken', token);
            // 设置用户状态模块中的用户信息
            commit('user/updateUserInfo', userInfo, {root: true})
            return res
        })
    },
    // 登出
    async logout() {
        try {
            await api.doLoginOut()
        } catch (error) {
            //
        }
        // 清除本地存储
        utils.storage.clear()
        window.location = '/login'
    },

    async getMenu(){

    },

    restoreData({dispatch}) {
        dispatch('user/restoreUserInfo', {}, {root: true})
    }
}

export default {
    namespaced: true, // 解决不同模块命名冲突的问题，各页面引用时要加上模块名
    state,
    mutations,
    actions,
    getters
}
