<template>
<div class="chapter-container" ref="container">
  <!--听力总场及听力直接播放-->
  <div id="chapter_detail">
   <div  v-if="!showListenPlay">
     <div class="detail_header">
       <div class="header_code"> <icon name="angle-left" scale="1" @click.native="header_back" class="left_icon"> </icon></div>
       <div class="header_message">
         <div class="message_img">
           <img :src="imgUrl" alt="">
         </div>
         <div class="message_content">
           <p v-html="getCategory"></p>
           <p>{{context.length}}<span>篇</span></p>
         </div>
       </div>
     </div>
     <div class="detail_content">
       <div class="detail_Item" v-for="context in context"
            @click="wantToPlay(context.CpAddress,context.CpTime,context._id,context.CapterCategory,$event)">
        <div class="item">
          <span class="item_name" ><icon name="music" scale="1"/> <span>{{context.Cpname}}</span></span>
          <span class="item_time"><icon name="clock" scale="1"/> <span>{{context.CpTime}}</span></span>
        </div>
       <div class="icon"><span v-if="context.CpAddress===playAddress.address" class="gificon"></span></div>
        <!-- <div class="download">
           <span><icon name="download" scale="1" @click.native.stop="download(context.CpAddress)"></icon></span>
         </div>-->
       </div>
     </div>
   </div>



    <transition name="slide-fade">
      <listen-play v-if="showListenPlay" @PlayBack="playBack" @chooseToplay = "getChoose"></listen-play>
    </transition>
    <footer :class="{'audio_place':isFooter}">
      <audio>
        <source  ref="audios" :src="playAddress.address" type="audio/mp3" >
        您的浏览器不支持 audio 元素。
      </audio>
      <div class="pgs" @click="changeTime"  @touchstart="ChangePosition" ref="pgs">
        <div class="pgs-play" id="progress" ref="processBar"></div>
      </div>



      <div class="controls">
        <div class="img_listen" @click="showDetail(context.Cpname)" v-if="!isFooter"></div>
        <div class="con_listen" :class="{'con_listen-active':isFooter}"><span class="played-time" ref="processTime">{{nowTime}}</span>
          <button class="play-pause" :class="{'play-pause-active':isFooter}" id="playstart" @click="startOrPause">
            <span :class="{'icon-play':!played,'icon-pause':played}" v-if="!isFooter"></span><!--小屏播放以及暂停-->
            <span
              :class="{'icon-play-active':!played,'icon-pause-active':played,'play-width-active':isFooter}"
              v-if="isFooter"></span><!--小屏播放以及暂停-->
          </button>
          <span class="audio-time" id="audioTime">{{playTime.time}}</span></div>
        <span class="select" v-if="select==='share'" ><icon name="share" scale="1" @click.native="showSelect" :class="{'active':select==='share'}"></icon></span><!--单播-->
          <span class="select" v-if="select==='retweet'"><icon name="retweet" scale="1" @click.native="showSelect" :class="{'active':select==='retweet'}"></icon></span><!--循环播-->
        <span class="select"v-if="select==='random'" ><icon name="random" scale="1" @click.native="showSelect" :class="{'active':select==='random'}"></icon></span><!--列表播-->
        <div class="selectList" v-if="showList">
          <span class="select"><icon name="share" scale="1" @click.native="changeshare"></icon></span><!--单播-->
          <span class="select"><icon name="retweet" scale="1" @click.native="changeretweet"></icon></span><!--循环播-->
          <span class="select" ><icon name="random" scale="1" @click.native="changerandom"></icon></span><!--列表播-->
        </div>
      </div>
    </footer>
  </div >

</div>
</template>

