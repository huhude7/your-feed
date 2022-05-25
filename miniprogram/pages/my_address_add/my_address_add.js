var tempAddress={}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    location:"",
    address:{},
    pageData:{},
    delDisplay:"none",
    openid:''
  },
  inputName(e){
    tempAddress.name = e.detail.value
  },
  inputTelephoneNumber(e){
    tempAddress.telephoneNumber = e.detail.value
  },
  inputLocationDetail(e){
    tempAddress.locationDetail = e.detail.value
  },
  defaultChange(e){
    tempAddress.defaultAddress = e.detail.value
  },
  pickerChange(e){
    tempAddress.location = e.detail.value.join(",")
    this.setData({
      location:e.detail.value.join(",")
    })
  },
  // 删除收货地址
  tapDel(){
    wx.showToast({
      title: '删除中……',
      icon:"loading"
    })
    wx.cloud.callFunction({
      name:"delAddress",
      data:{
        openid:this.data.openid,
        delItem:this.data.pageData
      }
    }).then(res => {
      wx.navigateBack({
        delta: 1,
      })
    })
  },
  tapGPS(){
    wx.authorize({
      scope: 'scope.userLocation',
    }).then(res=> {
      wx.getLocation({
        type:"gcj02"
      }).then(res => {
        wx.chooseLocation({
        }).then(res => {
          tempAddress.location = res.address
          this.setData({
            location:res.address
          })
        })
      })
    })
  },
  saveAddress(){
    wx.getStorage({
      key:"userInfo"
    }).then(res => {
      this.setData({
        openid:res.data.openid
      })
      if (tempAddress.location != null && tempAddress.telephoneNumber != null && tempAddress.name != null) {
      wx.cloud.callFunction({
        name:"addAddress",
        data:{
          openid:res.data.openid,
          address:tempAddress
        }
      }).then(res=> {
        wx.navigateBack({
          delta: 1,
        })
        wx.showToast({
          title: '保存成功',
        })
      })
    }else {
      wx.showToast({
        title: '完整填写内容',
        icon:"error"
      })
    }
    })
    
  },
  getUserInfo(){
    wx.getStorage({
      key:"userInfo"
    }).then(res=> {
      this.setData({
        openid:res.data.openid
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageData:JSON.parse(options.data),
    })
    if (this.data.pageData) {
      this.setData({
        delDisplay:"block"
      })
    }
    this.getUserInfo()
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
    tempAddress :{}
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