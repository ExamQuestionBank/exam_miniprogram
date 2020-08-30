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
    active:0,
    loading:false,
    tabIndex:0,
    needUpdate: false,
    currentPage:1,
    pageSize:100,
    total:0,
    loadAll:false,
  },
  onLoad: function (options) {
    // 页面创建时执行
    this.getSingleTests(true,false)
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
  onChangeTab: function (data) {
    this.setData({
      tabIndex: data.detail.index
    })
    if (data.detail.index === 0){
      this.getSingleTests(true)
    } else {
      this.getSingleTests(false)
    }
  },
  lower: async function () {
    if (this.data.loadAll) {
      return false
    }
    let {total,singleTests,currentPage} = this.data
    if (total > singleTests.length) {
      currentPage = currentPage + 1
      this.setData({
        currentPage,
      })
    } else {
      return false
    }
    if (this.data.tabIndex === 0) {
      await this.getSingleTests(true,true)
    } else {
      await this.getSingleTests(false,true)
    }
  },
  getSingleTests: function (todo,loadMore) {
    this.setData({loading:true})
    const params = {
      current: this.data.currentPage,
      filter: {},
      pageSize: this.data.pageSize,
      userId: wx.getStorageSync('user').id,
      todo:todo
    }
    getSingleTests({params},data => this.dealSingleTestData (data, loadMore))
    this.setData({needUpdate:false})
  },
  dealSingleTestData: function (res, loadMore) {
    this.setData({ loading: false })
    let singleTests = res.data
    if (singleTests.length < this.data.pageSize) {
      this.setData({
        loadAll:true
      })
    } else {
      this.setData({
        loadAll:false
      })
    }
    if (loadMore && res.success){
      singleTests = [...this.data.singleTests,...singleTests]
      console.log(singleTests)
    }
    this.setData({
      singleTests: singleTests,
      total:res.total
    })
  },
  showSingleTest(e) {
    let {item,index} = e.currentTarget.dataset
    this.setData({
      currentSingleTest:{
        ...item,
        currentIndex: index
      },
      currentIndex:index,
    })
    this.setData({ showPopup: true });
  },

  onClose() {
    this.setData({ showPopup: false });
    if (!this.data.needUpdate) {
      return false
    }
    if (this.data.tabIndex === 0) {
      this.getSingleTests(true)
    } else {
      this.getSingleTests(false)
    }
  },
  onCheckAnwser (data) {
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
    this.setData({
      needUpdate: true
    })
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