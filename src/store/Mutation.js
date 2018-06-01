import getters from "./getters.js";
var state = {
  isNavShow:false,
  isTopShow:false,
  self_sculpture:"../../../static/my.jpg",
  isSelfCenterShow:false,
  isChangeShow:false,
  userInfo:{},
  category:"",
  musicPlay:"",
  musicTime:"",
  Mp3Category:"",
  bottomActive:"home"

};
var mutations = {
  showNav(state){
      state.isNavShow = true;
  },
  hideNav(state){
    state.isNavShow = false;
  },
  showTop(state){
    state.isTopShow = true;
  },
  hideTop(state){
    state.isTopShow = false;
  },
  showSelfCenter(state){
    state.isSelfCenterShow = true;
  },
  hideSelfCenter(state){
    state.isSelfCenterShow = false;
  },
  setUserInfo(state,userInfo){
    state.userInfo = userInfo;

  },
  showUserChange(state){
    state.isChangeShow = true;
  },
  hideUserChange(state){
    state.isChangeShow = false;
  },
  setCategory(state,category){
    state.category = category;
  },
  setMusicPlay(state,music){
    state.musicPlay = music;
  },
  setMusicTime(state,time){
    state.musicTime = time;
  },
  setMp3Category(state,category){
    state.Mp3Category = category;
  },
  setBottomActive(state,bottomActive){
    state.bottomActive = bottomActive;
  }
};

export default {
  state,
  mutations,
  getters
}
