let mongoose=require("mongoose")
let usch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String,
    "phone":String,
    "role":{
        type:String,
        default:"user"
    }
})
let um=mongoose.model("User",usch)
module.exports=um