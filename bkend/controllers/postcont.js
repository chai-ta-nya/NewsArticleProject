let {v4}=require("uuid")
const pm = require("../models/postmodel")

let addPost=async(req,res)=>{
    try
    {
        let post=new pm({...req.body,"_id":v4()})
        await post.save()
        res.json({"msg":"post created"})
    }
    catch(err)
    {
        console.log(err)
        res.json({"msg":"error in addPost"})
    }
}
let getAll=async(req,res)=>{
    try
    {
        let posts=await pm.find({"status":"approved"})
        res.json(posts)
    }
    catch(err)
    {
        res.json({"msg":"error in getAll"})
    }
}
let getByCat=async(req,res)=>{
    try
    {
        let posts=await pm.find({"cat":req.params.cat,"status":"approved"})
        res.json(posts)
    }
    catch(err)
    {
        res.json({"msg":"error in getByCat"})
    }
}
let postsByMe=async(req,res)=>{
    try
    {
        let posts=await pm.find({"uid":req.params.uid})
        res.json(posts)
    }
    catch(err)
    {
        res.json({"msg":"error in postsByMe"})
    }
}
let getPosts=async(req,res)=>{
    try
    {
        let posts=await pm.find()
        res.json(posts)
    }
    catch(err)
    {
        res.json({"msg":"error in getPosts"})
    }

}
let approve=async(req,res)=>{
    try{
       await pm.findByIdAndUpdate({"_id":req.body._id},req.body)
        res.json({"msg":"updated"})
    }
    catch(err)
    {
        res.json({"msg":"error in updpost"})  
    }
}
let rejectPost = async (req, res) => {
    try {
      await pm.findByIdAndDelete(req.params.id);
      res.json({ msg: "Post deleted" });
    } catch (err) {
      res.json({ msg: "Error deleting post" });
    }
};  
let addlike = async (req, res) => {
  try {
    const post = await pm.findById(req.body._id);
    const uid = req.body.uid;

    if (post.likes.includes(uid)) 
    {
      await pm.findByIdAndUpdate(req.body._id, { $pull: { likes: uid } });
      return res.json({ msg: "like removed" });
    } 
    else 
    {
      await pm.findByIdAndUpdate(req.body._id, {
        $pull: { dlikes: uid },
        $addToSet: { likes: uid },
      });
      return res.json({ msg: "liked" });
    }
  } 
  catch (err) 
  {
    res.json({ msg: "error in like" });
  }
};

let adddlike = async (req, res) => {
  try {
    const post = await pm.findById(req.body._id);
    const uid = req.body.uid;

    if (post.dlikes.includes(uid)) 
    {
      await pm.findByIdAndUpdate(req.body._id, { $pull: { dlikes: uid } });
      return res.json({ msg: "dislike removed" });
    } 
    else 
    {
      await pm.findByIdAndUpdate(req.body._id, {
        $pull: { likes: uid },
        $addToSet: { dlikes: uid },
      });
      return res.json({ msg: "disliked" });
    }
  } 
  catch (err) 
  {
    res.json({ msg: "error in dislike" });
  }
};


module.exports={addPost,getAll,getByCat,postsByMe,getPosts,approve,addlike,adddlike,rejectPost}