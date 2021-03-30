//create express object
const exp=require("express")
 
//require("dotenv").config();
 
const app=exp();
 
//import API objects
const userApiObj=require("./APIS/userApi")
 
//const productApiObj=require("./APIS/productApi")
const adminApiObj=require("./APIS/adminApi")
 
const cartApiObj=require("./APIS/cartApi")
 
const mc=require("mongodb").MongoClient;
 
const path=require("path")
 
//const errHandler=require("express-async-handler")
app.use(exp.static(path.join(__dirname,"dist/shop")))
 
//forward req object to specific API based on path
app.use("/user",userApiObj)
 
app.use("/cart",cartApiObj)
 
app.use("/admin",adminApiObj)

//databaseurl
const dburl="mongodb+srv://cdb37:cdb37@prajwal.r4aek.mongodb.net/shopping?retryWrites=true&w=majority"
 
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
 
.then(client=>{
    //get database object
    const databaseObject=client.db("shopping");
   const userCollectionObj=databaseObject.collection("customers");
    const cartCollectionObj=databaseObject.collection("cart");
    const adminCollectionObj=databaseObject.collection("admins");
    //sharing collection object
    app.set("userCollectionObj",userCollectionObj)
 
    app.set("cartCollectionObj", cartCollectionObj)
 
   // app.set("productCollectionObj",productCollectionObj)
   app.set("adminCollectionObj",adminCollectionObj)
    console.log("Connected to db successfully")  
})
.catch(err=>console.log(`error in db connection ${err}`))
 
app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid`})
})
 
app.use((err,req,res,next)=>{
    res.send({message:"Error occured",reason:err.message})
})
 
//assign port number
const port=9000;
app.listen(9000,()=>console.log(`web server on port ${port}`))





