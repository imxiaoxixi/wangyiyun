<template>
  <div class="topMusicItem">
    <div class="topItem">
      <img :src="playlist.coverImgUrl" alt="" class="itemImg" />
      <div class="leftItem">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="rightItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>

    <div class="contentItem">
      <div class="leftContent">
        <img :src="playlist.coverImgUrl" alt="" />
        <div class="playCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
          </svg>
          <span>{{ changeCount(playlist.playCount) }}</span>
        </div>
      </div>
      <div class="rightContent">
        <p class="title">{{ playlist.name }}</p>
        <div class="centerContent">
          <img :src="playlist.creator.backgroundUrl" alt="" />
          <span>{{ playlist.creator.nickname }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
        <div class="bottomContent">
          <span>{{ playlist.description }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="bottomItem">
      <div class="box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liuyan"></use>
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang1"></use>
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div class="box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai1"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  setup(props) {
    if ((props.playlist.creator = "")) {
      props.playlist.creator = sessionStorage.getItem();
    }
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { changeCount };
  },
  props: ["playlist"],
};
</script>
<style scoped lang="less">
.topMusicItem {
  width: 100%;
  height: 6rem;
  .topItem {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    position: relative;
    .leftItem,
    .rightItem {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      span {
        font-size: 0.4rem;
        color: #fff;
      }
      .icon {
                  width: 0.4rem;
          height: 0.4rem;
        fill: #fff;
      }
    }
    .itemImg {
      width: 100%;
      height: 6rem;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      filter: blur(30px);
    }
  }
  .contentItem {
    width: 100%;
    height: 3.5rem;
    padding: 0.6rem 0.2rem;
    display: flex;
    justify-content: space-between;
    .leftContent {
      width: 36%;
      height: 2.6rem;
      position: relative;
      img {
        width: 100%;
        height: 2.6rem;
        border-radius: 0.2rem;
      }
      .playCount {
        color: white;
        font-size: 0.26rem;
        position: absolute;
        right: 0.1rem;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          fill: #fff;
        }
      }
    }
    .rightContent {
      width: 64%;
      height: 100%;
      padding: 0 0 0 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 0.3rem;
        font-weight: 900;
        color: #fff;
        font-family: "微软雅黑";
      }
      .centerContent {
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        color: #f5f5f5;
        display: flex;
        align-items: center;
        margin-top: 0.3rem;

        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
        }
        span {
          margin-left: 0.1rem;
        }
        .icon {
          margin-left: 0.1rem;
          width: 0.24rem;
          height: 0.24rem;
          vertical-align: middle;
        }
      }
    }
    .bottomContent {
      margin-top: 15px;
      display: flex;
      align-items: center;
      span {
        width: 95%;
        color: #f5f5f5;
        font-size: 0.2rem;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .icon {
        width: 0.24rem;
        height: 0.24rem;
      }
    }
  }
  .bottomItem {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    margin-top: 0.1rem;
    color: #fff;
    .box {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        fill: #fff;
        width: 0.6rem;
        height: 0.6rem;
      }
      span {
        margin-top: 0.1rem;
      }
    }
  }
}
</style>
