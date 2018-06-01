var express = require("express");
var router = express.Router();
var User = require("../../models/UserModel");

router.use(function(req,resp,next){
  req.resetMessage = {
    code:1,
    message:"",
  };
  next();
});

router.post("/",function(req,resp,next){
console.log(req.body);
  var Email = req.body.Email;
  var newPassword = req.query.newPassword;
  console.log(newPassword);
  User.find({Email:Email}).then(function(context){
    if(context.length>0){
      if( context[0].password==newPassword){
        req.resetMessage.code=202;
        req.resetMessage.message="密码完全一样。";
        resp.json(req.resetMessage);
      }
   /*    User.remove({Email:Email}).then(function(){});*/
     else{
        context[0].password = newPassword;
        console.log(context[0]);
        var user = new User(context[0]);
         user.save();
        req.resetMessage.code=200;
        req.resetMessage.message="密码修改成功。";
        resp.json(req.resetMessage);

      }
    }else{
      req.resetMessage.code=202;
      req.resetMessage.message="邮箱不存在。";
      resp.json(req.resetMessage);
    }
  });

});
router.post("/resetNick",function(req,resp){
  console.log(req.body);
  var userInfo = JSON.parse(req.body.userInfo);
  var nickname = userInfo.nickname;
  User.findOne({Email:userInfo.Email}).then(function(context){

    if(context){
      console.log(context);
            User.update({ Email: userInfo.Email }, {$set:{nickname:nickname}}, { multi: true }, function (err, raw) {
              if (err) {
                return handleError(err);
                req.resetMessage.code = 500;
                req.resetMessage.message ="更新失败";
                resp.json(req.resetMessage);
              }
              else{
                req.resetMessage.code=200;
                req.resetMessage.message="更新成功";
                resp.json(req.resetMessage);
              }
            });
    }
  });
});
module.exports = router;
