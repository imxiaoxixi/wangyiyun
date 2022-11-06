<template>
  <div class="musicDetail">
    <img :src="musicList.al.picUrl" class="backimg" alt="" />
    <div class="detailtop">
      <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true" @click="backHome">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div>
          <Vue3Marquee style="color: #fff">{{ musicList.name }}</Vue3Marquee>
          <span v-for="item in musicList.ar" :key="item"> {{ item.name }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
      </div>
      <div class="detailTopRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detailContent" v-show="!isLyricShow">
      <img src="@/assets/cd.png" alt="" class="img_cd" />
      <img
        src="@/assets/needle-ab.png"
        alt=""
        class="img_neddle"
        :class="{ img_needle_active: !isbtnShow }"
      />
      <img
        :src="musicList.al.picUrl"
        alt=""
        class="img_ar"
        :class="{ img_ar_active: !isbtnShow, img_ar_paused: isbtnShow }"
        @click="isLyricShow = true"
      />
    </div>
    <div class="lyric" ref="musiclyric" v-show="isLyricShow">
      <p
        v-for="item in lyric"
        :key="item"
        :class="{
          active:
           (currentTime * 1000 >= item.time && currentTime * 1000 < item.pre),
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="detailfooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
      <div class="footerCent">
<input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goplay(-1)">
          <use xlink:href="#icon-shangyishou"></use>
        </svg>
        <svg
          class="icon bofang"
          aria-hidden="true"
          @click="play"
          v-if="isbtnShow"
        >
          <use xlink:href="#icon-bofang2"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goplay(1)">
          <use xlink:href="#icon-xiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
export default {
  name: "",
  data() {
    return {
      isLyricShow: false,
    };
  },
  props: ["musicList", "play", "isbtnShow","addDuration"],
  mounted() {
    console.log(this.musicList);
    // console.log(this.lyricList.lyric);
    this.addDuration();
  },
  components: {
    Vue3Marquee,
  },
  watch:{
  currentTime:function(newValue){
let p = document.querySelector("p.active")
console.log([p]);
/* if(p){
    if(p.offsetTop>300){
        console.log(this.$refs.musicLyric);
       this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
    }
}  */
if(newValue==this.duration){
    if(this.playListIndex===this.playList.length-1){
        this.updateMusicIndex(0)
    }else{
        this.updateMusicIndex(this.playListIndex+1)
    }
}
}
  },
  methods: {
    ...mapMutations(["updateDetailShow", "updateMusicIndex"]),
    backHome: function () {
      this.updateDetailShow();
      this.isLyricShow = false;
    },
    goplay(num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updateMusicIndex(index);
    },
  },
  computed: {
    ...mapState(["lyricList", "currentTime", "playList", "playListIndex","duration"]),
    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        //store中的luricList可能为空，为空时没有数据显示
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          //  console.log(min, sec, Number(mill), lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre =100000;
          } else {
            item.pre = arr[i + 1].time; //下一句歌词的时间
          }
        });
        console.log(arr);
        return arr;
      }
    },
  },
};
</script>
<style scoped lang="less">
.musicDetail {
  position: relative;
  .backimg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    filter: blur(70px);
  }
  .detailtop {
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    fill: #fff;
    .detailTopLeft {
      width: 60%;
      height: 100%;
      display: flex;
      align-items: center;
      div {
        width: 3rem;
        height: 100%;
        padding-left: 0.3rem;
        p {
          font-weight: 700;
        }
        span {
          color: #999;
          font-size: 0.24rem;
          font-weight: 400;
        }
        .icon {
          width: 0.24rem;
          height: 0.24rem;
          fill: #999;
        }
      }
    }
  }
  .detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    justify-content: center;
    align-items: column;
    position: relative;
    .img_neddle {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-13deg);
      transition: all 2s;
    }
    .img_needle_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }
    .img_cd {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
    }
    .img_ar {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      bottom: 3.14rem;
      animation: rotate_ar 12s linear infinite;
    }
    .img_ar_active {
      animation-play-state: running;
    }
    .img_ar_paused {
      animation-play-state: paused;
    }
    @keyframes rotate_ar {
      0% {
        tranfrom: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
  }
  .lyric {
    width: 100%;
    height: 9rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 0.6rem;
    padding: 0 .4rem;
    overflow: scroll;
    p {
      color: rgb(233, 224, 224);
      margin-bottom: 0.4rem;
    }
    .active {
      font-size: 0.5rem;
      color: #fff;
    }
  }
  .detailfooter {
    width: 100%;
    height: 3rem;
    position: fixed;
    bottom: 0.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .footerTop {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.4rem;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
        fill: rgb(245, 234, 234);
      }
    }
    .range{
        width:100%;
        height: 0.06rem;
    }
    .footer {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.4rem;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
        fill: rgb(245, 234, 234);
      }
      .bofang {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>
