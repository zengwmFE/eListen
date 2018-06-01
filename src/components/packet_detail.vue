<template>
  <div id="new">
    <div class="newCapter" v-if="!showpacket">
      <div></div>
      <div class="newCapter_header">
        <icon name="angle-left" scale="1" @click.native="header_back" class="left_icon"> </icon>
        <div class="header_title">我的收藏</div>
      </div>

      <div class="Capter_item">
        <div class="Capter_container"
             v-for="collect in collections"
             :class="{'Capter_container_active':false}"
             @touchmove="ShowLost(collect.CapterCategory,$event)"
             @touchstart="setLocation"
            v-if="collections.indexOf(collect)>=0"
        >
          <!--英语数据内容-->
          <div >
            <div class="item" @click="showChapterDetail(collect.CapterCategory)">
              <div class="item_img"><img :src="collect.CapterpicAddress" alt=""></div>
            <div></div>
              <div class="item_message">
                <p>{{collect.CapterCategory}}</p>
                <p>{{collect.CapterLevel}}</p>

              </div>
            </div>
          </div>
          <div class="ComeToLost"
               v-if="ComeToLost===collect.CapterCategory"
                @click="ComeToDis(collect.CapterCategory)"
          ></div>
        </div>
        <div class="" v-if="collections.length===0">你没有收藏的内容,请先去收藏</div>
      </div>

    </div>
    <listen-detail v-if="showpacket" @returnpacket="hideDetail"></listen-detail>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import listenDetail from "@/components/listenDetail"
    export default {
        name: "packet_detail",
       data(){
        return {
          showpacket:false,
          collections:[],
          ComeToLost:"",
          pageX:"",
          startX:""
        }
      },
        methods:{
          header_back(){
            this.$store.dispatch("showNav");
            this.$store.dispatch("showTop");
            this.$emit("returnword");
          },
          showChapterDetail(category){
            this. showpacket = true;
            this.$store.dispatch("setCategory",category);
          },
          showChapter(){},
          hideDetail(){
            this. showpacket = false;
          },
          ShowLost(category,ev){

            this.pageX = ev.touches[0].pageX;

            if(this.pageX-this.startX>0){

              this.ComeToLost = "";
            }
            else if(this.pageX-this.startX<0){
              this.ComeToLost = category;
            }
          },
          setLocation(ev){
            this.startX = ev.touches[0].pageX;
          },
          ComeToDis(category){
            var userInfo = this.$store.getters.getUserInfo;
            var _this = this;
            for(var i in _this.collections){
              if(_this.collections[i].CapterCategory===category){
               _this.collections.splice(i,1);

              }
            }
            userInfo.collections.splice(userInfo.collections.indexOf(category),1);
           /*_this.collections.splice(_this.collections);*/
            _this.$http.post("/api/loseItem/",{userInfo:JSON.stringify(userInfo),category:category}).then(function(){
                _this.$store.dispatch("setUserInfo",userInfo);
                localStorage.setItem("userInfo",JSON.stringify(userInfo));
            });

          }

        },
      computed:{
        ...mapGetters(['showNav','showTop','getSelfsculpture',"showSelfCenter","getUserInfo"])
      },
      created(){
          var _this = this;
          var userInfo = _this.$store.getters.getUserInfo;
          _this.$http.post("/api/chapter",{userInfo:JSON.stringify(userInfo)}).then(function(data){
          if(data.data.length>0){
                   _this.collections = data.data.slice(0);
            }
          });

      },
      components:{
        listenDetail
      }
    }
</script>

<style scoped>
  #new{
    width:100%;
    height:100%;
  }
  .newCapter{
    width:100%;
    height:100%;
    overflow: scroll;
    overflow-x: hidden;
  }
  .newCapter_header{
    width:100%;
    height:4em;
    background:#fff;
    border-bottom:1px solid #dbdbdb;
    position:fixed;

  }
  .header_title{
    text-align: center;
    line-height:1em;
    font-size:18px;
  }
  .left_icon{
    position:relative;
    top:1.5em;
    left:1em;
    cursor:pointer;
  }
  .Capter_item{
    width:100%;
    height:100%;
    padding-top:6em;
    background:#fafafa;
    cursor: pointer;
  }
  .Capter_container{
      width:100%;
      float:left;
  }
  .Capter_container_active{
    margin-left:-5%;
    float:left;
  }
  .ComeToLost{
    float:left;
    width:15%;
    height:45px;
    background:url("../../static/ComeToLose.jpg")no-repeat;
    margin-top:1em;
    border-left:1px solid #ececec;
  }
  .item{
    width:75%;
    height:6em;
    margin-left:2.5em;
    border-bottom:1px solid #ececec;
    float:left;

  }
  .item_img{
    width:3.5em;
    height:5em;
    float:left;
    background:red;
    margin-top:0.5em;
  }
  .item_message{
    margin-top:1em;
    float:left;
    margin-left:2em;
  }
  .item_get{
    width:2.5em;
    height:1.5em;
    float:left;
    margin:1.7em 3em;
  }
  .get_Button{
    display:block;
    width:3em;
    height:2em;
    background:#2196F3;
    text-align:center;
    color:#fff;
    font-size:14px;

    -webkit-border-radius: 1em;
    -moz-border-radius: 1em;
    border-radius: 1em;
    line-height: 2em;
    vertical-align: center;
  }
  .get_Button_active{
    background:#fff;
    color:#2196F3;
    border:1px solid #2196F3  ;
    display:block;
    width:3em;
    height:2em;

    text-align:center;

    font-size:14px;

    -webkit-border-radius: 1em;
    -moz-border-radius: 1em;
    border-radius: 1em;
    line-height: 2em;
    vertical-align: center;
  }
</style>
