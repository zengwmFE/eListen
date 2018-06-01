<template>
    <div id="new">
      <div class="newCapter" v-if="!showChapter">
        <div></div>
        <div class="newCapter_header">
          <icon name="angle-left" scale="1" @click.native="header_back" class="left_icon"> </icon>
          <div class="header_title">学习新文章</div>
        </div>

        <div class="Capter_item">
          <div class="Capter_container">
            <!--数据内容-->
            <div  v-for="(context,index) in data1.context">
              <div class="item" @click="showChapterDetail(context.CapterCategory)">
                <div class="item_img"><img :src="context.CapterpicAddress" alt=""></div>

                <div class="item_message">
                  <p>{{context.CapterCategory}}</p>
                  <p>{{context.CapterLevel}}</p>
                </div>
                <div class="item_get">
                  <a href="javascript:void(0);"
                     @click.stop="CatchItem(context.CapterCategory)"
                     :class="{get_Button:hasCollection,get_Button_active:!hasCollection}"
                     v-if="collections.indexOf(context.CapterCategory)<0"
                  >订阅</a>
                  <a href="javascript:void(0);"
                     @click.stop="LoseItem(context.CapterCategory)"
                     :class="{get_Button:!hasCollection,get_Button_active:hasCollection}"
                     v-if="collections.indexOf(context.CapterCategory)>=0"

                  >已订</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <chapter-detail v-if="showChapter" @returnChapter="hideDetail"></chapter-detail>
    </div>

</template>

<script>
  import chapterDetail from "@/components/ChapterDetail";
    export default {
        name: "new-capter",
      data(){
          return {
              showChapter:false,
              indexOf:false,
              Button_active:true,
              collections:[],
              data1:"",
              hasCollection:true
          }
      },
      methods:{
        header_back(){
          this.$store.dispatch("showNav");
          this.$store.dispatch("showTop");
          this.$emit("ChapterExit");
        },
        showChapterDetail(Category){
          console.log(Category);
          this.$store.dispatch("setCategory",Category);
          this.showChapter = true;
        },
        hideDetail(){
          this.showChapter = false;
        },
        CatchItem(category,index){
        //1.设置按钮的样式，将按钮的样式同步改成getButton_active
            var _this = this;
            _this.$set(_this.collections,_this.collections.length,category);
             var userInfo = _this.$store.getters.getUserInfo;
            _this.$http.post("/api/catchItem",{category:category,userInfo:JSON.stringify(userInfo)})
           .then(function(context){
            if(context.data.code===200){
              var userInfo = context.data.context;
              _this.$store.dispatch("setUserInfo",userInfo);
              window.localStorage.setItem("userInfo",JSON.stringify(userInfo));
            }else{
              console.log("该项已经收藏");
            }
            });
        },
        LoseItem(category){
          //取消订阅
          var _this = this;
          var index = _this.collections.indexOf(category);
          console.log(category);
          _this.$delete(_this.collections,index);

          var userInfo = _this.$store.getters.getUserInfo;
          _this.$http.post("/api/loseItem",{category:category,userInfo:JSON.stringify(userInfo)})
            .then(function(context){
              if(context.data.code===200){
                var userInfo = context.data.context;
                _this.$store.dispatch("setUserInfo",userInfo);
                window.localStorage.setItem("userInfo",JSON.stringify(userInfo));
              }else{
                console.log("该项已经收藏");
              }
            });

        }
      },
      created(){
            var _this = this;
            _this.$http.post("/api/userInfo/",{userInfo:JSON.stringify(_this.$store.getters.getUserInfo)}).then(function(context){
              if(context.data.code===200){
                var userInfo = context.data.context;
                _this.$store.dispatch("setUserInfo",userInfo);
                window.localStorage.setItem("userInfo",JSON.stringify(userInfo));
                //收藏的类别,collections 为数组
                _this.collections = _this.$store.getters.getUserInfo.collections;
              }
              else{
                console.log("错误");
              }


            });

      },
      components:{
        chapterDetail
          },
      mounted(){
          var _this = this;
          _this.$http.get("/api/chapter/").then(function(context){
            //所有类
          _this.data1 = context.data;
        });
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
    background:#fff;
    height:100%;
  }
  .item{
    width:90%;
    height:6em;
    margin-left:2.5em;
    border-bottom:1px solid #ececec;
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
