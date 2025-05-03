let express=require("express")
let mongoose=require("mongoose")
let cors=require("cors")
const rt = require("./routes/route")

mongoose.connect("mongodb://127.0.0.1:27017/newsarticledb").then(()=>{
    console.log("db ok")
})
let app=express()
app.use(express.json())
app.use(cors())
app.use("/",rt)
app.listen(5000)