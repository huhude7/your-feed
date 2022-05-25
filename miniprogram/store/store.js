// 在这个js文件中，专门用来创建Store的实例
// 从mobx-miniprogram包中导入observable方法
import {action, observable} from "mobx-miniprogram"
// 将这个方法的返回值导出为store
export const store = observable({
// 其中可以定义一些用于共享的数据
  activeTabBarIndex:0,
  updateActiveTabBarIndex : action(function(index) {
    this.activeTabBarIndex = index
  })
})
