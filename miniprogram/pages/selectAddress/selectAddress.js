// pages/selectAddress/selectAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageData:[],
    hasData:true
  },
  getPageData(){
    wx.getStorage({
      key:"userInfo"
    }).then(res=> {
      var openid = res.data.openid
      wx.cloud.callFunction({
        name:"getCartData",
        data:{
          openid:openid
        }
      }).then(res=> {
        var pageData = res.result.data[0].address
        if(pageData.length != 0) {
          this.setData({
            pageData
          })
        }else {
          this.setData({
            hasData:false
          })
        }
        
      })
    })
    
  },
  changeAddress (e){
    var pages = getCurrentPages();
    var prevPage =  pages[pages.length -2]
    prevPage.setData({
      addressData : e.currentTarget.dataset.address
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  addAddress(){
    wx.navigateTo({
      url: '/pages/my_address/my_address',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getPageData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.setData({
      hasData:true
    })
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