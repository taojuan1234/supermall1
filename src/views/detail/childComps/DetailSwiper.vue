<template>

  <swiper class="swiper-detail">
    <swiper-item
      v-for="(item,index) in banners"
      :key="index"
    >
      <img :src="item">
    </swiper-item>
  </swiper>

</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  components: {
    Swiper, SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.swiper-detail {
  height: 300px;
  overflow: hidden;
}
</style>