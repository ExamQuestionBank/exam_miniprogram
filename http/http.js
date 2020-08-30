// let baseUrl = 'http://47.104.100.102:7001/';
let baseUrl = 'http://127.0.0.1:7001/';
// let baseUrl = 'https://www.taotaoxu.cn/'


function geHeader() {
  const header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  try {
    let token = wx.getStorageSync('access_token')
    if (token) {
      return {
        ...header,
        'Authorization': `Bearer ${token}`
      }
    }
  } catch (e) {
    console.log(e)
  }
}

function get(url,cb) {
  wx.request({
    url: baseUrl + url,
    header: geHeader(),
    method: 'get',
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function post(url,data,cb) {
  wx.request({
    url: baseUrl + url,
    header: geHeader(),
    data:data,
    method: 'post',
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

module.exports = {
  get,
  post
}