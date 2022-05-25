Page({
  /**
   * 页面的初始数据
   */
  data: {
    selindex :0,
    swiperData:[],
    scrollXData:[],
    moreData:[],
    brandsData:[],
    skeletonDisplay:"block"
  },
  
  tapSwiper(res){
    var id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/products/products'+'?id='+id,
    })
  },
  tapScroll(res){
    var id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/products/products'+'?id='+id,
    })
  },
  tapBrands(res){
    var selectedBrand= res.currentTarget.dataset.name;
    wx.cloud.callFunction({
      name:"getBrandsNameString",
      data:{
        brandsName:selectedBrand
      }
    }).then(res=>{
      var brandsName_id = res.result.data[0]._id
      wx.navigateTo({
        url: '/pages/search_result/search_result?brandsName_id='+brandsName_id,
      })
    })
    
  },
  tapMore(res){
    var id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/products/products'+'?id='+id,
    })
  },
  getBrandsData(){
    wx.cloud.callFunction({
      name:"getBrands"
    }).then(res=>{
      this.setData({
        brandsData:res.result.data
      })
    })
  },
  getScrollXData(){
    wx.cloud.callFunction({
      name:"getScrollXData",
    }).then(res=>{
      this.setData({
        scrollXData:res.result.data
      })
    })
  },
  getSwiperData(){
    wx.cloud.callFunction({
      name:"getSwiperData"
    }).then(res=>{
      this.setData({
        swiperData:res.result.data
      })
    })
  },
  getMoreData() {
    wx.cloud.callFunction({
      name:"getMoreData",
    }).then(res=>{
      this.setData({
        moreData:res.result.data.reverse()
      })
    })
  },
  onChange: function (e) {
    this.setData({
      selindex: e.detail.current
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getSwiperData()
    this.getScrollXData()
    this.getBrandsData()
    this.getMoreData(),
    this.setData({
      skeletonDisplay:"none"
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
})