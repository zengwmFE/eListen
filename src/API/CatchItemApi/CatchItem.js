var express = require("express");
var router = express.Router();
var User = require("../../models/UserModel");
router.use(function(req,resp,next){
  req.CatchMessage = {
    code:1,
    message:""
  };
  next();
});
router.post("/",function(req,resp){
  var userInfo = JSON.parse(req.body.userInfo);
  var category = req.body.category;
  User.findOne({_id:userInfo._id}).then(function(context){
    if(context){
      if(context.collections.indexOf(category)===-1){
        var collections = context.collections;
        collections.push(category);
          User.update({_id:userInfo._id},{collections:collections},function(err,raw){
            console.log('The raw response from Mongo was ', raw);
          });

        req.CatchMessage.code=200;
        req.CatchMessage.message = "收藏成功";
        req.CatchMessage.context = context;
        resp.json(req.CatchMessage);
      }else{
        req.CatchMessage.code=500;
        req.CatchMessage.message = "收藏失败";
        resp.json(req.CatchMessage);
      }


    }else{
      req.CatchMessage.code=500;
      req.CatchMessage.message = "收藏失败";
      resp.json(req.CatchMessage);
    }
  });


});

module.exports =router;
