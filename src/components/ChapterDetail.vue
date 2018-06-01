<template>
    <div id="chapter_detail">
      <div class="detail_header">
          <div class="header_code"> <icon name="angle-left" scale="1" @click.native="header_back" class="left_icon"> </icon></div>
          <div class="header_message">
            <div class="message_img">
              <img :src="imgUrl" alt="">
            </div>
            <div class="message_content">
              <p v-html="getCategory"></p>
              <p>{{context1.length}}&nbsp;<span>篇</span></p>
            </div>
          </div>
      </div>

      <div class="detail_content">
        <div class="detail_Item" v-for="context in context1">

          <span class="item_name"><icon name="music" scale="1"/> <span>{{context.Cpname}}</span></span>
          <span class="item_time"><icon name="clock" scale="1"/> <span>{{context.CpTime}}</span></span>
        </div>
        <div></div>




      </div>
    </div>
</template>

<script>
  import {mapGetters}from "vuex"
    export default {
        name: "chapter-detail",
      data(){
          return {
            imgUrl:'../../static/page_listen.jpg',
            context1:[],
            category:""
          }
      },
      methods:{
        header_back(){
         this.$emit("returnChapter");
        },

      },
      mounted(){
          var _this = this;

          _this.$http.post("/api/chapter/get",{category:_this.$store.getters.getCategory}).then(function(context){
              _this.context1 = context.data.context;
              console.log(_this.context1);
          });
      },
      computed:{
        ...mapGetters(["getCategory"])
      }

    }
</script>

<style scoped>
  #chapter_detail{
    width:100%;
    height:100%;
  }
.detail_header{
  width:100%;
  height:10em;
  background:#2196F3;
  border-bottom:1px solid #ececec;
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
    height:100%;
    padding-top:10em;
    overflow: scroll;
  }
  .detail_Item{
    height:5.3em;
    border-bottom:1px solid #ececec;
   /* line-height:5.3em;*/

  }

  .detail_Item>img{
    display: inline-block;
    vertical-align:middle;
    margin-left:1em;
  }
  .item_name{
    display: block;
    width: 15em;
    margin-top:1em;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-left:6em;
    font-size:18px;
  }
  .item_name>span{
    display: inline-block;
    margin-left:1em;
  }
  .item_time{
    display: block;
    margin-top:0.5em;
    vertical-align: center;
    margin-left:10em;
  }
  .item_time>span{
    display: inline-block;
    margin-left:1em;
  }
  .item_time>icon{
    color:#ececec;
     }
</style>
