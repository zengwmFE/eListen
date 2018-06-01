<template>
 <div class="words_container" @touchmove="changeWords" ref="words_container">
   <header>
     <icon name="angle-left" scale="1" @click.native="header_back" class="left_icon"> </icon>
     <span>学习新单词</span></header>
      <div class="item_container">
       <div class="words_item">
         <span>{{context.WordToCh}}</span><!--单词名字-->
         <p v-for="come in context.WordToCome" class="adj">{{come}}</p><!--单词翻译-->
        <div class="control"><div class="music"> <icon name="music" scale="1" @click.native="comeToPlay(context.WordSong)" class="music_icon"> </icon></div>
          <div class="changewords">
            <span ref="prev_words" class="prev_words"><icon name="angle-left" scale="1"> </icon></span>
            <span ref="next_words" class="next_words"><icon name="angle-right" scale="1" > </icon></span>
          </div>
          <div class="catch_words">
            <icon name="hand-point-up" scale="1"
                  @click.native="comeToLose(context._id)"
                  :class="{catch_active:!catech,'hand-point-up':catech}"
                  v-if="wordCollections.indexOf(context._id)>=0"
                 >

            </icon><!--收藏了-->
            <icon name="hand-point-up"
                  scale="1" @click.native="comeToCatch(context._id)"
                  :class="{catch_active:catech,'hand-point-up':!catech}"
                  v-if="wordCollections.indexOf(context._id)<0"
            ><!--未收藏-->
            </icon>

          </div>
        </div>
       </div>
        <div class="hide_word" @click="hideClose" v-if="hide">
         <div class="hide_item"> <span>点击查看单词</span>
           <icon name="angle-right" scale="6" class="hidden"> </icon>
         </div>
        </div>
        <audio >
          <source :src="wordSong.song" type="audio/mp3">
          你的浏览器不支持audio元素
        </audio>
      </div>
 </div>
</template>

<script>
    export default {
      name: "new-words",
      data() {
        return {
          context: [],
          startPos: "",
          hide: true,
          wordSong: {
            song: ""
          },
          wordCollections:[],
          catech:false,
        }
      },
      methods: {
        header_back() {
          this.$store.dispatch("showNav");
          this.$store.dispatch("showTop");
          this.$emit("WordsExit");
        },
        changeWords() {

        },
        hideClose() {
          this.hide = false;
        },
        comeToPlay(song) {
          this.$set(this.wordSong, "song", song);
          var audio = document.querySelector("audio");
          audio.load();
          audio.play();
        },
        comeToCatch(id) {
          var userInfo = this.$store.getters.getUserInfo;
          var _this = this;
          if (_this.wordCollections.indexOf(id) < 0) {
            _this.wordCollections.push(id);
            userInfo.wordCollections = _this.wordCollections;
            _this.catech = false;
            _this.$http.post("/api/catchWords/", {userInfo: JSON.stringify(userInfo)}).then(function (context) {

              _this.$store.dispatch("setUserInfo", userInfo);
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
            });
          }
        },
        comeToLose(id){
          var userInfo = this.$store.getters.getUserInfo;
          var _this = this;

          if (_this.wordCollections.indexOf(id) >= 0) {
            _this.wordCollections.splice(_this.wordCollections.indexOf(id,1));
            userInfo.wordCollections = _this.wordCollections;
            _this.catech = false;
            _this.$http.post("/api/catchWords/", {userInfo: JSON.stringify(userInfo)}).then(function (context) {
              _this.$store.dispatch("setUserInfo", userInfo);
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
            });
          }
        }
      },
      created() {
        var _this = this;


        _this.$http.get("/api/words").then(function (context) {

          for (var i in context.data) {
            var WordToCome = context.data[i].WordToCome.split(",");
            context.data[i].WordToCome = WordToCome;
          }
          //浅复制，导致文章会发生改变，使用slice防止后台变量被污染
          var next_words = _this.$refs.next_words;
          var prev_words = _this.$refs.prev_words;
          console.log(context.data.slice(0,1)[0]);
          _this.context = context.data.slice(0,1)[0];
          _this.$set(_this.wordSong, "song", context.data.slice(0,1)[0].WordSong);
          var audio = document.querySelector("audio");
          audio.load();
          audio.play();
          next_words.addEventListener("click", (ev) => {
            console.log(123);
            var myindex = context.data.indexOf(_this.context);
           if(myindex<context.data.length-1){
             console.log(myindex);
             myindex++;
             _this.context = context.data.slice(myindex, myindex+1)[0];
             _this.$set(_this.wordSong, "song", context.data.slice(myindex, myindex+1)[0].WordSong);
             var audio = document.querySelector("audio");
            /* _this.catech = */
             _this.hide = true;
             audio.load();
             audio.play();
           }
          },false);
          prev_words.addEventListener("click", (ev) => {
            var myindex = context.data.indexOf(_this.context);
            if(myindex>0){
              _this.context = context.data.slice(myindex-1, myindex)[0];
              console.log(_this.context);
              _this.$set(_this.wordSong, "song", context.data.slice(myindex-1, myindex)[0].WordSong);
              var audio = document.querySelector("audio");
              _this.hide = true;
              audio.load();
              audio.play();
            }
          },false);
          var userInfo = JSON.parse(localStorage.getItem("userInfo"));
         _this.wordCollections = userInfo.wordCollections;
        });
      },
      watch:{
        wordSong(){
          console.log("改变了");
        }
      }
    }

</script>

<style scoped>
  .words_container{
    width:100%;
    height:100%;
  }
header{
  width:100%;
  height:10%;
  line-height:3em;
  text-align: center;
  font-size:18px;
  color:#fff;
}
  .left_icon{
    float:left;
    margin-left:1.5em;
    margin-top:1em;
  }
  .item_container{
    width:100%;
    height:100%;
    float:left;
  }
  .words_item>span{
    display: block;
    font-weight:bold;
    font-size:18px;
    text-align: center;
  }
  .words_item{
    margin-top:35%;
    margin-left:25%;
    width:50%;
    height:35%;
    box-shadow: 2px 2px 2px 2px #2196F3;
    padding:1em;
  }
  .hide_word{

    width:100%;
    height:50%;
    background:#2196F3;
    position:absolute;
    top:20%;
    left:0;
    padding:20%;
    font-size:24px;
    color:#fff;
    border-top-right-radius: 5em;
    border-bottom-right-radius: 5em;
  }
  .hide_item{
    margin-top:1em;
  }
  .adj{
    font-size:12px;
  }
  .prev_words{
    display:inline-block;

    width:8px;
    height:16px;
  }
  .next_words{
    display:inline-block;
    width:8px;
    height:16px;
    margin-left:20%;
  }
  .changewords{
    width:30%;
    float:left;
    margin-left:20%;
  }
  .music{
    float:left;
  }
  .catch_words{
    margin-left:10%;
    float:left;
  }
  .hidden{
    display: inline-block;
    vertical-align: middle;
  }
  .control{
    margin-top:10%;
  }
  .catch_active{
    color:#2196F3;
  }
</style>
