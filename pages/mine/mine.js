let app = getApp()
Page({
  data:{
    name:'我的',
    userInfo: null,
  },
  onLoad: function () {
    this.initData()
  },
  initData() {
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo:app.globalData.userInfo
    })
  },
  getUserInfo: function(e) {
    console.log(e)
  },
  userInfoHandler(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})