<script>
  import {mapGetters} from "vuex";
  import listenPlay from "@/components/listenPlay";
    export default {
        name: "listen-detail",
      data(){
          return {
            imgUrl:'../../static/page_listen.jpg',
            context:[],
            playAddress:{
              address:""
            },
            value:50,
            size:3,
            played:true,
            playTime:{
              time:"00:00"
            },
            musicName:"",
            category:"",
            nowTime:"00:00",/*当前时间*/
            timer:"",
            showListenPlay:false,
            isFooter:false,
            round:false,
            select:"share",
            showList:false,
            list:false
          }
      },
      methods:{
        playBack(){
          var audio = document.querySelector("audio");
          this.showListenPlay = false;
          this.isFooter = !this.isFooter;
        },
        header_back(){
          this.$emit("returnpacket");
          clearInterval( this.timer);
          },
        getChoose(address){

          this.$set(this.playAddress,"address",address);//触发play事件
        },
        wantToPlay(address,time,name,category,ev){
          var _this = this;
          console.log(ev.touches);
          var audio = document.querySelector("audio");
          _this.musicName = name;
          _this.category = category;
          _this.$set(_this.playTime,"time",time);

          if(!audio.paused){
            _this.played = true;
            audio.pause();
          }
          else{
            if(this.playAddress.address){
              _this.played = false;
              audio.play();
            }
            else{
              _this.played = false;
              audio.load();
              audio.play();
            }
            if(audio.duration - audio.currentTime < 1){
              audio.currentTime = 0;
              audio.load();
              audio.play();
            }
          }
        this.$set(this.playAddress,"address",address);
        },
        startOrPause(){
          var _this = this;
          var audio = document.querySelector("audio");
          console.log(audio.paused);
          if(audio.paused){
            _this.played = false;
            this.$nextTick(function(){
              _this.played = false;
              audio.play();
            });
          }
          else{
            this.$nextTick(function(){
              _this.played = true;
              audio.pause();
            });
          }
          if(audio.duration - audio.currentTime < 1){
            console.log(123);
            audio.currentTime = 0;
            audio.load();
            audio.play();
          }

        },
        changeTime(event){
          /*更改播放条位置,改变播放时间x*/
         if(this.playAddress.address){
           let progressBar = this.$refs.processBar;
           let cordStart = progressBar.getBoundingClientRect().left;//整个播放条离容器的距离
           let cordEnd = event.pageX;//得到手势按下去的操作，并取第一点为取点。
           var audio = document.querySelector("audio");
           var width = this.$refs.pgs.offsetWidth;
           audio.currentTime = ((cordEnd - cordStart)/width)*audio.duration;
           progressBar.style.width= ((cordEnd-cordStart)/width).toFixed(3)*100+"%";
           this.played = false;
           audio.play();
           event.stopPropagation();
         }
         else{
           return ;
         }
        },
        ChangePosition(event){
          /*更改播放条位置*/
          let progressBar = this.$refs.processBar;
          let cordStart = progressBar.getBoundingClientRect().left;//整个播放条离容器的距离
          let cordEnd = event.touches[0].pageX;//得到手势按下去的操作，并取第一点为取点。
          let pgs = this.$refs.pgs.offsetWidth;
          progressBar.style.width= ((cordEnd-cordStart)/pgs).toFixed(3)*100+"%";
          event.stopPropagation();
        },
        FormatTime(time){
          var m = 0;
          var s = 0;
          time = Math.ceil(time);
          m = Math.floor(time/60);
          m = m.toString().length>1?m:'0'+m;
          s = Math.floor(time-m*60);
          s = s.toString().length>1?s:'0'+(s);
          return m+":"+s;
        },
        FormatAllTime(time){
          var m = 0;
          var s = 0;
          time = Math.floor(time);
          m = Math.floor(time/60);
          m = m.toString().length>1?m:'0'+m;
          s = Math.floor(time-m*60);
          s = s.toString().length>1?s:'0'+(s);
          return m+":"+s;
        }
        ,
        showDetail(){
          if(this.musicName) {
            var audio = document.querySelector("audio");
            this.played = false;
            audio.play();
            this.showListenPlay = !this.showListenPlay;
            this.isFooter = !this.isFooter;
            //需要的内容为MP3的信息，以及MP3的播放时间。
            var audio = document.querySelector("audio");
            let currentTime = audio.currentTime;
            console.log(this.musicName);
            /*this.playAddress.address;*/
            this.$store.dispatch("setMusicPlay", this.musicName);//存储MP3的ID，以便传递；
            this.$store.dispatch("setMusicTime", currentTime);
            this.$store.dispatch("setMp3Category",this.category);
          }
        },
        download(address){
       /*   console.log("haha");
          var form = document.createElement("form");
          form.setAttribute("style","display:none");
          form.setAttribute("target","");
          form.setAttribute("method","POST");
          form.setAttribute("action",address);
          var input1 = document.createElement("input");
          input1.setAttribute("type","hiden");
          input1.setAttribute("value","");
          form.appendChild(input1);
;          document.querySelector(".chapter-container").appendChild(form);
          form.submit();*/
         /*window.open(escape(address))*/
        },
        changeshare(){//单播放
            this.select = 'share';
          this.showList = false;
          this.round = false;
          this.list = false;
        },
        changeretweet(){//循环播放
          this.select = 'retweet';
          this.showList = false;
          this.round = true;
          this.list = false;
        },
        changerandom(){//列表播放
          console.log(this.playAddress);
          this.select = 'random';
          this.showList = false;
          this.list=true;
          this.round = false;
        },
        showSelect(){
          console.log(13);
          this.showList = !this.showList;
        }
      },
      computed:{
        ...mapGetters(['getCategory','getMusic'])
      },
      created(){
          var _this = this;
        _this.$http.post("/api/chapter/get",{category:_this.$store.getters.getCategory}).then(function(data){
          if(data.data.context.length>0){
          _this.context = data.data.context;
          }else{
            _this.context = [];
          }
        });
      },
      watch:{
        playAddress:{
          handler() {
            var _this = this;
               var audio = document.querySelector("audio");
               _this.played = false;
               audio.load();
               audio.play();
          },
          deep:true
        },
        round:{
          handler() {
            var _this = this;
            var audio = document.querySelector("audio");
            audio.load();
            audio.play();
          }
        }
      },
      mounted(){
        var audio = document.querySelector("audio");
        var _this = this;

        clearInterval(_this.timer);
          audio.addEventListener("play",()=>{
            _this.timer = setInterval(() => {
              if(!isNaN(audio.duration)&&!isNaN(audio.currentTime)) {
                _this.nowTime = this.FormatTime(audio.currentTime);
                _this.$set(_this.playTime,"time",this.FormatAllTime(audio.duration));
                let progressBar = this.$refs.processBar;
               if(progressBar) {
                 progressBar.style.width = (audio.currentTime / audio.duration).toFixed(2) * 100 + "%";//播放暂停播放退出之后报错。
                 if (audio.duration - audio.currentTime < 1) {
                   progressBar.style.width = "100%";
                   _this.played = true;
                   if(_this.list===true){
                     var music = _this.playAddress.address;
                    console.log(_this.context);
                    var index = 0;
                     for(var i in _this.context ){

                       if(_this.context[i].CpAddress===music){
                            index = i;
                       }
                     }
                     index++;
                     console.log(_this.context[index]);
                     if( _this.context[index]){
                       _this.$set(this.playAddress,"address",_this.context[index].CpAddress);
                       console.log("hah");
                       _this.musicName = _this.context[index]._id;
                       _this.category = _this.context[index].CapterCategory;
                       console.log(this.playAddress);
                     }
                   }
                   clearInterval(_this.timer);
                   if(_this.round===true){
                     console.log(_this.played);
                     _this.played = false;
                     audio.load();
                     audio.play();
                   }
                   //能拿到正在播放的地址
                 }
               }
              }
            }, 1000);

          });
      },
      components:{
        listenPlay
      }
    }
