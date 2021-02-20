const express=require("express");


const router=express.Router();
const {Signup,login,forgot,resetPassword}=require("../Controllers/userControllers.js");





router.post("/singup",Signup);

router.post("/login",login)
// router.get("/logout",(req,res)=>{
    
//     res.clearCookie("token");
//     res.status(200).json({
//         status:"success",
//         data:"logout successfull"
//     })
    
    
// })

router.post("/resetPassword/:token",resetPassword)

router.post("/forgot",forgot);




module.exports=router;