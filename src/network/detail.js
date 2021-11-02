import {request} from './request'

export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

//推荐数据接口
export function getRecommend(){
  return request({
    url:'/recommend'
  })
}

//商品基本信息
export class Goods{
  constructor(itemInfo,columns,shopInfo){
    this.title=itemInfo.title//res.result.itemInfo.title 标题
    this.desc=itemInfo.desc//
    this.newPrice=itemInfo.price
    this.oldPrice=itemInfo.oldPrice
    this.discount=itemInfo.discountDesc//优惠价
    this.columns=columns//销售 收藏 发货
    this.services=shopInfo.services
    this.realPrice=itemInfo.lowNowPrice


    
  }
}

//商品参数
export class Params{
  constructor(info,rule){
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}