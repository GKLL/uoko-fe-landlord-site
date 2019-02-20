/*
 * @Description: 全局信息配置文件
 * @Author: chenmo
 * @Date: 2019-02-15 10:52:27
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 13:47:36
 */


 /* 定义首页星空图片 */
export const START_HOME_IMG: any[] = [
  {
    alt: '星空',
    src: require('../assets/images/starhome01.png')
  },
  {
    alt: '星空家盟',
    src: require('../assets/images/starhome02.png')
  },
  {
    alt: '星空有客',
    src: require('../assets/images/starhome03.png')
  },
  {
    alt: '星空业主',
    src: require('../assets/images/starhome04.png')
  }
];

 /* 定义路由 */
export const componentsList: any[] = [
  {
    path: 'home',
    title: '星空业主服务号'
  },
  {
    path: 'bind',
    title: '登录'
  },
  {
    path: 'entrust',
    title: '在线委托'
  },
  {
    path: 'houseList',
    title: '我的房源列表'
  },
  {
    path: 'myHouse',
    title: '房源详情'
  },
  {
    path: 'serviceOrder',
    title: '服务订单'
  },
  {
    path: 'serviceDetile',
    title: '订单详情'
  },
  {
    path: 'purchase',
    title: '购买服务'
  },
  {
    path: 'serviceInfo',
    title: '服务包详情'
  },
  {
    path: 'serviceType',
    title: '选择服务类型'
  },
  {
    path: 'startService',
    title: '发起服务'
  }
];

/* 定义托管类型 */
export const RENT_TYPE: any = {
  0: '未知',
  1: '星空家盟直租',
  2: '优客逸家加盟',
  3: '优客逸家自营',
  4: '星空家盟加盟'
};

/* 定义租赁类型 */
export const RENT_WAY: any = {
  1: '整租',
  2: '合租',
};

/* 定义房间朝向 */
export const TOWARDNAME: any = {
  1: '东',
  2: '南',
  3: '西',
  4: '北',
  5: '东南',
  6: '西南',
  7: '东北',
  8: '西北',
  9: '南北',
  10: '东西'
};

/* 定义房间配置 */
export const HOUSECONFIG: any = {
  1: '床',
  2: '衣柜',
  3: '书桌',
  4: '椅子',
  5: '空调',
  6: '电视',
  7: '阳台',
  8: '独卫'
};

/* 定义租赁信息服务商title */
export const ZCFU: any = {
  ZC: '资产管家',
  FW: '服务商'
};

/* 定义房间状态 */
export const RENT_STATUS: any = {
  1: '待租中',
  2: '已出租',
  3: '已预订'
};

/* 定义服务订单状态 */
export const STATUS_NAME: string[] = ['', '待付款', '待服务' , '服务中', ' 待验收', '待评价', '已评价', '已关闭', ' 待处理', '验收不通过'];
