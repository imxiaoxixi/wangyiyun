<template>
    <div>
<ItemMusicTop :playlist="state.playlist"/>
   <ItemMusicList  :itemList="state.itemList"  
    :subscribedCount="state.playlist.subscribedCount"/>
   </div>
</template>
<script>
import {useRoute} from "vue-router";
import {getMusicItemList,getItemList} from "@/request/api/item.js";
import{onMounted,reactive} from "vue";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import ItemMusicList from "@/components/item/ItemMusicList.vue";
export default {
   name :'',
   setup(){
  let state=reactive({
    playlist:{}, //歌单的详情页数据
    itemList:[] //歌单的歌曲
}) 
onMounted(async ()=>{
    let id = useRoute().query.id
    let res = await getMusicItemList(id)
    state.playlist=res.data.playlist
     console.log(res);
     let result = await getItemList({id,limit:10,offset:0})
     console.log(result);
     state.itemList=result.data.songs
     sessionStorage.setItem('itemDetail',JSON.stringify(state))
})
    return {state}
   },
   //父传子组件
   components:{
    ItemMusicTop,
    ItemMusicList,
   }
}
</script>
<style scoped>
</style>
