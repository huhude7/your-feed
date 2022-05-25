// pages/my/my.js
var userInfo = {}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName:"点击获取头像和呢称",
    pointerEvents:"auto",
    avatarUrl:""
  },
  handleContact (e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
},
  tapAddress(){
    wx.navigateTo({
      url: '/pages/my_address/my_address',
    })
  },
  tapAllOrder(){
    if(this.data.avatarUrl != "") {
      wx.navigateTo({
        url: '/pages/my_order/my_order',
      })
    }else {
      wx.showToast({
        title: '登录后操作',
        icon:"error"
      }).then(
        this.getUserData()
      )
    }
  },
  logOut(){
    wx.getStorage({
      key:"userInfo"
    }).then(() => {
      wx.showModal({
        title:"确认退出登录吗？",
      }).then((res)=> {
        if(res.confirm == true) {
          wx.removeStorage({
            key: 'userInfo',
          })
          this.setData({
            nickName:"点击获取头像和呢称",
            avatarUrl:"",
            pointerEvents:"auto"
          })
          wx.showToast({
            title: 'login out successful',
          })
        }
      })
      
    }).catch(res => {
      console.log(res);
    })
  },
  getPageData(){
    wx.getStorage({
      key:"userInfo"
    }).then(res => {
      this.setData({
      nickName:res.data.nickName,
      avatarUrl:res.data.avatarUrl,
      pointerEvents:"none"
    })
    }).catch(res => {
      console.log(res);
    })
  },
  getUserData(){
    wx.getUserProfile({
      desc:"获取您的头像和昵称"
    }).then(res=>{
      userInfo = res.userInfo
      wx.cloud.callFunction({
        name:"testDemo"
      }).then(res => {
        userInfo.openid = res.result.openid
        wx.setStorageSync('userInfo',userInfo)
        this.addUser(userInfo)
      })
      this.setData({
        nickName:userInfo.nickName,
        avatarUrl:userInfo.avatarUrl,
        pointerEvents:"none"
      })
    })
  },
  addUser(userInfo){
    wx.cloud.callFunction({
      name:"addUser",
      data:userInfo
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
})