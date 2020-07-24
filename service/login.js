import {post} from '../http/http.js'

function login () {
  let data = {
    "username": "wendy",
    "password": "123654"
  }
  post('api/user/login', data, loginCallBack)

}

function loginCallBack (res) {
  if (res && res.status === 'ok') {
    try {
      wx.setStorageSync('access_token', res.data.access_token)
    } catch (e) {
      console.log(e)
     }
  } else {
    console.log('error')
  }
  
}

export default login