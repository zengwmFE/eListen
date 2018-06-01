<template>
    <div class="headerCom">
      <mu-icon-button icon="menu" slot="left"   @click="toggle()" class="user_menu"/>
      <mu-drawer :open="open" :docked="false"
                 @close="toggle()"
                 @touchmove="CloseLeftMenu()"
      >

        <mu-list>
          <mu-list-item class="self_sculpture_list" @click="showCenter()">
            <mu-avatar slot="left" :src="getSelfsculpture" :size="50" :zDepth="0"/>
           <div class="group">
             <div class="user_message"><p class="username" >{{getUserInfo.nickname}}</p><p class="user_id">{{getUserInfo._id}}</p></div>
             <div class="user_code"> <icon name="angle-right" scale="1"></icon></div>
           </div>
          </mu-list-item>
          <mu-list-item >帮助</mu-list-item>
          <mu-list-item >设置</mu-list-item>
          <mu-list-item>给个好评</mu-list-item>
        </mu-list>
      </mu-drawer>
      <div  class="app_title"> <span>{{App_title}}</span></div>
      <div class="header_seacher" @click="pushTo"><mu-icon value="search"/></div>

    </div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";
    export default {
        name: "header-com",
      data(){
          return {
            open: false,
            docked: true,
            App_title:"eListen"
          }
      },
      methods:{
        toggle () {

          this.open = !this.open;
        },
        CloseLeftMenu(){
          this.open = false;
        },
        showCenter(){
            this.$store.dispatch("showSelfCenter");
            this.$store.dispatch("hideNav");
            this.$store.dispatch("hideTop");
        },
        pushTo(){
          this.$router.push("/habit");
          this.$store.dispatch("setBottomActive","habit");
        }
      },
    computed :{
    ...mapGetters(['showNav','showTop','getSelfsculpture',"showSelfCenter","getUserInfo"])
    },
    }
</script>

<style scoped>
.headerCom{
  height:auto;
  width:auto;
}
</style>
