var mongoose = require("mongoose");
//听力种类表
module.exports = new mongoose.Schema({
  CapterCategory:{
    type:String,
    default:""
  },
  CapterLevel:{
    type:String,
    default:""
  },
  CapterpicAddress:{
    type:String,
    default:""
  }
});
