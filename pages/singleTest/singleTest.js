import { getSingleTests} from '../../service/singleTest.js'
Page({
  data: {
    text: "This is page data.",
    singleTests:[
      1,3,4
    ],
  },
  onLoad: function (options) {
    // 页面创建时执行
    this.getSingleTests()
  },
  onShow: function () {
    // 页面出现在前台时执行
  },
  onReady: function () {
    // 页面首次渲染完毕时执行
  },
  onHide: function () {
    // 页面从前台变为后台时执行
  },
  onUnload: function () {
    // 页面销毁时执行
  },
  onPullDownRefresh: function () {
    // 触发下拉刷新时执行
  },
  onReachBottom: function () {
    // 页面触底时执行
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onPageScroll: function () {
    // 页面滚动时执行
  },
  onResize: function () {
    // 页面尺寸变化时执行
  },
  getSingleTests: function () {
    const params = {
      current: 1,
      filter: {},
      pageSize: 20,
    }
    getSingleTests({params},this.dealSingleTestData)
  },
  dealSingleTestData: function (res) {
    console.log(res)
    if (res.success) {
      this.setData({
        singleTests: res.data
      })
    }
  }
})