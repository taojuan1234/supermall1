<template>
  <div id="shop-item">
    <!-- 选择图标 -->
    <div class="item-selector">
      <check-buttons
        :is-checked="itemInfo.checked"
        @click.native="checkClick"
      ></check-buttons>
    </div>

    <!-- 商品图片 -->
    <div class="item-img">
      <img
        :src="itemInfo.image"
        alt=""
      >
    </div>
    <!-- 商品信息 -->
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">￥ {{itemInfo.price}}</div>
        <div class="item-count">X{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButtons from 'components/content/checkButton/CheckButtons'
export default {
  name: 'CartListItem',
  components: {
    CheckButtons
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }

}
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-info {
  position: relative;
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  overflow: hidden;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
}
.item-price .item-count {
  flex: 1;
}
.info-bottom .item-price {
  color: orangered;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>