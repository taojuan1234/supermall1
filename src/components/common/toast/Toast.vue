<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
name:'Toast',
data(){
  return{
    isShow:false,
    message:''
  }
},
methods:{
  show(message,duration=200){
    this.message=message
    this.isShow=true
    setTimeout(() => {
      this.message=''
      this.isShow=false
    }, duration);

  }
}
}
</script>

<style scoped>
.toast{
  position:fixed;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  padding:8px 10px;
  color:#fff;
  background-color:rgba(0,0,0,.6);
  z-index:10;
}

</style>