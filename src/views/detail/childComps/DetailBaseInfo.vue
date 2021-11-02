<template>
  <div v-if="Object.keys(goods).length !== 0">
    <div class="title">{{goods.title}}</div>
    <div class="price-wrap">
      <div class="new-price">{{goods.newPrice}}</div>
      <div class="old-price">{{goods.oldPrice}}</div>
      <div
        class="discount-desc"
        v-if="goods.discount"
      >{{goods.discount}}</div>
    </div>
    <div class="other-info">
      <div>{{goods.columns[0]}}</div>
      <div>{{goods.columns[1]}}</div>
      <div>{{goods.services[goods.services.length-1].name}}</div>
    </div>
    <div class="serves-wrap">
      <div
        v-for="(item,index) in goods.services"
        :key="index"
      >
        <img
          :src="goods.services[index].icon"
          alt=""
        >
        {{goods.services[index].name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.title {
  margin: 15px 0;
  padding: 0 4px;
  font-size: 14px;
  line-height: 20px;
}
.price-wrap {
  display: flex;
  padding: 0 4px 10px;
  position: relative;
}
.new-price {
  font-size: 20px;
  color: var(--color-high-text);
}
.old-price {
  color: #999;
  font-size: 12px;
  margin: 0 4px;
  padding-top: 6px;
  text-decoration: line-through;
}
.discount-desc {
  /* position: absolute;
  top: -10px;
  left: calc(100% - 300px); */
  color: #fff;
  font-size: 12px;
  border-radius: 100px;
  padding: 5px;
  text-align: center;

  background-color: var(--color-high-text);
}
.other-info {
  display: flex;
  color: #999;
  font-size: 12px;
  padding: 10px 4px;
  border-bottom: 1px solid #ededed;
  border-top: 1px solid #ededed;
}
.other-info div {
  flex: 1;
}
.serves-wrap {
  display: flex;
  font-size: 12px;
  color: #333;
  padding: 10px 7px;
  justify-content: space-between;
  border-bottom: 4px solid #ededed;
}
.serves-wrap img {
  width: 12px;
  height: 12px;
  vertical-align: middle;
}
</style>
