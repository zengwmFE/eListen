var express =require("express");
var router = express.Router();
var Chapter = require("../../models/Chapter");
var ChapterMessage = require("../../models/ChapterMessage");
router.use(function(req,resp,next){

  req.ChapterMessage = {
    code:1,
    message:"",
    context:[],
    myContext:[]
  };
  next();
});
router.get("/",function(req,resp){
  /*var chapter = new Chapter({});
  chapter.save();*/
  Chapter.find().then(function(context){

    if(context.length>=1){

      var Capter=[];
      for(var x in context){
        var Capter1 = {};
        var repeat = false;
        Capter1.CapterCategory = context[x].CapterCategory;
        Capter1.CapterLevel = context[x].CapterLevel;
        Capter1.CapterpicAddress = context[x].CapterpicAddress;
        if(Capter.length>0){
         for(var listCapter in Capter){
           if(Capter[listCapter].CapterCategory == Capter1.CapterCategory){
                  console.log(true);
                  repeat = true;
           }
         }
         if(repeat===false){
           Capter.push(Capter1);
         }
        }else{
          Capter.push(Capter1);
        }
      }
      req.ChapterMessage.code = 200;
      req.ChapterMessage.message = "获取成功";
      req.ChapterMessage.context = Capter;
      resp.json( req.ChapterMessage);
    }
    else{
      req.ChapterMessage.code = 500;
      req.ChapterMessage.message = "服务器中没有数据";
      req.ChapterMessage.context = "";
      resp.json( req.ChapterMessage);
    }
  });

});
router.post("/get",function(req,resp){
  console.log(req.body.category);
  Chapter.find({CapterCategory:req.body.category}).then(function(context){
    if(context.length>=1){
      req.ChapterMessage.code = 200;
      req.ChapterMessage.message = "获取成功";
      req.ChapterMessage.context = context;
      resp.json( req.ChapterMessage);
    }
    else{
      req.ChapterMessage.code = 500;
      req.ChapterMessage.message = "服务器中没有数据";
      req.ChapterMessage.context = "";
      resp.json( req.ChapterMessage);
    }
  });

});
router.post("/",function(req,resp){
  /*var message = new ChapterMessage({});
  message.save();*/
  var userInfo = JSON.parse(req.body.userInfo);
  var collections = userInfo.collections;
  var _collection = [];
  for(let collect in collections){
    _collection.push(ChapterMessage.findOne({CapterCategory:collections[collect]}).exec());
  }
  Promise.all(_collection).then(function(result){
   if(result){
     resp.json(result);
   }
  });

});

router.post("/getList",function(req,resp){
  var SearchValue = eval("/"+req.body.SearchValue+"/");//字符串转成正则

  Chapter.find({CapterCategory:SearchValue}).then(function(context){
     resp.json(context);
  });

});

module.exports = router;
