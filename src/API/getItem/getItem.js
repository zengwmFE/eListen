var express = require("express");
var router = express.Router();
var User = require("../../models/UserModel");
var Chapter = require("../../models/Chapter");
var fs = require("fs");
var path = require("path");
var url = require("url");
router.use(function(req,resp,next){
  req.CatchMessage = {
    code:1,
    message:"",
    file:[]
  };
  next();
});

//得到某一段MP3的具体信息，并发送到前端
router.post("/",function(req,resp){
  console.log(req.body.id);
  Chapter.findOne({_id:req.body.id}).then(function(context){
    var path1 = context.CpList;
    var pathname = url.parse(path1).pathname;
    var reallyPath = path.join("C:\\mySEVER",pathname);
    fs.readFile(reallyPath,function (err,data) {
      if(err){
        console.log(err);
      }
      var list = data.toString().split("\n");
      req.CatchMessage.context = context;
      req.CatchMessage.file = list;
      resp.json(req.CatchMessage);
    })

  });
});


module.exports = router;
