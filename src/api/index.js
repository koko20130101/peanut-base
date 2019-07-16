import axios from './axios'

const api = {

    /* user-info-controller : 用户相关 */
    // 获取后台用户列表
    getUserList: params => axios.post('/user/bgGetUserList', params),
    // 后台重置/修改密码
    resetPassword: params => axios.post('/user/bgResetPassword', params),
    // 后台用户登录
    doLogin: params => axios.post('/user/bgSignIn', params),
    // 退出登录
    doLogout: params => axios.post('/admin/logout', params),
    // 后台用户注册
    doRegister: params => axios.post('/user/bgSignUp', params),
    // 后台修改用户
    updateUser: params => axios.post('/user/bgUpdateUser', params),
    // 后台更新用户状态 0:未激活 1:激活 2:禁用
    updateUserStatus: params => axios.post('/user/bgUpdateStatus', params),

    /* role-feign-controller : 角色相关 */
    // 删除角色
    deleteRole: params => axios.post('/role/delete', params),
    // 角色列表
    getRoleList: params => axios.post('/role/queryList', params),
    // 新建角色
    saveRole: params => axios.post('/role/save', params),
    // 更新角色
    updateRole: params => axios.post('/role/update', params),
    // 获取用户所有角色
    getRoleUserList: params => axios.post('/roleUser/getRoleUserList', params),
    // 保存用户角色关系
    saveRoleUser: params => axios.post('/roleUser/saveRoleUserList', params),

    /* menu-resource-controller : 资源相关 */
    // 删除资源
    deleteResource: params => axios.post('/resource/delete', params),
    // 资源分配树列表
    getResourceAuthList: params => axios.post('/resource/getResourceAuthList', params),
    // 根据用户ID、appID和资源类型获取用户所拥有的资源
    getUserResourcesByResourceType: params => axios.post('/resource/getUserResourcesByResourceType', params),
    // 资源列表
    getResourceList: params => axios.post('/resource/resourceList', params),
    // 资源添加
    saveResource: params => axios.post('/resource/save', params),
    // 根据id查看资源
    // getSelectResourceById: params => request.post('/resource/selectById', params),
    // 资源更新
    updateResource: params => axios.post('/resource/update', params),
}

export {api}
