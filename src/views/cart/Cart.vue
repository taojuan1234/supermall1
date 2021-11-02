<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll
      :probeType="3"
      :pullUpLoad="true"
      class="content"
      ref="scroll"
    >
      <cart-list :cartls="cartList"></cart-list>
    </scroll>
    <cart-botton-bar></cart-botton-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import Scroll from 'components/common/scroll/Scroll'

import CartList from './childComps/CartList.vue'
import CartBottonBar from './childComps/CartBottonBar.vue'

import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottonBar,
    Scroll
  },
  computed: {
    ...mapGetters(['cartLength', 'cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
#cart {
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: #fb7299;
  color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>