const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");

const cors=require("cors")
app.use(cors())
app.use(cookieParser())

app.use(express.json());
require("./db.js");
const userRouter=require("./routers/userRouter.js");

const hostelRouter=require("./routers/hostelRoutes.js");

app.use("/api/user",userRouter);
app.use("/api/hostels",hostelRouter);






app.listen(3000,()=>{
    
    console.log("connected");
    
    
})


