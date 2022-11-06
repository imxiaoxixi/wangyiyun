<template>
    <div class="topNav">
<div class="topLeft">
  <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-31liebiao"></use>
</svg>
</div>
<div class="topContent">
<span  @click="$router.push('/Login')">我的</span>
<span class="active">发展</span>
<span>云村</span>
<span>视频</span>
</div>
<div class="topRigth">
  <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
    <use xlink:href="#icon-sousuo1"></use>
</svg>
</div>
    </div>
</template>
<script>
export default {
   name :'TopNav'
}
</script>
<style scoped lang="less">
.topNav{
    display:flex;
    padding: .3rem;
    justify-content: space-between;
    width: 100%;
    height: 1rem;
    .topContent{
        width:65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        font-size: .36rem;
    }
    .active{
        font-weight: 900;
    }
}
</style>
