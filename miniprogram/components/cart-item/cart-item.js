Component({
  properties: {
    cartData:Object
  },
  options:{
    multipleSlots:true
  },
  data: {
  },
  methods: {
    // 改变每一项的选中状态
    itemCheckedChange(){
      const {cartData}  = this.data
      cartData.checked = !cartData.checked 
      this.setData({
        cartData
      })
      this.triggerEvent("setCheckedNum",{
        _id :cartData._id,
        checked:cartData.checked,
        amount:cartData.amount
      })
    },
    // 改变选中的数量
  changeAmount(e){
    const {cartData}  = this.data
    cartData.amount = e.detail
    this.setData({
      cartData
    })
    this.triggerEvent("setCheckedNum",{
      _id :cartData._id,
      checked:cartData.checked,
      amount:cartData.amount
    })
  },
  // 删除购物车的项目
  delCartItem (e){
    // let _id = e.currentTarget.dataset._id
    // this.triggerEvent("async",{
    //   delItem : e.currentTarget.dataset
    // })
    // wx.getStorage({
    //   key:"userInfo"
    // }).then(res => {
    //   var openid =res.data.openid
    //   wx.cloud.callFunction({
    //     name:"delCartItem",
    //     data:{
    //       openid,
    //       _id
    //     }
    //   }).then(res => {
    //     wx.showToast({
    //       title: '删除成功',
    //     })
    //   })
    // })
  },
  // tapCartItem (e){
  //   let {_id} = e.currentTarget.dataset
  //   wx.navigateTo({
  //     url: '/pages/products/products?id='+_id,
  //   })
  // }
  },
})
