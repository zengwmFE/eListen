export default {
  showNav:function(state){
  return state.isNavShow;
  },
  hideNav:function(state){
    return state.isNavShow
  },
  showTop(state){
    return state.isTopShow;
  },
  hideTop(state){
    return state.isTopShow;
  },
  getSelfsculpture(state){
    return state.self_sculpture;
  },
  showSelfCenter(state){
    return state.isSelfCenterShow;
  },
  getUserInfo(state){
    console.log(state.userInfo);
    return state.userInfo;
  },
  getUserChange(state){
    return state.isChangeShow;
  },
  getCategory(state){
    return state.category;
  },
  getMusic(state){
    return state.musicPlay;
  },
  getTime(state){
    return state.musicTime;
  },
  getMp3Category(state){
    return state.Mp3Category;
  },
  getBottomActive(state){
    return state.bottomActive;
  }
}
