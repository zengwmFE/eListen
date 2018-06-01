var express = require("express");
var router = express.Router();
var User = require("../../models/UserModel");
//用来时刻获取用户信息
router.use(function(req,resp,next){
  req.usermessage = {
    code:1,
    message:""
  };
  next();
});
router.post("/",function(req,resp,next){
  var userInfo = JSON.parse(req.body.userInfo);
  User.findOne({_id:userInfo._id}).then(function(context){
    if(context){
      req.usermessage.code=200;
      req.usermessage.message="获取成功";
      req.usermessage.context=context;
      resp.json(req.usermessage);
    }else{
      req.usermessage.code=500;
      req.usermessage.message="获取失败";
      resp.json(req.usermessage);
    }
  });

});
module.exports = router;