</script>

<style scoped>
  .chapter-container{
    width:100%;
    height:100%;
  }
  #chapter_detail{
    width:100%;
    height:100%;
  }
  .detail_header{
    width:100%;
    height:10em;
    background:#2196F3;
    border-bottom:1px solid #b0bec5;
    position:fixed;
  }
  .header_code{
    width:100%;
    height:2em;
    float:left;
  }
  .header_message{
    width:100%;
    height:8em;
    float:left;
    cursor:pointer;
  }
  .message_img{
    width:40%;
    height:100%;
    float:left;
  }
  .message_img>img{
    display: block;
    margin:1em 0 0 3em;
  }
  .message_content{
    float:left;
  }
  .left_icon{
    color:#fff;
    margin:1em 0 0 1em;
  }
  .message_content{
    color:#fff;
    margin-top:1em;
  }
  .message_content>a{
    color:#fff;
    display: inline-block;
    width:3em;
    height:2em;
    border:1px solid #fff;
    text-align: center;
    line-height: 2em;
    -webkit-border-radius: 1em;
    -moz-border-radius: 1em;
    border-radius: 1em;
  }
  .detail_content{
    padding-top:10em;
    overflow: scroll;
    overflow-x: hidden;
    height:37em;
  }
  .detail_Item{
    height:5.3em;
    border-bottom:1px solid #b0bec5;
    /* line-height:5.3em;*/

  }

  .detail_Item>img{
    display: inline-block;
    vertical-align:middle;
    margin-left:1em;
  }
  .item_name{
    display: inline-block;
    width: 10em;
    margin-top:0.5em;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-left:4em;
    font-size:18px;

  }
  .item_name>span{
    display: inline-block;
    margin-left:1em;
  }
  .item_time{
    display: inline-block;
    margin-top:0.5em;
    vertical-align: center;
    margin-left:5em;
    width: 10em;
  }
  .item_time>span{
    display: inline-block;
    margin-left:1em;
  }
  .item_time>icon{
    color:#ececec;
  }
  footer{
    width:100%;
    height:5em;
    position:fixed;
    bottom:0;
  }
  .pgs{
    width: 326px;
    margin-left:1em;
    background-color: #E3E8EE;
    text-align: center; position: relative;
    overflow: hidden; height: 3px;}
  .pgs-play{position: absolute;
    top:0; left: 0;
    width: 0; height: 100%;
    background-color: #4785f9;
    z-index: 1;}
  .controls{width: 100%; height: 40px; padding: 0; text-align: center; margin-top:1em;}
  .play-pause{
    border: 0;
    outline: 0;
    padding: 0;
    width: 40px;
    height: 40px;
    margin: 0 28px;
    background: none;
    display: inline-block;
    vertical-align: middle;}
  .controls span{color: #b3b5b7; font-size: 12px; display: inline-block; }
  .audio-time{display: inline-block; vertical-align: middle;}
  .play-pause  span{
    width: 34px;height:34px;
  }
  .controls span:first-child{
    margin-right:10px;
  }
  .icon-play{
    border-radius: 50%;
    display: inline-block;
    vertical-align:center;
    background:url("../../static/play.png") no-repeat ;
  }
  .icon-pause{
    border-radius: 50%;
    display: inline-block;
    vertical-align:center;
    background:url("../../static/pause.png") no-repeat ;
  }
  .img_listen{
    width:40px;
    height:40px;
    float:left;
    margin-left:40px;
    background:url("../../static/lin.jpg");
    outline: 1px solid #ececec
  }
  .con_listen{
    float:left;
    margin-left:20px;
  }
  .slide-fade-enter-active {
    transition: all .6s ease;
  }
  .slide-fade-leave-active {
    transition: all .6ms;
  }
  .slide-fade-enter
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(50px);
    opacity: 0;
  }
  .slide-fade-leave-to{
    transform: translateY(0);
    opacity: 0;
  }
