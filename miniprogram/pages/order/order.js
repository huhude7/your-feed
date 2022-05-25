var openid =''
Page({
  data: {
    addressData:[],
    orderData:[],
    totalPrice:0
  },
  // 获取地址数据
  getAddressData() {
    wx.getStorage({
      key:"userInfo"
    }).then(res=> {
      openid = res.data.openid
      wx.cloud.callFunction({
        name:"getCartData",
        data:{
          openid:openid
        }
      }).then(res=> {
        this.setData({
          addressData:res.result.data[0].address[0]
        })
      })
    })
  },
  // 获取订单数据
  getOrderData(options) {
    let orderData = options.data;
    orderData = JSON.parse(orderData)
    this.setData({
      orderData
    })
  },
  submitOrder () {
    var that = this
    
    var orderData = {}
    orderData.orderData = this.data.orderData
    orderData.addressData = this.data.addressData
    orderData.time = new Date()
    orderData.state = "已支付"
    orderData.totalPrice = this.data.totalPrice
    wx.cloud.callFunction({
      name:"addOrderItem",
      data:{
        openid,
        orderData,
      }
    }).then(res => {
      wx.showLoading({
        title:"正在支付……"
      })
      setTimeout(function () {
        wx.hideLoading()
        wx.showToast({
        title: '已支付'+that.data.totalPrice+'元',
        })
        setTimeout(()=> {
          wx.navigateBack({
            delta:1
          })
        },1200)
      }, 1500)
    })
    
    
  },
  getTotalPrice(){
    var totalPrice = 0
    const {orderData} = this.data
    orderData.map(item => {
      totalPrice += item.amount * item.price
    })
    this.setData({
      totalPrice
    })
  },
  getMoreAddress(){
    wx.navigateTo({
      url: '/pages/selectAddress/selectAddress',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAddressData()
    this.getOrderData(options)
    this.getTotalPrice()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})