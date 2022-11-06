<template>
  <div class="ItemMusicList">
    <div class="listTop">
      <div class="leftList">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span
          >播放全部 <span>(共{{ itemList.length }}首)</span></span
        >
      </div>

      <div class="rightList">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao1"></use>
        </svg>
        <span>收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="itemMusic">
      <div class="item" v-for="(item, index) in itemList" :key="index">
        <div class="itemLeft" @click="playMusic(index)">
          <span>{{ index + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(itemName, i) in item.ar" :key="i">
              {{ itemName.name }}
            </span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-24gl-playSquare"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  name: "",
  setup(props) {
    console.log(props);
  },
  props: ["itemList", "subscribedCount"],
  methods:{
    ...mapMutations(["updateMusicList","updateMusicIndex"]),
    playMusic:function(index){
      this.updateMusicList(this.itemList)
      this.updateMusicIndex(index)
    }
  }
};
</script>
<style scoped lang="less">
.ItemMusicList {
  background-color: #fff;
  height: 10rem;
  width: 100%;
  padding: 0 0.2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .listTop {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .leftList {
      width: 3rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        stroke: #333333;
        stroke-width: 20;
      }
      span {
        font-weight: 600;
        span {
          font-size: 0.1rem;
          font-weight: 500;
          color: #999;
        }
      }
    }
    .rightList {
      display: flex;
      align-items: center;
      padding: 0.2rem;
      background-color: red;
      border-radius: 0.4rem;
      color: #fff;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #fff;
        margin-right: 0.1rem;

      }
    }
  }
  .itemMusic {
    width: 100%;
    height: 9rem;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        span {
          font-weight: 400;
        }
        div {
          margin-left: 0.4rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          p {
            font-weight: 700;
          }
          span {
            margin-top: 0.1rem;
            color: #999;
            font-size: 0.24rem;
            font-weight: 400;
          }
        }
      }
      .itemRight {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        fill: #999;
        position: relative;
        .icon {
          .bofang {
            position: absolute;
            left: 0;
          }
          .liebiao {
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
