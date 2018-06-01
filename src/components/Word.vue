<template>
    <div class="word_container">
      <div v-if="myindex==true?!ispacket:!isword">
        <mu-raised-button label="" class="demo-raised-button listen_btn" @click="showself_collect">
          <div class="new_listen">
            <h3>我的文章收藏</h3>
            <h5>{{collections.length}}篇</h5>
          </div>
          <img class="listen_img" :src="imgUrl">
          <div></div>
        </mu-raised-button>
        <mu-raised-button label="" class="demo-raised-button listen_btn" @click="showself_wordcollect">
          <div class="new_listen">
            <h3>我的单词收藏</h3>
            <h5>{{wordcollections.length}}个</h5>
          </div>
          <img class="listen_img" :src="imgUrl">
          <div></div>
        </mu-raised-button>
      </div>
      <packet-detail v-if="ispacket" @returnword="showWord"></packet-detail>
      <word-detail v-if="isword" @returnword="showWord"></word-detail>
    </div>
</template>

<script>
  import packetDetail from "@/components/packet_detail";
  import wordDetail from "@/components/wordDetail";
  import {mapGetters} from "vuex";
    export default {
        name: "word",
        data(){
          return {
            imgUrl:'../../static/listen_packet.jpg',
            ispacket:false,
            isword:false,
            myindex:true,
            collections:[],
            wordcollections:[]
          }
        },
        methods:{
          showWord(){
            this.myindex = true;
            this.isword = false;
            this.ispacket = false;
            this.$store.dispatch("showNav");
            this.$store.dispatch("showTop");
            console.log("this is word page");
          },
          showself_collect(){
            this.myindex = true;
            this.isword = false;
            this.ispacket = true;
            this.$store.dispatch("hideNav");
            this.$store.dispatch("hideTop");
            console.log("this is word page");
          },
          showself_wordcollect(){
            this.myindex = false;
            this.isword = true;
            this.ispacket = false;
            this.$store.dispatch("hideNav");
            this.$store.dispatch("hideTop");
            console.log("words");
          }
        },
      created(){

          var _this = this;

          _this.collections = this.$store.getters.getUserInfo.collections;
        _this.wordcollections = this.$store.getters.getUserInfo.wordCollections;

      },
      computed:{
        ...mapGetters(['showNav','showTop','getSelfsculpture',"showSelfCenter","getUserInfo"])
      },
      components:{
        packetDetail,
        wordDetail
      }
    }
</script>

<style scoped>
  .word_container{
    height:100%;
  }
  .listen_btn{
    width: 90%;
    height:5em;
    margin-left:1.5em;
    margin-top:6em;
  }
</style>
