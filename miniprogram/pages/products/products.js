// pages/products/products.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageData:{},
    currentSwiper:1,
    currentPic:0,
    hideModal:true, //模态框的状态  true-隐藏  false-显示
    animationData:{},//
  },
  // 显示遮罩层
  showModal: function () {
    var that=this;
    that.setData({
      hideModal:false
    })
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation 
    setTimeout(function(){
      that.fadeIn();//调用显示动画
    },200)   
  },
  
  // 隐藏遮罩层
  hideModal: function () {
    var that=this; 
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function(){
      that.setData({
        hideModal:true
      })      
    },720)//先执行下滑动画，再隐藏模块
    
  },
  
  //动画集
  fadeIn:function(){
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()
      //动画实例的export方法导出动画数据传递给组件的animation属性
    })    
  },
  fadeDown:function(){
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),  
    })
  }, 
  submitOrder(){
    var orderData = []
    const {pageData} = this.data
    pageData.amount = 1
    orderData.push(pageData)
    orderData = JSON.stringify(orderData)
    wx.getStorage({
      key:"userInfo"
    }).then(res=>{
      wx.navigateTo({
        url: '/pages/order/order?data='+orderData,
      })
    }).catch(() => {
      wx.showModal({
        cancelColor: 'cancelColor',
        title:"您尚未登录，请登录后操作",
        confirmText:"去登录",
        showCancel:false
      }).then(()=> {
        wx.switchTab({
          url: '/pages/my/my',
        })
      })
    })
  },
  addToCart(){
    var product = this.data.pageData
    product.amount =  1
   wx.getStorage({
     key:"userInfo"
   }).then(res=> {
     wx.showToast({
       title: '添加中...',
       mask:true,
       icon:"loading"
     })
    wx.cloud.callFunction({
      name:"addToCart",
      data:{
        openid:res.data.openid,
        cartItem:product
      }
    }).then(res => {
      console.log(res);
      wx.showToast({
        title: '已加入购物车',
      })
    })
   }).catch(()=> {
     wx.showModal({
      cancelColor: 'cancelColor',
      title:"您尚未登录，请登录后操作",
      confirmText:"去登录",
      showCancel:false
     }).then(()=> {
      wx.switchTab({
      url: '/pages/my/my',
    })
    })
  })
  },
  swiperChange(e){
    this.setData({
      currentSwiper:e.detail.current+1
    })
  },
  exchange(e){
    this.setData({
      currentPic:e.currentTarget.dataset.id
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
  tapToSee(e){
    wx.previewImage({
      urls: e.currentTarget.dataset.picurl
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