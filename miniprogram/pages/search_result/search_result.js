// pages/search_result/search_result.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchData:[],
    tipsDisplay: "none",
    tips2Display:"block",
    tips3Display:"none",
    searchDatabaseData:[],
    inputContent:""
  },
  tapItem(res){
    var id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/products/products'+'?id='+id,
    })
  },
  getSearchData(brandsName_id){
    wx.cloud.callFunction({
      name:"getDataAccordingBrandName",
      data:{
        brandsName:brandsName_id
      }
    }).then(res=> {
      this.setData({
        searchData:res.result.data
      })
      if(this.data.searchData.length==0) {
        this.setData({
          tipsDisplay:"block"
        })
      }
      if(this.data.searchDatabaseData.length==0) {
        this.setData({
          tips2Display:"none"
        })
      }
    }).catch(res=> {
    })
  },
  getSearchDatabaseData (input){
    wx.cloud.callFunction({
      name:"searchItems",
      data:{
        input:input
      }
    }).then(res => {
      this.setData({
        searchDatabaseData:res.result.data,
         inputContent:input
      })
      if(this.data.searchDatabaseData.length==0) {
        this.setData({
          tips3Display:"block"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSearchData(options.brandsName_id)
    this.getSearchDatabaseData(options.input)
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