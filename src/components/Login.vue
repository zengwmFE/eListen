<template>
<!--屏幕适配376*585-->
  <div class="Login fl" >
   <div class="container" v-if="!shownewPassword">
     <div class="logo">
       <img src="../assets/img/logo.png" alt="">
     </div>
     <div class="table fl">
       <router-link to="/" @click.native="TabChange(1)" :class="{active:1==currentIndex}" class="userLogin">用户登录</router-link>
       <router-link to="/res"  @click.native="TabChange(2)" :class="{active:2==currentIndex}" class="userRegister">用户注册</router-link>

     </div>
     <router-view class="routerview fl" v-if="!shownewPassword"></router-view>
   </div>
    <div class="forgetPassword" @click="wantForget" v-if="!shownewPassword"><span>忘记密码?</span></div>
    <transition  name="bounce"><new-password v-if="shownewPassword" @resetSuccess="returnBack"></new-password></transition>
    <div class="aboutMe fl" @click.native=""v-if="!shownewPassword">关于我们</div>
  </div>
</template>

<script>
  import LoginComponent from "@/components/LoginComponent";
  import newPassword from "@/components/setNewPassword"
export default {
  name: 'Login',
  data () {
    return {
      activeTab: 'tab1',
      index:true,
      currentIndex:1,
      shownewPassword:false
    }
  },
  methods:{
    wantForget(){
      this.shownewPassword =true;
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    handleActive () {
      window.alert('tab active')
    },
    TabChange(id){
      this.currentIndex =id;
    },
    returnBack(){
      this.shownewPassword =false;
    }
  },
  components:{
    LoginComponent,
    newPassword
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Login{
    height:100%;
    width:100%;
  }
  .container{
    margin-top:5.7em;
    height:auto;
    padding-top:2em;
  }
  .logo{
    margin-top:3em;
  }
  .logo>img{
    display: inline-block;
    vertical-align: center;
    margin-left:30%;
  }
  .table{
      width:80%;
      height:3em;
      margin-top:3em;
      background:#fff;
      line-height:3em;
      font-weight:bold;
      margin-left:auto;
      margin-right:auto;
  }
  .table>a{
    display: inline-block;
    width:30%;
    height:2.625em;
    color:#000;
    float: left;
    text-align: center;
    font-size:0.75em;

  }
  .table>a:first-child{
    margin-left:6em;
  }
  .table>a.active{
      color:#2196F3;
    border-bottom:0.2em solid #2196F3;
  }
  .routerview{
    /*background:#2196F3;*/
    width:80%;
    margin:0 auto;
    border:1px solid #2196F3;
    border-radius: 0.625em;
    padding:1.25em;
  }
  .forgetPassword{
      margin:1em 3em 0 ;
      width:5em;
  }
  .aboutMe{
      margin-top:2em;
    margin-right:2em;
    text-align: center;
  }
  .page_main_header{
    display: none;
  }
  .navBottom{
    display: none;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
 /* .bounce-leave-active {
    animation: bounce-in .2s reverse;
  }*/
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
