<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="130"
        :show-indicators="false"
        class="mySwipper"
      >
        <van-swipe-item
          v-for="(item, index) in state.musicList"
          :key="item.id"
          class="itemSwiper"
        >
             <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
          <img :src="item.picUrl" alt="" />
          <span class="playCount">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
            {{changeCount(item.playCount) }}
          </span>
          <span class="name">{{ item.name }}</span>
             </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { getMusicList } from "@/request/api/home.js";
import {onMounted,reactive} from "vue"
export default {
  name: "",
/*   data() {
    return {
      musicList: [],
    };
  },
  mounted() {
    this.getGeDan();
  },
  methods: {
    //获取发现好歌单
    async getGeDan() {
      let res = await getMusicList();
      this.musicList = res.data.result;
    },
    //播放量转换
    changeCount:function(num){
        if(num>=100000000){
            return (num/100000000).toFixed(1)+"亿"
        }else if(num>=10000){
            return (num/10000).toFixed(1)+'万'
        }
    }
  }, */
  setup(){
    let state = reactive({
        musicList: [],
    })
     function changeCount(num){
        if(num>=100000000){
            return (num/100000000).toFixed(1)+"亿"
        }else if(num>=10000){
            return (num/10000).toFixed(1)+'万'
        }
    }
    onMounted( async()=> {
      let res = await getMusicList();
      console.log(res);
      state.musicList = res.data.result;
    })
    return {state,changeCount}
  }
};
</script>
<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      border-radius: 0.4rem;
      line-height: 0.6rem;
      padding: 0 0.3rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 3.6rem;
    .itemSwiper {
      padding-right: 0.2rem;
      height: 4rem;
      position: relative;
      img {
        width: 100%;
        height: 2.6rem;
        border-radius: 0.2rem;
      }
      .playCount {
        position: absolute;
        z-index: 100;
        right: 0.3rem;
        top: 0.06rem;
        color: white;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          fill: #fff
        }
        .name {
          bottom: 0px;
        }
      }
    }
  }
}
</style>
