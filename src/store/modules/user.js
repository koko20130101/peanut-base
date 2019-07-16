import utils from '@/utils'

const state = {
    userInfo: {},
    menuList:[] //左侧导航菜单
}

const getters = {
    userInfo: state => state.userInfo
}

const mutations = {
    // 更新用户信息
    updateUserInfo(state, info) {
        // 去重合并对象
        state.userInfo = {...state.userInfo, ...info}
        // 存储到本地
        utils.storage.set('userInfo', state.userInfo)
    }
}

const actions = {
    async getMenu({state}, {userId} = {}) {
        const {data: {data}} = await api.getUserResourcesByResourceType({
            userId,
            resourceType: '菜单',
        });

        //commit('setMenuList', data);
        //utils.storage.set('menuList', data);
    },
    restoreUserInfo({commit}) {
        try {
            // 从本地存储中获取数据
            let userInfo = utils.storage.get('userInfo')
            if (userInfo) {
                commit('updateUserInfo', userInfo)
            }
        } catch (error) {
            //
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
