/* 构建相关 */
export const ENV = process.env.VUE_APP_CONFIG_ENV // 当前环境
export const CONFIG_ENV_DEV = 'development' // 开发环境
export const CONFIG_ENV_TEST = 'testing' // 测试环境
export const CONFIG_ENV_PROD = 'production' // 生产环境
export const IS_DEV = ENV === CONFIG_ENV_DEV
export const IS_TEST = ENV === CONFIG_ENV_TEST
export const IS_PROD = ENV === CONFIG_ENV_PROD
export const BASE_URL = process.env.BASE_URL

/* 响应 */
export const RES_SUC_CODE = 200 // 请求返回成功状态码
// export const RES_FAIL_DATED_CODE = 110000 // 请求返回登录过期状态码
// export const RES_FAIL_LOGIN_CODE = 10005 // 请求返回登录密码错误状态码
// export const RES_FAIL_DENIED_CODE = 10008 // 请求返回状态码 没有权限操作

/* 通知 */
export const MESSAGE_DURATION_DEFAULT = 4 // 提示默认时长 s
export const MESSAGE_DURATION_LONG = 8 // 提示时长长
export const NOTICE_DURATION_DEFAULT = 5 // 通知默认时长 s
export const NOTICE_DURATION_LONG = 8 // 通知时长长

/* AES 秘钥 */
export const AES_SECRET_KEY = 'LKAPMGOBEE9QEUZO'
