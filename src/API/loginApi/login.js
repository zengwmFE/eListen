var express = require("express");
var router = express.Router();
var User = require("../../models/UserModel");
router.use(function(req,resp,next){
  console.log(123);
  req.LoginMessage = {
    code:1,
    message:"",
  };
  next();
});
router.post("/",function(req,resp,next){
      console.log(req.body);
      var Email = req.body.Email;
      var password = req.body.password;
      User.findOne({Email:Email}).then(function(context){
        console.log(context);
        if(context){
          console.log(context);
          if(context.password===password){
            req.LoginMessage.code=200;
            req.LoginMessage.message = "登录成功";
            req.LoginMessage.userMessage=context;
            resp.json(req.LoginMessage);
          }
          else{
            req.LoginMessage.code=203;
            req.LoginMessage.message = "密码错误";
            resp.json(req.LoginMessage);
          }
        }
        else{
          req.LoginMessage.code=202;
          req.LoginMessage.message = "账户不存在";
          resp.json(req.LoginMessage);
        }
      });

});

module.exports = router;
