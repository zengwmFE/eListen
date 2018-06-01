<template>
    <div id="App">
     <div v-if="content">
       <div class="HomePage_warpper" v-if="!showSelfCenter">
         <mu-raised-button label="" class="demo-raised-button listen_btn" @click="showCapter">
           <div class="new_listen">
             <h3>学习新文章</h3>
             <h5>选择新文章</h5>
           </div>
           <img class="listen_img" :src="imgUrl">
           <div></div>
         </mu-raised-button>
         <mu-raised-button label="" class="demo-raised-button word_btn" @click="showWordPage">
           <div class="new_listen">
             <h3>学习新单词</h3>
             <h5>增加单词量</h5>
           </div>
           <img class="listen_img" :src="wordUrl">
           <div></div>
         </mu-raised-button>
       </div>
     </div>
      <new-capter v-if="capter" @ChapterExit ="chapterExit"></new-capter>
      <new-words v-if="words" @WordsExit="wordsExit"></new-words>
    </div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";
  import selfCenter from "@/components/selfCenter";
  import newCapter from "@/components/newCapter";
  import newWords from "@/components/newWords";
    export default {
        name: "",
      data(){
          return {
            showCenter:false,
            imgUrl:'../../static/page_listen.jpg',
            wordUrl:"../../static/page_word.jpg",
            content:true,
            capter:false,
            words:false
          }
      },
        methods:{
          showCapter(){
            this.$store.dispatch("hideNav");
            this.$store.dispatch("hideTop");
            this.content = false;
            this.capter = true;
          },
          chapterExit(){
            this.content = true;
            this.capter = false;
          },
          showWordPage(){
            this.$store.dispatch("hideNav");
            this.$store.dispatch("hideTop");
            this.content = false;
            this.words = true;
          },
          wordsExit(){
            this.content = true;
            this.words = false;
          }
        },
        components:{
          selfCenter,
          newCapter,
          newWords
        },
      computed :{
        ...mapGetters(['showNav','showTop','getSelfsculpture',"showSelfCenter","getUserInfo","getMusic"])
      }
    }
</script>

<style scoped>
  #App{

    width:100%;
    height:100%;
  }
.HomePage_warpper{
  width:100%;
  height:100%;
  background:#fafafa;
}
  .listen_btn{
    width: 90%;
    height:5em;
    margin-left:1.5em;
    margin-top:6em;
  }
  .listen_img{
    display:inline-block;
    vertical-align: center;
  }
  h3{
    font-family: "宋体";
  }
  .new_listen{

    float:left;
  }
  .listen_img{
    float:right;
  }
  .word_btn{
    width: 90%;
    height:5em;
    margin-left:1.5em;
    margin-top:8em;
  }

</style>
