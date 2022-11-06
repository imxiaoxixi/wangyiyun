<template>
  <div class="login">
    <p>登 陆</p>
    <div class="box">
      <div class="loginPhone">
        <p>账号</p>
        <input type="text" class="phone" v-model="phone" />
      </div>
      <div class="loginPass">
        <p>密码</p>
        <input type="password" class="password" v-model="password" />
      </div>
      <button @click="Login">登录</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      phone: '',
      password:'',
    };
  },
  methods: {
  /*   Login: async function () {
      let res = await this.$store.dispatch("getLogin", {
        phone: this.phone,
        password: this.password,
      });
      console.log(res);
      if (res.data.code == 200) {
        this.$router.push("/infoLogin");
        this.$store.commit("updateLogin");
        sessionStorage;
      } else {
        alert("手机号或密码错误");
        this.password=''
      }
    }, */
    Login:function(){
        this.$router.push('/')
    }
  },
};
</script>
<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    font-size: 0.6rem;
    font-weight: 500;
    color: #d43c33;
  }
  .box {
    width: 6rem;
    height: 4rem;
    border-radius: 0.4rem;
    margin-top: 4rem;
    margin-left: 50px;
    p {
      display: inline-block;
      font-size: 0.3rem;
      padding-right: 0.4rem;
    }
    input {
      width: 4rem;
      height: 0.5rem;
      margin-top: 0.6rem;
      border: none;
      border-bottom: 0.02rem solid #999;
    }
    button {
      width: 5rem;
      height: 0.6rem;
      margin-top: 0.6rem;
      background-color: #d43c33;
      color: #fff;
      border: none;
      border-radius: 0.4rem;
    }
  }
}
</style>
