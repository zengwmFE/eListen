var mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  WordToCh:{//中文翻译
    type:String,
    default:""
  },
  WordToCome:{//英文
    type:String,
    default:""
  },
  WordSong:{//读音
    type:String,
    default:""
  }






});
