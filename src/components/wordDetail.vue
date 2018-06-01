<template>
    <div class="word_container">
      <header>
        <icon name="angle-left" scale="1" @click.native="header_back" class="left_icon"> </icon>
        <span>词汇本</span>
      </header>
      <div class="word_list" v-if="context.length>0">
         <div class="list_item" ref="list_item1"
              v-for="context in context"
              @click.stop="wordToPlay(context.WordSong,$event)"
              v-if="wordCollections.indexOf(context._id) >=0"
              @touchstart.stop="toustart"
              @touchmove.stop="showThis(context._id,$event)"
              >
           <span >{{context.WordToCh}}</span>
           <span class="icon"
                 v-if="showcoin===context._id"
           >
           <icon name="times-circle" scale="1" class="remove"

                       @click.native="lostWords(context._id)" ref=""
           ></icon></span>
         </div>

      </div>
      <div v-if="context.length===0">你没有收藏单词</div>
      <audio >
        <source :src="Playword.word" type="">
      </audio>
    </div>
</template>

<script>
    export default {
        name: "word-detail",
      data(){
          return {
            close:true,
            context:[],
            Playword:{
              word:""
            },
            wordCollections:[],
            showcoin:false,
            startX:"",
            startY:''
          }
      },
      methods:{
        header_back(){
          this.$store.dispatch("showNav");
          this.$store.dispatch("showTop");
          this.$emit("returnword");
        },
        wordToPlay(word,ev){
         if(ev.target.className==="list_item"){
           this.$set(this.Playword,"word",word);
           var audio = document.querySelector("audio");
           audio.load();
           audio.play();
         }
          ev.preventDefault();

        },
        lostWords(id){
          var userInfo = this.$store.getters.getUserInfo;
          var _this = this;
          _this.wordCollections = userInfo.wordCollections;
          if (_this.wordCollections.indexOf(id) >=0) {
            var index = _this.wordCollections.indexOf(id);
            _this.wordCollections.splice(index,1);
            userInfo.wordCollections = _this.wordCollections;
            console.log(userInfo.wordCollections);
            _this.catech = true;
            _this.$http.post("/api/catchWords/", {userInfo: JSON.stringify(userInfo)}).then(function (context) {
              console.log(userInfo);
              _this.$store.dispatch("setUserInfo", userInfo);
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
            });
          }
        },
        toustart(ev){
          this.startX = ev.touches[0].pageX;
        },
        showThis(id,ev){
          var y = ev.touches[0].pageX;
          console.log(this.startX);
         if(y-this.startX>0){
          this.showcoin = "";

        }
        else if(y-this.startX<0){
          this.showcoin = id;

          }
        }

      },
      created(){
        var _this = this;
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var wordsCollections = userInfo.wordCollections;
        _this.wordCollections =  userInfo.wordCollections;
        console.log(wordsCollections);
        _this.$http.post("/api/catchWords/get",{wordsCollections:wordsCollections.toString()}).then(function(context){
          _this.context = context.data;
          console.log(context);
        });
      },
      mounted(){
        var _this = this;
        var list_item = _this.$refs;
        console.log(list_item);
      },
      watch:{
        Playword:{
          handler() {
            var _this = this;

          },
          deep:true
        }
      }
    }
</script>

<style scoped>
  .word_container{
    width:100%;
    height:100%;
    background:#ececec;
  }
  header{
    color:#fff;
  }
  .left_icon{
    margin-top:1.5em;
    margin-left:1em;

  }
  header>span{
    display:inline-block;
    margin-left:35%;
    margin-top:1em;
    font-size:18px;
  }
  .word_list{
    float:left;
    width:100%;
    height:85%;
    margin-top:3em;
    background:#fff;
    padding:0 7%;
    overflow: scroll;
  }
  .list_item{

      width:100%;
      height:3em;
      border-bottom:1px solid #ececec;
    margin-top:2em;
    padding-left:20%;
    line-height:3em;
  }
  .remove{
    color:red;
    display: inline-block;
    vertical-align: middle;
    margin-left:40%;
  }
  .icon{
    display:inline-block;
    width:30%;
    height:100%;
    background:#fff;
    float:right;
    margin-right:10%;
  }
</style>
