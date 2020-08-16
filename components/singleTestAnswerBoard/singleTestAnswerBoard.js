// components/singleTestAnswerBoard/singleTestAnswerBoard.js
import {
  getUserSingleTest
} from '../../service/singleTest.js'
Component({
  /**
   * Component properties
   */
  properties: {
    currentSingleTest: { // 属性名
      type: Object,
      value: {}
    },
  },

  /**
   * Component initial data
   */
  data: {
    testItem:{},
    radio:'',
    changeRadioflg: false,
    currentUserSingleTest: '',
    practiced: false,
  },

  // 监听properties变化
  observers: {
    'currentSingleTest':function (newVal) {
      this.initData(newVal)
    },
    'practiced': function (newVal) {
      console.log(newVal)
      this.setData({
        thisPracticed:newVal
      })
    }
  },

  /**
   * Component methods
   */
  methods: {
    onChange(event) {
      this.setData({
        radio: event.detail,
        changeRadioflg:true,
      });
      this.triggerEvent('checkAnwser', { 
        changeRadioflg: true,
        radio: event.detail,
      });
    },
    initData(test) {
      if (JSON.stringify(test) !== '{}') {
        this.getMySingleTest(test)
      }
      this.setData({
        radio: '',
        changeRadioflg: false,
      })
    },
    getMySingleTest (test) {
      let _this = this
      let prams = {
        userId: wx.getStorageSync('user').id,
        testId: test.id,
      }
      getUserSingleTest(prams, function (data) {
        if (data.length > 0) {
          _this.setData({
            radio: data[0].answer,
            practiced: true
          });
        }
      })
    },
  }
})
