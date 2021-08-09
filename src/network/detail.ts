import {request} from "@/network/request";

export function getDetail(iid:string){
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}


export class Goods {
  // @ts-ignore
  constructor(itemInfo, columns, services) {
    // @ts-ignore
    this.title = itemInfo.title
    // @ts-ignore
    this.desc = itemInfo.desc
    // @ts-ignore
    this.newPrice = itemInfo.price
    // @ts-ignore
    this.oldPrice = itemInfo.oldPrice
    // @ts-ignore
    this.discount = itemInfo.discountDesc
    // @ts-ignore
    this.columns = columns
    // @ts-ignore
    this.services = services
    // @ts-ignore
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  // @ts-ignore
  constructor(shopInfo) {
    // @ts-ignore
    this.logo = shopInfo.shopLogo;
    // @ts-ignore
    this.name = shopInfo.name;
    // @ts-ignore
    this.fans = shopInfo.cFans;
    // @ts-ignore
    this.sells = shopInfo.cSells;
    // @ts-ignore
    this.score = shopInfo.score;
    // @ts-ignore
    this.goodsCount = shopInfo.cGoods;
  }
}

export class GoodsParam {
  // @ts-ignore
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    // @ts-ignore
    this.image = info.images ? info.images[0] : '';
    // @ts-ignore
    this.infos = info.set;
    // @ts-ignore
    this.sizes = rule.tables;
  }
}
