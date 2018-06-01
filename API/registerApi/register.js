var express = require("express");
var router = express.Router();
var User = require("../../models/UserModel");
router.use(function(req,resp,next){
  req.baseMessage = {
      username:"eListen"
  };
  req.registerMessage = {
    code:"",
    message:""
  };
  next();
});

router.post("/",function(req,resp,next){

     var Email = req.body.Email;
     var password = req.body.password;

      User.find({Email:Email},function(err,context){
        if(err){
          req.registerMessage.code=500;
          req.registerMessage.message="后台数据发生不可思议的错误";
            resp.json(req.registerMessage);
        }else{
          if(context.length===0){

            var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789";

            var charOp = "";
            var length = 8;
            for(var i=0;i<length;i++){
              var randomNum = Math.floor(Math.random()*charSet.length);
              charOp += charSet.substring(randomNum,randomNum+1);
            }
          var username = req.baseMessage.username+charOp;
          var nickname = req.baseMessage.username+charOp;

          var user = new User(
            {
              username:username,
              password:password,
              telephone:"",
              Email:Email,
              nickname:nickname,
              /*registerDate:new Date()*/
            }
          );
          user.save(function(err){
            if(err){
              req.registerMessage.code=500;
              req.registerMessage.message="后台数据发生不可思议的错误";
              resp.json(req.registerMessage);
            }
            else{
              req.registerMessage.code=200;
              req.registerMessage.message="注册成功";
              resp.json(req.registerMessage);
            }
          });
          }
          else{
            req.registerMessage.code=202;
            req.registerMessage.message="邮箱已存在";
            resp.json(req.registerMessage);
          }
        }
      });

});
router.post("/registered",function(req,resp){
  var Email = req.body.Email;
  User.findOne({Email:Email}).then(function(context){
    req.registerMessage.code=200;
    req.registerMessage.message="正在登录。。。";
    var userContext = {};
    //浅复制
    /*userContext.username = context.username;
    userContext.password = context.telephone;
    userContext.Email = context.Email;
    userContext.nickname = context.nickname;
    userContext.registerDate = context.registerDate;
    userContext.id = context._id;
    console.log(userContext.id);*/
    req.registerMessage.UserInfo = context;
    console.log(req.registerMessage);
    resp.json(req.registerMessage);
  });

});

module.exports = router;
