let bcrypt=require("bcryptjs")
let jwt=require("jsonwebtoken")
const um = require("../models/usermodel")

let reg=async(req,res)=>{
    try
    {
        let account=await um.findById({_id:req.body._id})
        if(account)
        {
            res.json({"msg":"account with this email already exists"})
        }
        else
        {
            let hashcode=await bcrypt.hash(req.body.pwd,10)
            let account=new um({...req.body,pwd:hashcode})
            await account.save()
            res.json({"msg":"account created"})
        }
    }
    catch(err)
    {
        res.json({"msg":"error in registration"})
    }
}
let login = async (req, res) => {
    try {
      let account = await um.findById({ _id: req.body._id });
      if (account) 
      {
        let f = await bcrypt.compare(req.body.pwd, account.pwd);
        if (f) 
        {
          res.json({
            token: jwt.sign({ _id: account._id }, "abcd"),
            _id: account._id,
            name: account.name,
            role: account.role
          });
        } 
        else 
        {
          res.json({ msg: "check password" });
        }
      } 
      else 
      {
        res.json({ msg: "check email" });
      }
    } 
    catch (err) 
    {
      console.log(err)
      res.json({ msg: "error in login" });
    }
};
let isLogin=async(req,res,next)=>{
    try
    {
        jwt.verify(req.headers.authorization,"abcd")
        next()
    }
    catch(err)
    {
        res.json({"msg":"error in isLogin"})
    }
}
let isAdmin=async(req,res,next)=>{
    try
    {
        let account=await um.findById({"_id":req.headers.uid})
        if(account&&account.role=="admin")
        {
            next()
        }
        else
        {
            res.json({"msg":"You are not admin"})
        }
    }
    catch(err)
    {
        res.json({"msg":"error in isAdmin"})
    }
}
module.exports={reg,login,isLogin,isAdmin}