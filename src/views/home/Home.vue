<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabShow"
      class="tab-control-top"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImgLoad="swiperImgLoad"
      />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top
      @click.native="backClick"
      v-show="isBackTop"
    />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'


import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'components/common/until.js'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      isBackTop: false,
      tabOffsetTop: 0,//导航（流行..）距离顶部的位置
      isTabShow: false,//备用的导航是否显示
      saveY: 0,//缓存页面记录的Y值
    }

  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  mounted() {
    //监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  //当keep-alive被激活时使用的生命周期
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()//刷新
  },
  //当keep-alive被失效时使用的生命周期
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  }
  ,
  methods: {
    /**
     * 
     * 方法调用
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      //让备用导航与导航点击的标题一致
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      this.isBackTop = (-position.y) > 1000
      this.isTabShow = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    //轮播图图片加载
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log(this.tabOffsetTop)
    },

    /***
     * 
     * 网络请求
     */
    async getHomeMultidata() {
      const { data: res } = await getHomeMultidata()
      console.log(res)
      this.banners = res.banner.list
      this.recommends = res.recommend.list
    },
    //商品列表
    async getHomeGoods(type) {
      const page = this.goods[type].page + 1
      const { data: res } = await getHomeGoods(type, page)

      this.goods[type].list.push(...res.list)
      this.goods[type].page += 1

      //商品上拉后告诉better-scroll数据加载完毕，与pillUpLoad搭配使用
      this.$refs.scroll.finishPullUp()
      console.log(res)
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control-top {
  position: relative;
  top: 44px;
  z-index: 9;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>