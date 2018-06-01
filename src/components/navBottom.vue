<template>
<div class="navBottom">
 <div class="router-link">
   <router-link to="/home" class="tabItem" :class="{router_active:getBottomActive==='home'}" @touchstart.native="movestart('home')">
     <div class="home_group">
       <icon name="home" class="icon_home"></icon>
      <p class="words">首页</p>
   </div></router-link>

   <router-link to="/word" class="tabItem" :class="{router_active:getBottomActive=='word'}" @touchstart.native="movestart('word')">
     <div class="book_group">
       <icon name="book"></icon>
       <p class="words">学习</p>
   </div></router-link>

   <router-link to="/habit" class="tabItem" :class="{router_active:getBottomActive==='habit'} " @touchstart.native="movestart('habit')">
     <div class="heart_group">
     <icon name="heartbeat"></icon>
       <p class="words">查找</p>
   </div></router-link>
 </div>
</div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";
    export default {
        data(){
          return {
            isActive:"home"
          }
        },
      methods:{
        movestart(index){
        this.$store.dispatch("setBottomActive",index);
          this.isActive = index;
        }
      },
      mounted(){

      },
      computed:{
        ...mapGetters(['getBottomActive'])
      }
    }
</script>

<style scoped>
@import "../assets/css/navBottom.css";
</style>
