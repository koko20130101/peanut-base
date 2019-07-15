import axios from './axios'

const  api = {
  /* user-info-controller : 用户相关 */
  // 获取后台用户列表
  getUserList: params => axios.post('/user/bgGetUserList', params),
  // 后台重置/修改密码
  resetPassword: params => axios.post('/user/bgResetPassword', params),
  // 后台用户登录
  doLogin: params => axios.post('/user/bgSignIn', params),
  // 后台用户注册
  doRegister: params => axios.post('/user/bgSignUp', params),
  // 后台修改用户
  updateUser: params => axios.post('/user/bgUpdateUser', params),
}

export {api}
