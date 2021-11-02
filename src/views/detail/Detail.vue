<template>
  <div id="detail">
    <detail-tab-bar
      @titlClick="titlClick"
      ref="nav"
    ></detail-tab-bar>

    <scroll
      class="content"
      :probeType="3"
      :pullUpLoad="true"
      ref="scroll"
      @scroll="contentScroll"
    >
      <detail-swiper :banners="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-good-info
        :detailInfo="detailInfo"
        @detailImageLoad="detailImageLoad"
      ></detail-good-info>
      <detail-param-info
        :paramInfo="paramInfo"
        ref="param"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list
        :goods="recommends"
        ref="recommen"
      ></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top
      v-show="isShowBack"
      @click.native="backTop"
    ></back-top>
  </div>
</template>

<script>
import DetailTabBar from './childComps/DetailTabBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodInfo from './childComps/DetailGoodInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import { getDetail, Goods, Params, getRecommend } from 'network/detail'
import { itemListenerMixin } from 'common/mixin'
import { debounce } from 'common/until'

import {mapActions} from 'vuex'
export default {
  name: 'Detail',
  components: {
    DetailTabBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBack: false,
    }
  },
  created() {
    this.iid = this.$route.params.iid
    //获取商品基本信息
    getDetail(this.iid).then(res => {
      const data = res.result
      console.log(res)
      //获取顶部的banners
      this.topImages = data.itemInfo.topImages
      //获取商品详情
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)
      //获取店铺详情
      this.shop = data.shopInfo
      //获取商家详情图片
      this.detailInfo = data.detailInfo
      //获取商品参数
      this.paramInfo = new Params(data.itemParams.info, data.itemParams.rule)
      //获取用户评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0]
      }


      /**
       * 1.点击标题，滚动到对应的主题
       * 在created中无法获取到元素
       */
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommen.$el.offsetTop)
      // console.log(this.themeTopYs)
    })
    //请求推荐数据
    getRecommend().then(res => {
      console.log(res)
      this.recommends = res.data.list
    })
    //初始化距离
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommen.$el.offsetTop)
      console.log(this.themeTopYs)
    }, 100)

  },
  mounted() {

    /**
 * 2.点击标题，滚动到对应的主题
 * 在mounted中也无法获取到元素，因为挂载时数据还没有获取到
 */

    // this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommen.$el.offsetTop)
    //   console.log(this.themeTopYs)
  }
  ,
  methods: {
    ...mapActions(['addCart']),
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })
      this.addCart(product).then(res=>{
        this.$toast.show(res,2000)
      })
    },
    detailImageLoad() {
      this.newRefresh()//图片加载完后刷新页面
      //图片加载完后就算各导航距离
      this.getThemeTopY()
    },
    //详情页导航栏
    titlClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    //导航栏区字体变色
    contentScroll(position) {
      this.isShowBack = (-position.y) > 1000
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        if ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY > this.themeTopYs[i])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    //返回顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 9;
}
.content {
  background-color: #fff;
  height: calc(100% - 44px);
}
</style>