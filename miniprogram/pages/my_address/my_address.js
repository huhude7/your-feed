Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageData:[],
  },
  tapAddAddress(){
    wx.navigateTo({
      url: '/pages/my_address_add/my_address_add',
    })
  },
  tapModify(e){
    var data =JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/my_address_add/my_address_add?data='+data,
    })
  },
  getPageData(){
    wx.getStorage({
      key:"userInfo"
    }).then(res=> {
      var openid = res.data.openid
      wx.cloud.callFunction({
        name:"getCartData",
        data:{
          openid
        }
      }).then(res=> {
        this.setData({
          pageData:res.result.data[0].address
        })
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData()
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
    this.getPageData()
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