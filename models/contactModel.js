const mongoose=require("mongoose");
const moment=require("moment")

const contactSchema=new mongoose.Schema({
    
    
    name:{
        type:String,
        required:true
    },
    
    
    email:{
        type:String
    }
    ,
    mobile:{
        type:Number,
        required:true
    },
    hostelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Hostel'
    },
    date:{
        type:Date,
        defualt:moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    

    
})




const contactModel=mongoose.model("Contact",contactSchema)



module.exports=contactModel;






