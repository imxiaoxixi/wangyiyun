import { createStore } from "vuex";
import {getMusicLyric} from "@/request/api/item.js";
import { getPhoneLogin } from "@/request/api/home.js";

export default createStore({
  state: {
    playList: [
      {
        //播放列表
        al: {
          id: 136184367,
          name: "予你",
          pic: 109951166625738080,
          picUrl:
            "https://p1.music.126.net/yxVm_vRFOode6yP67NmMcA==/109951166625738075.jpg",
          pic_str: "109951166625738075",
        },
        id: 1895330088,
        ar: [
          {
            name: "队长",
          },
        ],
        name: "予你",
      },
    ],
    playListIndex: 0, //默认下标为0
    isbtnShow: true, //按钮的显示
    detailShow: false, //歌曲详情页是否展示
    lyricList: {}, //歌词
    currentTime: 0, //当前时间
    duration: 0, //总时长
    isLogin:false, //判断是否登录
    isFooterShow:true,//底部是否显示
    token:"" //保存token
  },
  getters: {},
  mutations: {
    //控制是否播放音乐
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value;
    },
    //点击音乐把列表的数据传过去
    updateMusicList: function (state, value) {
      state.playList = value;
    },
    //传递当前列表音乐的下标
    updateMusicIndex: function (state, value) {
      state.playListIndex = value;
    },
    //是否显示歌曲详情页
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow;
    },
    //传递歌词
    updateLyricList: function (state, value) {
      state.lyricList = value;
    },
    //获取当前歌词的播放时间
    updateCurrentTime: function (state, value) {
      state.currentTime = value;
    },
    //获取实时播放时长
    updateDuration:function(state,value){
      state.duration=value
    },
    //点击搜索列表添加新歌
    pushPlayList(state,value){
      state.playList.push(value)
    },
    //修改登录状态为已登录
    updateLogin(state){
      state.isLogin=true
    },
    //保存token
    saveToken(state,value){
      state.token=value
    }
  },
  actions: {
    //获取歌词
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value);
      console.log(res);
      context.commit("updateLyricList", res.data.lrc);
    },
    //登录
    getLogin:async function(context,value){
      let res = await getPhoneLogin(value)
      console.log();
      return res
    }
  },
  modules: {},
});