/*进入大屏播放后界面设置*/
  .audio_place{/*进入播放大屏 播放器高度设置*/
    position:fixed;
    height:27%;
    width:100%;
    bottom:0;
    background:#f9fbe7;
  }
  .play-width-active{/*播放键位置大小设置*/
    width: 85px!important;
    height:85px!important;
  }
   .icon-play-active{/*播放键设置*/
     border-radius: 50%;
    display: inline-block;
    vertical-align:center;
    background:url("../../static/play1.gif") no-repeat ;
  }
  .icon-pause-active{/*暂停键设置*/
    border-radius: 50%;
    display: inline-block;
    vertical-align:center;
    background:url("../../static/pause1.gif") no-repeat ;
  }
  .con_listen-active{/*播放位置设置*/
    float:left;
    margin-left:20%;
    margin-top:0.8em;
  }
  .play-pause-active{
    border: 0;
    outline: 0;
    padding: 0;
    width: 85px;
    height: 85px;
    margin: 0 28px;
    background: none;
    display: inline-block;
    vertical-align: middle;}
  .gificon{
      display: inline-block;
      width:40px;
       height:36px;
      margin-top:1em;
    background:url("../../static/playing.gif") no-repeat;
  }
  .item{
    float:left;
    width:70%;
  }
  .coin{
       float:left;
     }
  .icon{
    float:left;
  }
.download{
  display: inline-block;
  float:right;
  margin-right:7%;
  margin-top:7%;
  color:#4785f9;
}
  .select{
    display: inline-block;
    margin-top:1em;
    color:#4785f9;
  }
  .selectList>span{
    float:left;
    margin-right:0!important;
    margin-top:2px;
    margin-left:5px;
  }
  .selectList{
    width: 8%;
    height:100%;
    position:absolute;
    top:-3em;
    right:2.5em;
    background:#fff;
    border:1px solid #ececec;
    border-bottom:none;
  }
  .active{
    color:#4785f9;
  }
</style>
