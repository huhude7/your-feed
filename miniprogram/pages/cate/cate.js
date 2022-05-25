var cateId = []
var selectedItemId = ""
var pageData=[]
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    windowHeight:"",
    pageDataDetail:[],
    skeletonDisplay:"block",
    toView:"",
    rightScrollTop:"",
    rightTopArray:[]
  },
  getWindowHeight(){
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          windowHeight:result.windowHeight
        })
      },
    })
  },
  searchBlur (){
    this.setData({
      value:""
    })
  },
  tapSearch(e) {
    var input = e.detail
    wx.navigateTo({
      url: '/pages/search_result/search_result?input='+input,
    })
  },
  tapItem(res){
    var id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/products/products'+'?id='+id,
    })
  },
  test(cateId,i){
    wx.cloud.callFunction({
      name:"getDataThroughCateId",
      data:{
        cateId
      },
    }).then(result=>{
        var cateList = "pageDataDetail["+i+"].cateList"
        this.setData({
          [cateList]:result.result.data
        })
    })
  },
  getPageData(){
    wx.cloud.callFunction({
      name:"getCateName"
    }).then(res=> {
      var that = this
      for(var i = 0; i<res.result.data.length; i++) {
        var cateId = "pageDataDetail["+i+"].cateId"
        var cateName = "pageDataDetail["+i+"].cateName"
        var id = "pageDataDetail["+i+"].id"
        that.setData({
          [cateId]:res.result.data[i]._id,
          [cateName] :res.result.data[i].name,
          [id] : "id"+ Math.floor(Math.random()*1000)
        })
      this.test(res.result.data[i]._id,i)
      }
    })
  },
  tapCate(e){
    var index = e.currentTarget.dataset.index
    if (index != this.data.currentIndex) {
      this.setData({
        currentIndex:index,
        toView:this.data.pageDataDetail[index].id
      })
    }
  },
  rightScroll(e){
    this.setData({
      rightScrollTop:e.detail.scrollTop
    })
    var lenght = this.data.rightTopArray.length
    for(var i = 0;i<lenght;i++) {
      var scrollTop = this.data.rightScrollTop;
      var topOne = this.data.rightTopArray[0];
      var top = this.data.rightTopArray[i]
      if(i<lenght-1) {
        var topNext = this.data.rightTopArray[i+1];
        if(scrollTop>= top-topOne && scrollTop<topNext-topOne) {
          if(this.data.currentIndex != i) {
            this.setData({
              currentIndex:i
            })
          }
        }
      }
      if(i== lenght -1) {
        if(scrollTop>= top-topOne) {
          if(this.data.currentIndex != i) {
            this.setData({
              currentIndex:i
            })
          }
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getPageData()
   this.getWindowHeight()
   this.setData({
     skeletonDisplay:"none"
   })
   this.data.pageDataDetail.forEach((v)=> {
    wx.createSelectorQuery()
    .select('#'+v.id)
    .boundingClientRect((rect)=> {
      if(rect) {
        var top = Number(rect.top)
        this.data.rightTopArray.push(top)
      }
    })
    .exec()
   })
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