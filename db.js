const mongoose=require("mongoose");
const {db_url}=require("./secrets.js")

mongoose.connect(db_url,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    
    console.log("database connected");
    
})
.catch(err=>{
  
  console.log(err);  
})