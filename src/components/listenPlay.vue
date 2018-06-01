<template>
  <!--全屏显示听力细节-->
   <div class="play-container">
     <div class="play-header" @click="touchClose">
              <div class="playTop">
                <icon name="angle-down" scale="1" class="down_icon" @click.native="listen_back"> </icon>
                <icon name="align-justify" scale="1" class="align-justify" @click.native="showList"></icon><!--展现出所有的MP3的列表，供客户选择-->
              </div>
       <div class="file-list">
         <p v-for="list in file">
           {{list}}
         </p>
       </div>
     </div>
     <transition name="slide-fade">
       <div class="mp3-list" v-if="showList1">
         <ul>
           <li v-for="(context,index) in context"
               @click="chooseToPlay(context.CpAddress,context.Cpname,context._id)"
                :class="{'play-active':isPlaying===context.Cpname}"
           ><span>{{index+1}}</span><span>{{context.Cpname}}</span></li>
         </ul>
       </div>
     </transition>
   </div>
</template>

<script>
  import {mapGetters} from "vuex";
  export default {
    name: "listen-detail",
    data(){
      return {
        imgUrl:'../../static/page_listen.jpg',
        context:"",
        playAddress:{
          address:""
        },
        value:50,
        size:3,
        played:true,
        playTime:{
          time:"00:00"
        },
        nowTime:"00:00",/*当前时间*/
        timer:"",
        showListenPlay:false,
        showList1:false,
        isPlaying:"",
        file:[],
        isID:""
      }
    },
    methods:{
      listen_back(){
        this.$emit("PlayBack");
      },
      showList(){
        var _this = this;
        this.showList1 = !this.showList1;
        console.log(this.$store.getters.getMp3Category);
        this.$http.post("/api/chapter/get",{category:this.$store.getters.getMp3Category}).then(function(context){

            _this.context = context.data.context;

        });
      },
      touchClose(ev){
       if(ev.target.className==='play-header'){
        this.showList1 = false;}
      },
      chooseToPlay(address,name,id){
        this.$emit("chooseToplay",address);
        this.isPlaying = name;
        //猜想一:是否需要访问后端进行获取词列表
        var _this = this;
        this.isID = id;
        _this.$http.post("/api/getItem/",{id:id}).then(function(data){
          if(data.data){
            _this.file = data.data.file;
            _this.isPlaying = data.data.context.Cpname;
          }else{
            _this.context = {};
          }
        });
      }

    },
    computed:{
      ...mapGetters(['getCategory','getMusic'])
    },
    watch:{
    },
    mounted(){
     /* var audio = document.querySelector("audio");
      var _this = this;
      console.log(123);
      clearInterval(_this.timer);
      audio.addEventListener("play",()=>{
        _this.timer = setInterval(() => {
          if(!isNaN(audio.duration)&&!isNaN(audio.currentTime)) {
            _this.nowTime = this.FormatTime(audio.currentTime);
            let progressBar = this.$refs.processBar;
            if(progressBar) {
              progressBar.style.width = (audio.currentTime / audio.duration).toFixed(2) * 100 + "%";//播放暂停播放退出之后报错。
              if (audio.duration - audio.currentTime < 1) {
                progressBar.style.width = "100%";
              }
            }
          }
        }, 1000);
      });*/
    },
    created(){
      console.log(this.$store.getters.getMusic);//我在这里拿到了id,和currentTime，这里将所有的内容获取。
      var _this = this;
      _this.$http.post("/api/getItem/",{id:_this.$store.getters.getMusic}).then(function(data){
        console.log(data);
        if(data.data){
          _this.context = data.data.context;//得到此时播放的所有内容
          _this.file = data.data.file;
          console.log(_this.file);
          _this.isPlaying = _this.context.Cpname;
        }else{
          _this.context = {};
        }
      });
    },
    components:{
    }
  }
</script>

<style scoped>
  /*歌词配置*/
  .play-container{
    width:100%;
    height:100%;

  }
  .play-header{
    width:100%;
    height:100%;
    background:url("../../static/play_detail.jpg") no-repeat;
  }
  .controls span:first-child{
    margin-right:10px;
  }

  .align-justify{
    float:right;
    margin-right:1.5em;
    margin-top:1em;
  }
  .down_icon{
    margin-left:1.5em;
    margin-top:1em;
  }
  .mp3-list{
    width:50%;
    height:20em;
    position:fixed;
    top:2em;
    right:1.5em;
    overflow-y: scroll;
    border:1px solid #ececec;
    background:url("../../static/list.jpg");
    border-radius:1em;
    padding-left:2em;
    padding-top:1em;
    box-shadow: 2px 2px 5px #888888;
  }
  .mp3-list>ul{
    list-style: none;
  }
  .mp3-list>ul>li{
    display:block;
    border-bottom:1px solid #999;
    margin-top:1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .mp3-list>ul>li>span{
    margin-left:1em;

  }
  .play-active{
    color:#2196F3;
   }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .file-list{
    margin-left:22%;
    margin-top:10%;
    color:#1a237e;
    overflow: scroll;
    width:60%;
    height:50%;
  }
</style>
