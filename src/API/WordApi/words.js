var express = require("express");
var router = express.Router();
var words = require("../../models/word");


router.get("/",function(req,resp){//获取单词列表
  /*var word = new words({});
  word.save();*/
  words.find().then(function(context){
    resp.json(context);
  });

});

module.exports = router;
