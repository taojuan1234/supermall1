<template>
  <div id="cart-list">
    <cart-list-item
      v-for="(item,i) in cartls"
      :key="i"
      :itemInfo="item"
    ></cart-list-item>
  </div>
</template>

<script>


import CartListItem from './CartListItem.vue'

// import { mapGetters } from 'vuex'
export default {
  name: 'CartList',
  components: {
    CartListItem
  },
  props: {
    cartls: {
      type: Array,
      default() {
        return []
      }
    }
  },
  // computed: {
  //   ...mapGetters(['cartList'])
  // },
  // activated() {
  //   this.$refs.scroll.refresh()
  // }
}
</script>

<style scoped>

</style>