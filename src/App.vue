<template>
  <div class="App">
   <header v-if="showTop">
    <header-com></header-com>
   </header>
    <router-view ref="menu" v-if="!showSelfCenter"></router-view>
    <transition name="slide-fade">
    <self-center ref="selfCenter" v-if="showSelfCenter"></self-center>
    </transition>
    <nav-bottom ref="nav_bottom" v-if="showNav"></nav-bottom>
  </div>

</template>

<script>
  import Vue from "vue";
  import navBottom from "@/components/navBottom";
  import museui from 'muse-ui';
  import "muse-ui/dist/muse-ui.css";
  import "muse-ui/dist/theme-light.css"
  import {mapGetters,mapActions} from "vuex";
  import headerCom from "@/components/headerCom";
  import selfCenter from "@/components/selfCenter";
  Vue.use(museui);

export default {
  name: 'App',
  data(){
    return {
      open: false,
      docked: true,
      App_title:"eListen"
    }
  },
  methods:{
   /* showSelfCenter(){
      //通过子组件的事件触发
        this.$refs.menu.show();
        //调用ref="menu"下面的函数
    }*/
  },
  computed :{
    ...mapGetters(['showNav','showTop','getSelfsculpture','showSelfCenter',"getUserChange"])
  },
  watch:{
          $route(to,from){
            if(to.path==="/"||to.path==="/res"){
                this.$store.dispatch("hideNav");
                this.$store.dispatch("hideTop");
            }
            else if(to.path==="/home"||to.path==="/word"||to.path==="/person"){
              this.$store.dispatch("showNav");
              this.$store.dispatch('showTop');
            }
          }
  },
  mounted(){
  }
  ,
  components:{
    navBottom,
    headerCom,
    selfCenter,
  }
}
</script>

<style>
  @import "assets/css/icon.css";
  @import "assets/css/icon-index.css";
  .register-btn{
    width:90%;
    margin-left:1em;
  }
  header{
    width:100%;
    height:4.125em;
    background:#2196F3;
    border-bottom: 1px solid #bdbdbd;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-enter
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
