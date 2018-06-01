<template>
    <div id="newPassword">
     <div class="new_header">
       <icon name="angle-left" scale="1" @click.native="header_back" class="left_icon"> </icon>
     </div>

      <div class="new_content">
         <h2>忘记密码</h2>
          <div class="new_input"><mu-text-field hintText="请输入邮箱"
                                                :errorText="errorText"
                                                v-model="Email"/><br/>
            <mu-text-field hintText="请输入新密码."
                           :errorText="errorText"
                           v-model="newPassword"
                            type="password"
            /><br/></div>
        <mu-raised-button label="确定" class="demo-raised-button" backgroundColor="#2196F3" @click.native="onSubmit"/>
        <mu-toast v-if="toast" :message="resetText" @close="hideToast" :class="{'mu-toast-active':errorClass}"/>
      </div>
    </div>
</template>

<script>
  /*import Vue from"vue";
  import Vueaxios from "vue-axios";
  import axios from "axios";
  Vue.use(Vueaxios,axios);*/
    export default {
        name: "set-new-password",
        data(){
          return {
            newPassword:"",
            toast: false,
            errorText:"",
            errorClass:false,
            resetText:"",
            Email:""
          }
        },
        methods:{
          header_back(){
            this.$emit("resetSuccess");
          },
          onSubmit(){
            var Email = this.Email;
            var newPassword = this.newPassword;
            var _this = this;

            if(Email){
              var reg = /^[0-9a-zA-Z-_.]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]{2,10}$/;
              console.log(123);
              if(reg.test(Email)){
                  _this.$http.post("/api/reset",{newPassword:_this.newPassword,Email:Email}).then(function(response){
                      var data = response.data;
                      if(data.code===200){
                        _this.errorText="";
                        _this.errorClass=false;
                        _this.resetText="验证信息已经发送请验证";
                        _this.showToast();
                        var Time1 = setTimeout(function(){
                          _this.errorText="";
                          _this.errorClass=false;
                          _this.resetText=data.message;
                          _this.showToast();
                          clearTimeout(Time1);
                          setTimeout(function(){
                            _this.returnBack();
                          },1000);
                        },3000);
                      }else{
                        _this.errorText=" ";
                        _this.errorClass=true;
                        _this.resetText=data.message;
                        _this.showToast();
                      }
                  })
                    .catch(function(err){

                    });
              }else{
                _this.errorText=" ";
                _this.errorClass=true;
                _this.resetText="邮箱格式不正确";
                _this.showToast();
              }

            }else{
              _this.errorText=" ";
              _this.errorClass=true;
              _this.resetText="邮箱或密码不能为空";
              _this.showToast();
            }
          },
          showToast () {
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer);
            this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
          },
          hideToast () {
            this.toast = false;
            if (this.toastTimer) clearTimeout(this.toastTimer)
          },
          returnBack(){
            this.$emit("resetSuccess");
          }
      }
    }
</script>

<style scoped>
  #newPassword{
    width:100%;
    height:100%;
    overflow: hidden;
    background:#ececec;
  }
.new_header{
  width:100%;
  height:3.5em;
  float:left;
  background:#fff;
  border-bottom: 1px solid #dbdbdb;
}
  .left_icon{
    display: block;
    margin:1em;
  }
  .new_content{
    width:100%;
    height:80%;

    background:#fff;
    float:left;
  }
  .demo-paper{
    width:70%;
    height:50%;
   }
  h2{
    display: block;
    text-align: center;
    margin-top:30%;
    color:#2196F3;
  }
  .new_input{
    margin-top:2em;
    border:1px solid #ececec;
    padding:2em;
    padding-left: 4em!important;
  }
  .mu-text-field{

  }
  .mu-raised-button{
      margin:2em 0 0 10em;
  }
  .mu-toast{
    background:#c8e6c9;
    color:#2e7d32;
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
