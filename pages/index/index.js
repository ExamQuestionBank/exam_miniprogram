//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swipers:[
      { src:'https://cdn.pixabay.com/photo/2017/08/01/21/45/books-2568151_1280.jpg'},
      { src: 'https://cdn.pixabay.com/photo/2017/11/29/09/03/who-2985525_1280.jpg' },
      { src: 'https://cdn.pixabay.com/photo/2014/08/02/13/53/book-408302_1280.jpg' },
    ],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    contentItems:[
      {
        icon:'comment-o',
        text:'现代汉语',
      },
      {
        icon: 'flag-o',
        text: '教育学引论',
      },
      {
        icon: 'apps-o',
        text: '古代汉语',
      }, {
        icon: 'description',
        text: '案例分析',
      }, {
        icon: 'aim',
        text: '跨文化交际',
      }, {
        icon: 'newspaper-o',
        text: '中外文化',
      }

    ],
    testItems:[
      {
        icon: 'newspaper-o',
        text: '单选题',
        id:'single'
      },
      {
        icon: 'more-o',
        text: '多选题',
        id: 'multil'
      },
      {
        icon: 'todo-list-o',
        text: '简答题',
        id:'answer'
      },
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goPage: function(e) {
    let item = e.currentTarget.dataset.item
    switch (item.id) {
      case 'single':
        wx.navigateTo({
          url: '../singleTest/singleTest'
        })
      default:
       return false
    }
  }
})
