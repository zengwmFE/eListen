var express = require("express");
var router = express.Router();
var User = require("../../models/UserModel");
router.use(function(req,resp,next){
  req.LoseMessage = {
    code:1,
    message:""
  };
  next();
});
//取消订阅
router.post("/",function(req,resp,next){
  console.log();
  var category = req.body.category;
  var userInfo = JSON.parse(req.body.userInfo);
  User.findOne({_id:userInfo._id}).then(function(context){

    if(context){
          if(!context.collections.length){
            req.LoseMessage.code=500;
            req.LoseMessage.message = "取消的内容不存在";
            resp.json(req.LoseMessage);
          }
          else{
            var collections = context.collections;

            var index = context.collections.indexOf(category);
          var collection = collections.splice(index,1);
          console.log(collections);
            User.update({_id:context._id},{collections:collections},function(err,raw){
              console.log('The raw response from Mongo was ', raw);
            });

            req.LoseMessage.code=200;
            req.LoseMessage.message = "收藏成功";
            req.LoseMessage.context = context;
            console.log(context);
            resp.json(req.LoseMessage);
          }
    }else{
      req.LoseMessage.code=500;
      req.LoseMessage.message = "取消收藏失败";
      resp.json(req.LoseMessage);
    }
  });

});
module.exports = router;
