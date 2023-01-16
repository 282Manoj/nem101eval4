const mongoose=require("mongoose");
const socialSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userID:String
});

const SocialModel=mongoose.model("post",socialSchema);
module.exports={
    SocialModel
}