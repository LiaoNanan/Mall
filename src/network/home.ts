import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type:string, page:number) {
  return request({
    url: '/home/data',
    params:{
      type,
      page
    }
  })
}
