var mongoose = require("mongoose");
module.exports = new mongoose.Schema({
  username:{
    type:String,
    default:""
  },
  password:{
    type:String,
    default:""
  },
  telephone:{
    type:String,
    default:""
  },
  Email:{
    type:String,
    default:""
  },
  nickname:{
    type:String,
    default:""
  },
  registerDate:{
    type:String,
    default:new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDay()+" " +
    ""+new Date().getHours()+":"+(new Date().getMinutes())+":"+new Date().getSeconds()
  },
  collections:{
    type:Array,
    default:[]
  },
  wordCollections:{
    type:Array,
    default:[]
  }
},
{
  usePushEach: true
}
  );

