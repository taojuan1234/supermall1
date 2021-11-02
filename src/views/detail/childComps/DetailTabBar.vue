<template>
  <div id="detailTabBar">
    <nav-bar class="nav-bar">
      <div
        slot="left"
        class="detail-back"
        @click="GoBack"
      >
        <img
          src="~assets/img/common/back.svg"
          alt=""
        >
      </div>
      <div
        slot="center"
        class="nav-center-content"
      >
        <div
          v-for="(item,index) in title"
          :key="index"
          class="nav-center-item"
          :class="{active:index===currentIndex}"
          @click="titleClick(index)"
        >
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailTabBar',
  components: {
    NavBar
  },
  data() {
    return {
      title: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titlClick',index)
    },
    GoBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.nav-bar{
  position: relative;
  z-index:9;
  background-color:#fff;
}
.nav-center-content {
  display: flex;
}
.nav-center-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.detail-back {
  margin-top: 8px;
}
</style>