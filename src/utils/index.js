import AES from 'crypto-js/aes'
import ENC_UTF8 from 'crypto-js/enc-utf8'

import {
  AES_SECRET_KEY
} from '@/config/'

export default {
  storage: {
    /**
     * 本地存储加密解密 暂未实现cookie存储
     *
     * @param {*} key
     * @param {*} value
     * @param {* }[{ fallback = true, secure = true, cookie = false } = {}] 出错使用session secure使用加密 cookie使用cookie
     * @returns 加密的值，出错返回null
     */
    set (key, value, { fallback = true, secure = true, cookie = false } = {}) {
      const type = Object.prototype.toString.call(value)
      switch (type) {
        case '[object Object]':
        case '[object Array]':
          value = JSON.stringify(value)
          break
        case '[object Number]':
          value = value.toString()
          break
        default:
          break
      }
      //加密
      //secure && (value = AES.encrypt(value, AES_SECRET_KEY).toString())
      if (cookie) {
        // nothing
      } else {
        try {
          window.localStorage.setItem(key, value)
        } catch (e) {
          if (fallback) {
            try {
              window.sessionStorage.setItem(key, value)
            } catch (ee) {
              return null
            }
          } else {
            return null
          }
        }
      }
      return value
    },
    get (key, { fallback = true, secure = true, cookie = false } = {}) {
      let value = null
      if (cookie) {
        // nothing
      } else {
        value = window.localStorage.getItem(key)
        if (value === null && fallback) value = window.sessionStorage.getItem(key)
      }
      if (value !== null) {
        //解密
        //secure && (value = AES.decrypt(value, AES_SECRET_KEY).toString(ENC_UTF8))
        try {
          const _value = JSON.parse(value)
          const type = Object.prototype.toString.call(_value)
          if (type === '[object Object]' || type === '[object Array]') value = _value
        } catch (e) {}
      }
      return value
    },
    remove (key, { fallback = true, cookie = false } = {}) {
      window.localStorage.removeItem(key)
      fallback && window.sessionStorage.removeItem(key)
    },
    clear ({ fallback = true, cookie = false } = {}) {
      window.localStorage.clear()
      fallback && window.sessionStorage.clear()
    }
  }
}
