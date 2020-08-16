import { post } from '../http/http.js'

function wechatLogin (data) {
  post('api/wechat/wechatLogin', data, loginCallBack)
}

function loginCallBack (res) {
  if (res && res.status === 'ok') {
    try {
      wx.setStorageSync('access_token', res.data.access_token)
      wx.setStorageSync('user', res.data.user)
    } catch (e) {
      console.log(e)
     }
  } else {
    console.log('error')
  }
  
}

module.exports = {
  wechatLogin
}