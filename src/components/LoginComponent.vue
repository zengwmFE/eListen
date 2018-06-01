<template>
 <div class="">
   <mu-text-field hintText="请输入邮箱"
                  icon="person" v-model="Email"
                  :errorText="errorText"/><br/>
   <mu-text-field hintText="请输入密码" type="password" icon="lock"
                  v-model="password"/><br/>
   <mu-toast v-if="toast" :message="LoginText" @close="hideToast" actionColor="#00f" :class="{'mu-toast-active':errorClass}"/>
   <input type="text" style="display: none">

   <mu-raised-button label="登录" class="demo-raised-button" primary @click.native="OnLogin"/>
 </div>
</template>

<script>
    /*import Vue from "vue";
    import Vueaxios from "vue-axios";
    import axios from "axios";
    import {mapGetters,mapActions}from "vuex"
    Vue.use(axios,Vueaxios);*/
    export default {
        name: "loginComponent",
      data(){
          return {
            toast: false,
            Email:"",
            password:"",
            LoginText:"",
            errorText:"",
            errorClass:false
          };
      },
      methods:{
        OnLogin(){

            var Email = this.Email;
            var password = this.password;
            var _this = this;
            //正则验证邮箱的正确性
          if(Email&&password){
            var reg = /^[0-9a-zA-Z-_.]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]{2,10}$/;
            if(reg.test(Email)){
              _this.$http.post("/api/login",
                {
                  Email:Email,
                  password:password
                })
                .then(function(response){
                  var data=response.data;
                  console.log(data);
                  if(data.code==200){
                    _this.errorText = "";
                    _this.LoginText =data.message;
                    _this.errorClass = false;
                    _this.showToast();
                    var userInfo = data.userMessage;
                    console.log(userInfo);
                    if(!localStorage.getItem("userInfo")) {
                      localStorage.setItem("userInfo", JSON.stringify(userInfo));
                    }
                    else{
                      console.log(123444);
                    }
                    setTimeout(function(){
                      _this.$router.push("/home");
                    },2000);
                  }else{
                    _this.errorText = " ";
                    _this.LoginText =data.message;
                    _this.errorClass = true;
                    _this.showToast();
                  }
                })
                .catch(function(err){
                  console.log(err);
                });
            }else {
              _this.errorText = " ";
              _this.LoginText = "邮箱格式不正确";
              _this.errorClass = true;
              _this.showToast();
            }
          }
          //邮箱为空
          else{
                _this.errorText = " ";
                _this.LoginText = "邮箱或密码不能为空";
                _this.errorClass = true;
                _this.showToast();
          }


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
      }
      }
    }
</script>

<style scoped>

  .Login{
    width:100%;
    height:41.7em;
    margin:0 auto;
  }
  .login_field{
    width:80%;
    height:20em;
    margin:0 auto ;

    padding:0.625em;
  }

  .mu-raised-button{
    width:100%;
    font-size: 20px;
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
/*  .mu-text-field-input{
    border:0.065em solid #ececec;
    -webkit-border-radius: 0.25em;
    -moz-border-radius: 0.25em;
    border-radius: 0.25em;
    height: 1.5em !important;
  }*/
</style>
