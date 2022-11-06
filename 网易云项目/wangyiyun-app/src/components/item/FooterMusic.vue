<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="name">
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-bofang2"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
      <audio
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
      ></audio>
      <van-popup
        :show="detailShow"
        position="right"
        :style="{ height: '100%', width: '100%' }"
      >
        <MusicDetail
          :musicList="playList[playListIndex]"
          :play="play"
          :isbtnShow="isbtnShow"
          :addDuration="addDuration"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue";
export default {
  components: { MusicDetail },
  data() {
    return {
      interVal: 0,
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  mounted() {
    console.log(this.$refs);
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.updateTime()
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
  methods: {
    ...mapMutations([
      "updateIsbtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
    play: function () {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime(); //播放就调用函数，定时器
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal); //暂停清除定时器
      }
    },
    //获取播放器每一秒更新的事件
    updateTime: function () {
     this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000); 
    },
    //添加总时长
    addDuration: function () {
      this.updateDuration(this.$refs.audio.duration);
    },
  },
  watch: {
    playListIndex: function () {
      //监听下标如果发生改变，就自动播放音乐
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updateIsbtnShow(false);
      }
    },
    playList: function () {
      if (this.isbtnShow) {
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    },
  },
};
</script>
<style scoped lang="less">
.footerMusic {
  background-color: white;
  height: 1.4rem;
  width: 100%;
  border-top: 0.02rem solid #999;
  padding: 0 15px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .footerLeft {
    height: 100%;
    width: 70%;
    display: flex;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .name {
      padding-left: 0.4rem;
      p {
        font-weight: 500;
      }
    }
  }
  .footerRight {
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>
