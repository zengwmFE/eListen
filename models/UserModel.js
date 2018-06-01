var mongoose = require("mongoose");
var UserSchame = require("../schema/User");
module.exports =mongoose.model("User",UserSchame);
