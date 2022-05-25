var cartDetail  = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    selectAllChecked:false,
    pageData:[],
    logined:false,
    isEmpty :true,
    totalPrice:0,
    // 导航栏高度
    nbh:0
  },
  tapDel(e){  
    wx.getStorage({
      key:"userInfo"
    }).then(res => {
      var openid =res.data.openid
      var delItem = e.currentTarget.dataset.item
      delete delItem.checked
      wx.cloud.callFunction({
        name:"delCartItem2",
        data:{
          openid:openid,
          delItem
        }
      }).then(res => {
        wx.showToast({
          title: '删除成功',
        })
        this.getPageData()
        if (this.data.pageData.length ==1) {
          this.setData({
            pageData:[],
            isEmpty:true
          })
        }
      })
    })
  },
  selectItem(e){
    this.setData({
      selectedItem:e.detail.value
    })
    console.log(this.data.selectedItem);
  },
  tapCartItem (e){
    let {_id} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/products/products?id='+_id,
    })
  },
  tapToIndex(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  cntNumChange(e){
    this.setData({
      value:e.detail
    })
  },
   // 全选
   selectAllChange(){
    const {selectAllChecked , pageData} = this.data
    pageData.map(item => {
      if (item.amount > 0) {
      item.checked = !selectAllChecked
    }
    })
    this.setData({
      selectAllChecked:!selectAllChecked,
      pageData
    })
    this.countTotal()
  },
  // 选中数据
  setCheckedNum(e){
    const {checked ,amount ,_id} = e.detail
    const {pageData} = this.data
    pageData.map(item=> {
      if(item._id == _id) {
        item.checked =checked
        item.amount = amount
      }
    })
    pageData.map(item => {
      if(!item.checked) {
        this.setData({
          selectAllChecked:false
        })
      }
    })
    this.countTotal()
  },
  // 计算价格
  countTotal() {
    let {totalPrice ,pageData} = this.data
    totalPrice = 0
    pageData.forEach(item => {
      if (item.checked) {
        totalPrice += (item.amount * item.price)
      }
    })
    this.setData({
      totalPrice : totalPrice*100
    })
  },
  // 获取购物车数据
  getPageData(){
    wx.getStorage({
      key:"userInfo"
    })
    .then(res=> {
      this.setData({
        logined:true
      })
      wx.cloud.callFunction({
        name:"getCartData",
        data:{
          openid:res.data.openid
        }
      })
      .then(res=> {
        var data = res.result.data[0].cart.reverse()
        if (data.length != 0) {
          data.map(item => {
            item.checked = false
          })
          this.setData({
            pageData:data,
            isEmpty:false
          })
        }
      })
    }).catch(()=> {
      this.setData({
        logined:false
      })
    })
  },
  // 提交订单
  submitOrder(){
    var {pageData} = this.data
    var selectedOrder = []
    var flag = false
    for (var i= 0;i<pageData.length;i++) {
      if(pageData[i].checked) {
        flag = true
        selectedOrder.push(pageData[i])
      }
    }
    if(flag) {
      wx.navigateTo({
        url: '/pages/order/order?data='+JSON.stringify(selectedOrder),
      })
    }else {
      wx.showToast({
        title: '请至少选择一件商品',
        icon:"none"
      })
    }
  },
  // 获取导航栏高度
  getExactHeight (){
  let systemInfo = wx.getSystemInfoSync();
 
  //状态栏高度
  let statusBarHeight = Number(systemInfo.statusBarHeight);
  
  let menu = wx.getMenuButtonBoundingClientRect()
  
  //导航栏高度
  let navBarHeight = menu.height + (menu.top - statusBarHeight) * 2
  
  //状态栏加导航栏高度
  let navStatusBarHeight = statusBarHeight + menu.height + (menu.top - statusBarHeight) * 2
  console.log('状态栏高度',statusBarHeight)
  console.log('导航栏高度',navBarHeight)
  console.log('状态栏加导航栏高度',navStatusBarHeight)
  this.setData({
    nbh:statusBarHeight
  })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPageData()
    this.setData({
      selectAllChecked:false,
      totalPrice :0
    })
    this.getExactHeight()
  },
  onLoad:function(){
    this.getPageData()
  },
})