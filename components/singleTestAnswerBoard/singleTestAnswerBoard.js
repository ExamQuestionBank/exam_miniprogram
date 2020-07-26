// components/singleTestAnswerBoard/singleTestAnswerBoard.js
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
  },

  /**
   * Component methods
   */
  methods: {
    onChange(event) {
      this.setData({
        radio: event.detail,
      });
    },
  }
})
