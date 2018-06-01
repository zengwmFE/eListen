//express搭建服务器
var express = require("express");
var app =express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use("/register",require("./API/registerApi/register"));
app.use("/login",require("./API/loginApi/login"));
app.use("/reset",require("./API/resetApi/reset"));
app.use("/chapter",require("./API/ChapterApi/Chapter"));
app.use("/catchItem",require("./API/CatchItemApi/CatchItem"));
app.use("/userInfo",require("./API/UserInfoApi/userInfo"));
app.use("/loseItem",require("./API/LoseItemApi/loseItem"));
app.use("/getItem",require("./API/getItem/getItem"));
app.use("/words",require("./API/WordApi/words"));
app.use("/catchWords",require("./API/CatchWordsApi/catchWords"));
//后端服务器规定3000端口
mongoose.connect("mongodb://localhost:27017/eListen",function(err){
 if(err){
   console.log("连接数据库失败");
 }
 else{
     app.listen(3000,function(){
     console.log("link is connect");
   });
 }

});
