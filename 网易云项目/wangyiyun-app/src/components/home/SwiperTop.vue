<template>
  <div class="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import {getBanner} from "@/request/api/home.js";
import { reactive, onMounted } from "vue";
export default {
  name: "",
  setup() {
    const state = reactive({
      images: [
        "https://unpkg.com/@vant/assets/apple-1.jpeg",
        "https://unpkg.com/@vant/assets/apple-2.jpeg",
      ],
    });
    onMounted(async () => {
      /*         axios.get('http://localhost:3000/banner?type=2').then((res)=>{
           state.images=res.data.banners
        }) */
      let res = await getBanner();
      state.images = res.data.banners;
    });
    return { state };
  },
};
</script>
<style lang="less">
.swiperTop {
  .van-swipe {
    width: 100%;
    margin-top: .2rem;
    .van-swipe-item {
      padding:0 0.2rem;
      img {
        height:3rem;
        width: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>
