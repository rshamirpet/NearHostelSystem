const userModel=require("../models/userModel.js");
const jwt=require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {SECRET_KEY}=require("../secrets.js");
// const smtpTransport=require("nodemailer-smtp-transport")
// procees.env('NODE_TLS_REJECT_UNAUTHORIZED')=0;
exports.Signup=async  (req,res)=>
{
  
  try{
  const userData=req.body;
  if(userData.password==userData.confirmPassword)
  {
      
      const user=await userModel.create(userData);
      
      user.password=undefined;
      res.status(200).json({
          status:"success",
          message:"register suucessfull,Please Login...!"
      })
  }
  else{
      throw new   Error("passwords are mismatch");
  }
  }
  catch(err)
  {
      console.log(err);
      res.status(200).json({
          status:"failure",
          error:err.message
      })
  }
}


exports.login=async (req,res)=>{
    
    try{
        
        const {email,password}=req.body;
        
        const userExits=await userModel.findOne({email:email,password:password});
        if(userExits)
        {
            
            const token=jwt.sign({id:userExits["_id"]},SECRET_KEY,{ expiresIn: '7d' });
            
           userExits.password=undefined;

            res.status(200).json({
            status:"success",
            token:token,
            data:userExits
        })
        }
        else{
            throw new Error("No User Found")
        }
    }
    catch(err)
    {
        res.status(200).json({
          status:"failure",
          error:err.message
      })
    }
    
}

//user or owner login or not ==>authentication
exports.protectRoute=async (req,res,next)=>{
    
    try{
        
        const token=req.headers.token;
        
        
        const userId=jwt.verify(token,SECRET_KEY);
         console.log(userId)
        
        const userExits=await userModel.findById(userId.id);
        
        if(userExits)
        {
            
            // res.clearCookie("token");
            req.user=userExits;
            console.log("proected")
            
            next();
        }
        else{
            throw new Error("Please Log In")
        }
        
    }
    
    catch(err)
    {
        res.status(200).json({
          status:"failure",
          error:err.message
      })
    }
    
    
    
}

//authorizion
exports.isAuthorized=(req,res,next)=>{
    
    try{
        
        if(req.user.role=="owner")
        {
            next();
        }
        else{
            throw new Error("Your Not Authorized");
        }
        
        
        
    }
    catch(err)
    {
        
        
        res.status(200).json({
          status:"failure",
          error:err.message
      })
    }
    
    
}



//forgot password



exports.forgot=async(req,res)=>{
    
    
    try{
        
        const {email}=req.body;
        
        const user=await userModel.findOne({email:email});
        if(user)
        {
            
            const token=user.createToken();
        await    user.save({validateBeforeSave:false})
            
            const resetLink=`https://revanth-kumar-1.paiza-user-free.cloud:3000/api/user/resetPassword/${token}`;
            
            // var transport = nodemailer.createTransport({
            //       host: "smtp.mailtrap.io",
            //       port: 2525,
            //       auth: {
            //         user: "54ce39bb4e8c67",
            //         pass: "0a6aadae1a1952"
            //       }
            //     });
            
            
            
            
            
            
          
            
            const transporter=nodemailer.createTransport({
            service:"gmail",
            host:"smtp.gmail.com",
            auth:{
            user:"nearbasedhostels@gmail.com",
            pass:"krzfihyitvashlvd"
            }
            
            });
             let info = await transporter.sendMail({
                from: '<nearbasedhostels@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<a href='${resetLink}'>Click to Reset</a>`, // html body
              });
            
            
            res.status(200).json({
                status:"success",
                data:"Mail send Successfully"
            })
            
        }
        else{
            throw new Error("User Not Found");
        }
        
        
    }
    
    
    catch(err)
    {
        res.status(400).json({
          status:"failure",
          error:err.message
      })
        
    }
    
    
    
}





exports.resetPassword=async (req,res)=>{
    
    
    try{
        
        const {password,confirmPassword}=req.body;
        
        // console.log("starat")
        if(password==confirmPassword)
        {
            // console.log("end");   
            const token=req.params.token;
            // console.log(token);
            let user=await userModel.find({token:token,time:{$gt:Date.now()}});
            user=user[0];
            
            if(user)
            {
                
                user.resetPassword(password);
                
                await user.save({validateBeforeSave:false});
                
                
                res.status(200).json({
                    status:"success",
                    data:"password reseted Successfully .Please Log In"
                })
                
            }
            else{
                throw new Error("Your Link Was Expires")
            }
            
            
            
        }
        else{
            throw new Error("password are mismatch");
        }
        
        
    }
    
    catch(err)
    {
        
        
        res.status(400).json({
          status:"failure",
          error:err.message
      })
    }
    
    
    
    
    
}
