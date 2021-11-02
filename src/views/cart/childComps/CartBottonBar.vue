<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-buttons
        class="checked-button"
        :is-checked="isSelectAll"
        @click.native="checkAll"
      ></check-buttons>
      <span>全选</span>
    </div>
    <div class="totalPrice">合计:{{totalPrice}}</div>
    <div class="calculate">结算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButtons from 'components/content/checkButton/CheckButtons'

import { mapGetters } from 'vuex'
export default {
  name: 'CartBottonBar',
  components: {
    CheckButtons
  },
  computed: {
    ...mapGetters(['cartList']),
    //合计金额
    totalPrice() {
      return ('￥' + this.cartList.filter(item => item.checked).reduce((preValue, item) => { return preValue + item.price * item.count }, 0).toFixed(2))
    },
    //结算个数
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    //全选
   isSelectAll() {
    if(this.cartList.length === 0){
      return false
    }else{
      return !(this.cartList.find(item=>!item.checked))
    }
    },
  },
  methods:{
checkAll(){
  if(this.isSelectAll){
    return this.cartList.forEach(item=>item.checked=false)
  }else{
    return this.cartList.forEach(item=>item.checked=true)
  }
}
  }
}
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  display: flex;
  bottom: 49px;
  left: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  align-items: center;
  /* justify-content: space-between; */
  background-color: #eee;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
}
.check-content {
  display: flex;
  align-items: center;
  margin-right: 30px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.calculate {
  position: absolute;
  right: 0;
  width: 100px;
  text-align: center;
  background-color: coral;
}
</style>