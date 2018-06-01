<template>
  <div class="register">
    <mu-text-field hintText="请输入邮箱"
                   icon="person" type="text"
                   v-model="Email"
                   :errorText="errorText"
                   errorColor/><br/>
    <mu-text-field hintText="请输入密码" type="password" icon="lock" v-model="password"/><br/>
    <mu-toast v-if="toast" :message="regText" @close="hideToast" :class="{'mu-toast-active':errorClass}"/>
    <input type="text" hidden>

    <!--  <mt-field label="出生日期" placeholder="请输入生日" type="tel" @focus.native.capture="openPicker" v-model="a" ></mt-field>-->
    <mu-raised-button label="注册" class="demo-raised-button" primary @click.native="OnReg"/>
  </div>
</template>

<script>
  /*import Vue from "vue";
  import axios from "axios"
  import Vueaxios from "vue-axios";
  Vue.use(Vueaxios,axios);*/
    export default {
        name: "register",
      data(){
          return {
            Email:"",
            password:"",
            errorText:"",
            regText:"",
            toast: false,
            errorClass:false
          }
      },
      methods:{
        OnReg(){
          var Email = this.Email;
          var password = this.password;
          var _this = this;
          //验证
          var reg = /^[0-9a-zA-Z-_.]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]{2,10}$/;
          if(reg.test(Email)){
             _this.$http.post("/api/register",
             {
              Email: Email,
              password:password
           }
             )
            .then(function(response){
              var data = response.data;
              console.log(data);
              if(data.code==200){
                _this.errorText = "";
                _this.regText = "注册成功";
                _this.errorClass = false;
                _this.showToast();

              }else{
                _this.errorText = " ";
                _this.regText = data.message;
                _this.errorClass = true;
                _this.showToast();

              }

            })
            .catch(function(err){
              console.log(err);
            })
                .finally(function(){
                  console.log(123);
                  _this.$http.post("/api/register/registered",
                    {
                      Email: Email,
                    }
                  ).then(function(context){
                    console.log(context);
                        var data = context.data;
                        console.log(data);
                    var userInfo = data.UserInfo;
                    localStorage.setItem("userInfo",JSON.stringify(userInfo));
                    var Timer1 = setTimeout(function(){
                      _this.errorText = "";
                      _this.regText = data.message;
                      _this.errorClass = false;
                      _this.showToast();
                      clearTimeout(Timer1);
                      setTimeout(function(){
                        _this.$router.push("/home");
                      },2000);
                    },2000);
                  });
                });
          }else{
            this.errorText = " ";
            this.regText = "邮箱格式错误";
            this.Email = "";
            this.showToast();
            this.errorClass = true;
          }


        },
        showToast () {
          this.toast = true
          if (this.toastTimer) clearTimeout(this.toastTimer)
          this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
        },
        hideToast () {
          this.toast = false;
          if (this.toastTimer) clearTimeout(this.toastTimer);
          /*this.$router.push("/home");*/
        },
        close(){

        }
      },
    }
</script>

<style scoped>
.demo-raised-button{

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
  .mu-raised-button{
    width:100%;
    font-size: 20px;
  }
</style>
