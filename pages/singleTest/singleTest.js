import { getSingleTests,
         userSingleTestsSaveOrUpdate
        } from '../../service/singleTest.js'
Page({
  data: {
    text: "This is page data.",
    singleTests:[],
    showPopup:false,
    currentSingleTest:{},
    currentIndex:'',
    changeAnswerFlag: false,
    answer: '',
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
  },
  showSingleTest(e) {
    console.log(e)
    let {item,index} = e.currentTarget.dataset
    this.setData({
      currentSingleTest:{
        ...item,
        currentIndex: index
      },
      currentIndex:index,
    })
    console.log(item)
    this.setData({ showPopup: true });
  },

  onClose() {
    this.setData({ showPopup: false });
  },
  onCheckAnwser (data) {
    console.log(data)
    let { changeRadioflg, radio } = data.detail
    this.setData({
      changeAnswerFlag: changeRadioflg,
      answer: radio
    })
  },
  saveOrUpdateAnwser (type) {
    let params = {
      userId: wx.getStorageSync('user').id,
      testId: this.data.currentSingleTest.id,
      answer:this.data.answer,
    }
    if (type === 'next') {
      userSingleTestsSaveOrUpdate(params,this.setNextData)
    } else {
      userSingleTestsSaveOrUpdate(params, this.setPrveData)
    }
  },

  prve () {
    if (this.data.answer) {
      this.saveOrUpdateAnwser('prve')
    } else {
      this.setPrveData()
    }
  },

  setPrveData () {
    let currentIndex = this.data.currentIndex === 0 ? 0 : this.data.currentIndex - 1
    this.setData({
      currentSingleTest: {
        ...this.data.singleTests[currentIndex],
        currentIndex: currentIndex
      },
      currentIndex: currentIndex
    })
  },

  next () {
    if (this.data.answer) {
      this.saveOrUpdateAnwser('next')      
    } else {
      this.setNextData()
    }
  },

  setNextData () {
    let currentIndex = this.data.currentIndex === this.data.singleTests.length - 1 ?
      this.data.singleTests.length - 1 : this.data.currentIndex + 1
    this.setData({
      currentSingleTest: {
        ...this.data.singleTests[currentIndex],
        currentIndex: currentIndex
      },
      currentIndex: currentIndex
    })
  }
})