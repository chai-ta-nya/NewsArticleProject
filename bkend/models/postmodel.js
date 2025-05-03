let mongoose=require("mongoose")
let postsch=new mongoose.Schema({
    "_id":String,
    "title":String,
    "cat":String,
    "text":String,
    "date":String,
    "uname":String,
    "uid":String,
    "status":{
        default:"pending",
        type:String
    },
    "comm":String,
    "likes":[],
    "dlikes":[]
})
let pm=mongoose.model("Post",postsch)
module.exports=pm