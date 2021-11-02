import {ADD_COUNTER,ADD_TO_CART} from './mutations-type'

export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked=true//加入购物车时默认为选中状态
    state.cartList.push(payload)
  }
}