import service from ".."
//获取首页轮播图的数据
 export function getBanner(){
    return service({
        method:'GET',
        url:"/banner?type=2",
    })
}
//获取推荐歌单
export function getMusicList(){
    return service({
      method: "GET",
      url: "/personalized?limit=10",
    });
}
//获取搜索歌单
export function getSearchMusic(data) {
  return service({
    method: "GET",
    url: `/search?keywords=${data}`,
  });
}
//登录
export function getPhoneLogin(phone,password){
    return service({
        method:"GET",
        url:`/login/cellphone?phone=${phone}&password=${password}`
    })
}
//获取用户详情
export function getLoginUser(data){
    return service({
        method:"GET",
        url:`/user/detail?uid=${data}`
    })
}
