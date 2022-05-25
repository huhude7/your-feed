import { storeBindingsBehavior } from "mobx-miniprogram-bindings"
import { store } from "../store/store"

Component({
  options :{
    styleIsolation: 'shared'
  },
  behaviors:[storeBindingsBehavior],
  storeBindings :{
    store,
    fields :{
      active :"activeTabBarIndex"
    },
    actions:{
      updateActiveTabBarIndex:"updateActiveTabBarIndex"
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      {
        "pagePath": "/pages/index/index",
        "text": "index",
        "iconPath": "cloud://cloud1-6gno2d8m557ae1a5.636c-cloud1-6gno2d8m557ae1a5-1310809433/tabbar-icon/home.png",
        "selectedIconPath": "cloud://cloud1-6gno2d8m557ae1a5.636c-cloud1-6gno2d8m557ae1a5-1310809433/tabbar-icon/home-active.png"
      },
      {
        "pagePath": "/pages/cate/cate",
        "text": "cate",
        "iconPath": "cloud://cloud1-6gno2d8m557ae1a5.636c-cloud1-6gno2d8m557ae1a5-1310809433/tabbar-icon/cate.png",
        "selectedIconPath": "cloud://cloud1-6gno2d8m557ae1a5.636c-cloud1-6gno2d8m557ae1a5-1310809433/tabbar-icon/cate-active.png"

      },
      {
        "pagePath": "/pages/cart/cart",
        "text": "cart",
        "iconPath": "cloud://cloud1-6gno2d8m557ae1a5.636c-cloud1-6gno2d8m557ae1a5-1310809433/tabbar-icon/cart.png",
        "selectedIconPath": "cloud://cloud1-6gno2d8m557ae1a5.636c-cloud1-6gno2d8m557ae1a5-1310809433/tabbar-icon/cart-active.png"
      },
      {
        "pagePath": "/pages/my/my",
        "text": "my",
        "iconPath": "cloud://cloud1-6gno2d8m557ae1a5.636c-cloud1-6gno2d8m557ae1a5-1310809433/tabbar-icon/my.png",
        "selectedIconPath": "cloud://cloud1-6gno2d8m557ae1a5.636c-cloud1-6gno2d8m557ae1a5-1310809433/tabbar-icon/my-active.png"
      }
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      this.updateActiveTabBarIndex(event.detail)
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    },
  }
})
