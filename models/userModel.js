const mongoose=require("mongoose");
const crypto = require('crypto');

const userSchema=new mongoose.Schema({
    
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","owner"],
        default:"user"
    },
    token:String,
    time:String

    
})


userSchema.methods.createToken=function()
{
    const token = crypto.randomBytes(35).toString("hex");
    this.token=token;
    this.time=Date.now()*60*10*60*1000;
    
    
    return token;
    
}

userSchema.methods.resetPassword=function(password)
{
    console.log(password)
    
    this.password=password;
    
    this.token=undefined;
    this.time=undefined;
    
    
    
}

const userModel=mongoose.model("User",userSchema);


module.exports=userModel;