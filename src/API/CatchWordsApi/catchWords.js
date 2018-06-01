var express = require("express");
var router = express.Router();
var user = require("../../models/UserModel");
var word =require("../../models/word");

//用户收藏单词
router.post("/",function(req,resp){
var userInfo = JSON.parse(req.body.userInfo);

user.update({_id:userInfo._id},{wordCollections:userInfo.wordCollections}).then(function(){});
resp.json("操作成功");
});
//用户遍历单词
router.post("/get",function(req,resp){
  console.log(123);
  var wordCollections = req.body.wordsCollections.split(",");
  var collections = [];
  console.log(wordCollections);
  for(var i in wordCollections){
   collections.push( word.findOne({_id:wordCollections[i]}).exec());
  }
  Promise.all(collections).then(function(context){
    resp.json(context);
  });

});


module.exports = router;
