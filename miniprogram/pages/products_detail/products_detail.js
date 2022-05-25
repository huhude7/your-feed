// pages/products_detail/products_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageData:{},
    storeIcon:"like-o",
    cartIcon:"cart-o"
  },

  tapStore(){
    this.setData({
      storeIcon:"like"
    })
    wx.showToast({
      title: 'added to favor',
    })
  },
  tapCart(){
    this.setData({
      cartIcon:"cart"
    })
    wx.showToast({
      title: 'added to cart',
    })
  },
  getProducts_detail(id){
    wx.cloud.callFunction({
      name :"getProducts_detail",
      data:{
        id:id
      }
    }).then(res => {
      this.setData({
        pageData:res.result.data
      })
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProducts_detail(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})