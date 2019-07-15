import utils from '@/utils'

const state = {
  info: {}
}

const getters = {
  info: state => state.info
}

const mutations = {
  // 更新用户信息
  updateInfo (state, info) {
    // 去重合并对象
    state.info = {...state.info, ...info}
    // 存储到本地
    utils.storage.set('userInfo', state.info)
  }
}

const actions = {
  restoreInfo ({commit}) {
    try {
      // 从本地存储中获取数据
      let userInfo = utils.storage.get('userInfo')
      if (userInfo) {
        commit('updateInfo', userInfo)
      }
    } catch (error) { }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
