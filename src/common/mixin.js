import {debounce} from './until'

export const itemListenerMixin={
  data(){
    return{
       itemImagListener:null,
       newRefresh:null
    }
  },
  mounted(){
    this.newRefresh=debounce(this.$refs.scroll.refresh,100)
    this.itemImagListener=()=>{
      this.newRefresh()
    }
    this.$bus.$on('itemImagLoad',this.itemImagListener)
  }
}