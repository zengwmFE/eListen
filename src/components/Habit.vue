<template>
    <div class="HabitContainer" @click="closeContanier">
      <div class="seachItem"><mu-text-field
        label="输入查找的信息" labelFloat
        @change.native="inputCategory"
        @focus = "inputCategory"
        v-model="SearchValue"/><br/>
        <input type="hidden"></div>
      <div class="ItemContainer" v-if="showItemContainer">
            <div class="ItemList" v-if="context.length>0">
              <div class="item"  v-for="context in context" @click="showItem(context.CapterCategory)">
                <div class="CapterpicAddress"><img :src="context.CapterpicAddress" alt=""></div>
                <div class="CapterCategory">{{context.CapterCategory}}</div>
              </div>
            </div>
        <div class="ItemList" v-if="context.length<=0">
            没有记录
        </div>
      </div>




      <div class="ItemShow">
       <div v-if="really.length>0" class="showContainerItem">
         <div class="showCapter" v-for="really in really" @click="WantToClick(really.CpAddress,really.CapterCategory)">
           <span class="item_name"><icon name="music" scale="1"/> <span>{{really.Cpname}}</span></span>
           <span class="item_time"><icon name="clock" scale="1"/> <span>{{really.CpTime}}</span></span>
         </div>
       </div>
      </div>
      <audio >
        <source  :src="PlayMusic.music" type="audio/mp3">
      </audio>
    </div>

</template>

<script>
    export default {
        name: "habit",
        data(){
          return{
            showItemContainer:false,
            SearchValue:"",
            context:[],
            reallycontext:[],
            really:[],
            PlayMusic:{
              music:""
            }
          }
        },
      methods:{
        inputCategory(){
          if(this.SearchValue){
            var _this = this;
            _this.$http.post("/api/chapter/getList",{SearchValue:this.SearchValue}).then(function(data){
              _this.context = data.data.slice(0);
              _this.reallycontext = data.data.slice(0);
              for (var i=_this.context.length-1; i>=0; i--)
              {
                var targetNode = _this.context[i];
                for (var j=0; j<i; j++)
                {
                  if(targetNode.CapterCategory === _this.context[j].CapterCategory){
                    _this.context.splice(i,1);
                    break;
                  }
                }
              }
              console.log( _this.context);
              _this.showItemContainer = true;
            });
          }
        },
        closeContanier(ev){
         console.log(ev.target.className);
          if(ev.target.className!=="showItemContainer"||ev.target.className!=="ItemShow"){
            if(this.showItemContainer === true){
              this.showItemContainer = false;
            }
          }
        },
        showItem(){
          this.really = this.reallycontext;

        },
        WantToClick(address,category){
          var userInfo = this.$store.getters.getUserInfo;
          var collections =  this.$store.getters.getUserInfo.collections;
          if(collections.indexOf(category)<0){
            collections.push(category);

            var _this = this;
            _this.$http.post("/api/catchItem",{userInfo:JSON.stringify(userInfo),category:category}).then(function(context){
              localStorage.setItem("userInfo",JSON.stringify(userInfo));
              _this.$store.dispatch("setUserInfo",userInfo);

            });
            this.$set(this.PlayMusic,"music",address);
            var audio = document.querySelector("audio");
            audio.load();
            audio.play();
          }
         else{
            var audio = document.querySelector("audio");
            this.$set(this.PlayMusic,"music",address);
            audio.load();
            audio.play();
          }

        }
      }
    }
</script>

<style scoped>
.HabitContainer{
  width:100%;
  height:100%;
}
  .seachItem{
    float:left;
    margin: 0 15%;
  }
  .ItemContainer{
    width:70%;
    height:50%;
    position:absolute;
    top:20%;
    left:15%;
    border-left:1px solid #ececec;
    box-shadow:2px 2px 2px;
    overflow: scroll;
    background:#fff;
  }
  img{
    display: inline-block;
    vertical-align: middle;
  }
  .item{
    height:30%;
    padding:5%;
  }
  .ItemList{
    height:100%;
  }
  .CapterpicAddress{
    float:left;
  }
  .CapterCategory{
    float:left;
    margin-left:10%;
    margin-top:10%;
  }
  .ItemShow{
    float:left;
    width:100%;
    height:68%; border-top:1px solid #ececec;

  }
  .showCapter{
    width:100%;
    height:15%;
    border-bottom:1px solid #ececec;
    padding-left:20%;
    padding-top:5%;
  }
  .showContainerItem{
    width:100%;
    height:90%;
    overflow: scroll;
  }
</style>
