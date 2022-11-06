<template>
  <div class="search">
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input
        type="text"
        placeholder="陈奕迅"
        v-model="searchKey"
        @keydown.enter="searchBegin"
      />
    </div>
    <div class="searchHistory">
      <div class="top">
        <p>历史</p>
        <svg class="icon" aria-hidden="true" @click="removeList">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>
      <span
        v-for="item in searchHistoryList"
        :key="item"
        @click="searchHistory(item)"
      >
        {{ item }}</span
      >
    </div>
    <div class="itemMusic">
      <div
        class="item"
        v-for="(item, index) in getSearchMusicList"
        :key="index"
      >
        <div class="itemLeft" @click="playMusic(item)">
          <span>{{ index + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(itemName, i) in item.artists" :key="i">
              {{ itemName.name }}
            </span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
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
import { getSearchMusic } from "@/request/api/home.js";
export default {
  name: "",
  data() {
    return {
      searchHistoryList: [],
      searchKey: "",
      getSearchMusicList: [],
    };
  },
  mounted() {
    this.searchHistoryList = JSON.parse(localStorage.getItem("searchList"))
      ? (this.searchHistoryList = JSON.parse(
          localStorage.getItem("searchList")
        ))
      : [];
  },
  methods: {
    searchBegin: async function () {
      if (this.searchKey !== "") {
        this.searchHistoryList.unshift(this.searchKey);
        //数组去重
        this.searchHistoryList = [...new Set(this.searchHistoryList)];
        //搜索数量限制
        if (this.searchHistoryList.length > 10) {
          this.searchHistoryList.splice(this.searchHistoryList.length - 1, 1);
        }
        localStorage.setItem(
          "searchList",
          JSON.stringify(this.searchHistoryList)
        );

        //搜素数据
        let res = await getSearchMusic(this.searchKey);
        this.getSearchMusicList = res.data.result.songs;
        console.log(res);
        this.searchKey = "";
      }
    },
    removeList() {
      localStorage.removeItem("searchList");
      this.searchHistoryList = [];
    },
    searchHistory: async function (item) {
      let res = await getSearchMusic(item);
      console.log(res);
      this.getSearchMusicList = res.data.result.songs;
    },
    //播放音乐
    playMusic: function (item) {
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.$store.commit("pushPlayList", item);
      this.$store.commit(
        "updateMusicIndex",
        this.$store.state.playList.length - 1
      );
    },
  },
};
</script>
<style scoped lang="less">
.search {
  .searchTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    input {
      width: 100%;
      border: none;
      border-bottom: 0.02rem solid #999;
      margin-left: 0.2rem;
      padding: 0.1rem;
    }
  }
  .searchHistory {
    width: 100%;
    padding: 0 0.2rem;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-weight: 700;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    span {
      background-color: rgb(237, 232, 232);
      padding: 0.1rem;
      border-radius: 0.4rem;
      margin: 0.1rem 0.1rem;
      display: inline-block;
    }
  }
  .itemMusic {
    width: 100%;
    height: 9rem;
    padding: 0.4rem;
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
            display: inline;
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
