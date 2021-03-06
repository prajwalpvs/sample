const exp=require("express");
const adminApiObj=exp.Router();
const errHandler=require("express-async-handler");
const bcryptjs=require("bcryptjs");
 
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")
 
//const { isJSDocUnknownTag } = require("typescript");
const jwt=require("jsonwebtoken");
 
adminApiObj.use(exp.json())
 
//configure cloudinary
cloudinary.config({ 
    cloud_name: 'duopksf8c', 
    api_key: '755414257423551', 
    api_secret: '8Nt0HJBcz-tbm_wNGSGljsk2Pl8' 
  });
 
   
   const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async (req, file) => {
    return {
    folder: 'photos',
    public_id: file.fieldname + '-' + Date.now()
    }},
   });
 
   var upload = multer({ storage: storage });
   //get request handler
   adminApiObj.get("/getproducts",errHandler( async (req,res,next)=>{
 
    //get usercollectionobj
    let userCollectionObj=req.app.get("adminCollectionObj")
    let users=await userCollectionObj.find().toArray();
    res.send({message:users})
}))
 
adminApiObj.get("/getadmin/:adminname",errHandler( async (req,res,next)=>{
    let adminCollectionObj=req.app.get("adminColletionObj")
    let users=await adminCollectionObj.findOne({adminname:req.params.adminname})
    res.send({message:users})
}))
 
adminApiObj.post("/products",upload.single('photo'),errHandler( async(req,res,next)=>{
    let adminCollectionObj=req.app.get("adminCollectionObj")
   
    req.body=JSON.parse(req.body.userObj)
    req.body.image=req.file.path;
    console.log(req.body)
    //create user
    let success=await adminCollectionObj.insertOne(req.body)
    res.send({message:"product Added"})
}))
 
//export adminApiObj
module.exports=adminApiObj;