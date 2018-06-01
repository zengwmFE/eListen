<template>
    <div id="self_center">
          <div class="self_header">
            <div class="header_back">
              <icon name="angle-left" scale="2" @touchstart.native="header_back"></icon>
            </div>

          </div>
      <div class="self_content">
        <mu-list-item class="Selfsculpture_wapper">
          <div class="sculpture_wapper">
            <span>修改头像</span>
            <mu-avatar slot="left" :src="getSelfsculpture" :size="35" :zDepth="0"/>
          </div>
        </mu-list-item>
        <mu-list-item class="username" @click="open"><span>昵称:</span><span>{{getUserInfo.nickname}}</span></mu-list-item>
        <mu-list-item class="userid"><span>账号:</span><span>{{getUserInfo.Email}}</span></mu-list-item>
        <mu-list-item  class="classnum"><span>学号:</span><span>{{getUserInfo._id}}</span></mu-list-item>
        <mu-list-item class="telphonenum">
          <span>手机号</span><span><icon name="angle-right" scale="1"></icon></span>
        </mu-list-item>
      </div>
      <mu-toast v-if="toast" :message="LoginText" @close="hideToast" actionColor="#00f" :class="{'mu-toast-active':errorClass}"/>
      <mu-dialog :open="dialog" title="修改昵称" @close="close">
        <mu-text-field hintText="" v-model="nickname"/><br/>
        <mu-flat-button slot="actions" @click="close" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="wantChange" label="确定"/>
      </mu-dialog>
      <div class="self_logout">
        <mu-raised-button @click="openBottomSheet" label="退出" class="loginoutBut"/>
        <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
          <mu-list @itemClick="closeBottomSheet">

            <mu-list-item title="退出登录" @click="loginOut"/>
            <mu-list-item title="取消"/>
          </mu-list>
        </mu-bottom-sheet>
      </div>
    </div>
</template>

<script>
  import {mapGetters,mapActions}from "vuex";
 /* import Vue from "Vue";
  import vueaxios from "vue-axios";
  import axios from "axios";
  Vue.use(vueaxios,axios);*/
    export default {
        name: "self-center",
      data(){
          return {
            bottomSheet: false,
            dialog: false,
            nickname:"",
            toast: false,
            password:"",
            LoginText:"",
            errorText:"",
            errorClass:false
          }
      },
        methods:{
          header_back(){
           this.$store.dispatch("hideSelfCenter");
            this.$store.dispatch("showNav");
            this.$store.dispatch('showTop');
          },
          wantChange(){
            var nickname = this.nickname;
            var userInfo = this.$store.getters.getUserInfo;
            var _this = this;
            if(nickname===userInfo.nickname){
              console.log("没有改变");

            }else{
                  userInfo.nickname = nickname;

              _this.$http.post("/api/reset/resetNick",{
                    'userInfo':JSON.stringify(userInfo)
                    }).then(function(context){
                      if(context.data.code===200){
                        _this.$store.dispatch("setUserInfo",userInfo);
                        console.log(userInfo);
                        window.localStorage.setItem("userInfo",JSON.stringify(userInfo));
                        _this.errorText = "";
                        _this.LoginText =context.data.message;
                        _this.errorClass = false;
                        _this.showToast();
                      }else{
                        _this.errorText = " ";
                        _this.LoginText =context.data.message;
                        _this.errorClass = true;
                        _this.showToast();
                      }
                  });
            }
            this.close();

          },
          openBottomSheet(){

            this.bottomSheet = true
          },
          closeBottomSheet () {
            this.bottomSheet = false
          },
          open () {
            console.log(this.$store.getters.getUserInfo.username+"");
            this.nickname=this.$store.getters.getUserInfo.nickname;
            console.log("open");
            this.dialog = true;
          },
          close () {
            this.dialog = false
          },
          showToast () {
            this.toast = true;
            //使用了toast
            if (this.toastTimer) clearTimeout(this.toastTimer);
            this.toastTimer = setTimeout(() => { this.toast = false;


              /*this.$router.push("/home");*/}, 2000)

          },
          hideToast () {
            console.log(12);
            //使用了toast
            this.toast = false;
            if (this.toastTimer) clearTimeout(this.toastTimer);
          },
          loginOut(){
            window.localStorage.removeItem("userInfo");
            this.$router.go(0);
          }
        },
      computed:{
          ...mapGetters(['getSelfsculpture',"getUserInfo"]),
      }
    }
</script>

<style scoped>
  @import "../assets/css/selfCenter.css";
  /*所有的页面都从base.css样式继承*/
.loginoutBut{
  width:15em;
}
  .mu-ripple-wrapper
  {
   padding:0;
  }
  .mu-toast{
    background:#c8e6c9;
    color:#43a047;
    width:50%;
    border-radius:0.5em;
    margin-left:6.5em;
    text-align: center;
    font-size:14px;
    font-family: "楷体";
  }
  .mu-toast-active{
    background:#ef9a9a;
    color:#f44336;
  }
</style>
