
const hostelModel=require("../models/hostelModel.js");
const userModel=require("../models/userModel.js")

const contactModel=require("../models/contactModel.js");

exports.AddHostel=async (req,res)=>{
try{

console.log("add hostel")
    const hostelData=req.body;//owner
    
    const hostel=new hostelModel(hostelData);
    hostel.owner=req.user._id;
    const user=await userModel.findById(req.user._id);
    user.role="owner"
    await user.save({validatBeforeSave:true})
    await hostel.save();
    
    
    res.status(200).json({
        status:"success",
        data:hostel
    })
    
    
}
catch(err)
{
    res.status(200).json({
          status:"failure",
          error:err.message
      })
}
    
}

exports.updateHostel=async(req,res)=>{
    
    try{
        
        const id=req.params.id;
        
        const updateObj=req.body;
        
        const hostel=await hostelModel.findById(id);
        for( key in updateObj)
        {
            hostel[key]=updateObj[key];
        }
        
        await hostel.save({validatBeforeSave:false});
        
        
        res.status(201).json({
            status:"success",
            data:hostel
        })
        
        
    }catch(err)
    {
        res.status(400).json({
          status:"failure",
          error:err.message
      })
    }
}



exports.deleteHostel=async(req,res)=>{
    
      try{
        
        const id=req.params.id;
        console.log(id);
        
       await hostelModel.deleteOne({_id:id});
       
       
       res.status(201).json({
           status:"success",
           data:"deleted"
       })
        
        
    }catch(err)
    {
        res.status(400).json({
          status:"failure",
          error:err.message
      })
    }
    
}



exports.getHostels=async (req,res)=>{
    
    
    
     try{
        
        const allHostels=await hostelModel.find({});
        
        res.status(200).json({
            status:"success",
            data:allHostels
        })
        
        
    }catch(err)
    {
        res.status(200).json({
          status:"failure",
          error:err.message
      })
    }
    
    
}


exports.getHostel=async (req,res)=>{
    
     try{
        
        const id=req.params.id;
        
        const hostel=await hostelModel.findById(id);
        
        res.status(200).json({
            status:"success",
            data:hostel
        })
        
        
        
        
    }catch(err)
    {
        res.status(400).json({
          status:"failure",
          error:err.message
      })
    }
  
    
}




exports.searchHostel=async (req,res)=>{
    
     
     try{
        
        const query=req.query;
        
        
        if(query.type=="city")
        {
            
            const hostels=await hostelModel.find({city:query.city});
            res.status(200).json({
            status:"success",
            data:hostels
        })
        
            
        }
        else if(query.type=="state")
        {
            
             const hostels=await hostelModel.find({state:query.state});
            res.status(200).json({
            status:"success",
            data:hostels
        })
        }
        else if(query.type=="pincode")
        {
            
             const hostels=await hostelModel.find({pincode:query.pincode});
            res.status(200).json({
            status:"success",
            data:hostels
        })
        }
        
        
        
        
    }catch(err)
    {
        res.status(400).json({
          status:"failure",
          error:err.message
      })
    }
  
    
}



exports.createForm=async (req,res)=>{
    
    try{
        
        const id=req.params.id;
        
        const data=req.body;
        const newForm=new contactModel(data);
        newForm.hostelId=id;
        await newForm.save();
        
        
        res.status(200).json({
            
            status:"success",
            
            
        })
        
    }
    catch(err)
    {
        
         res.status(200).json({
          status:"failure",
          error:err.message
      })
    }
    
    
}



exports.showAllForms=async (req,res)=>{
    
    try{
        
        
        const id=req.user._id;//owner
        
        const hostel=await hostelModel.findOne({owner:id});//owner find hostel
        
        
        const hid=hostel._id;//onwer hostel id
        
        
        
        const allForms=await contactModel.find({hostelId:hid});//all froms
        
        
        res.status(200).json({
            status:"success",
            data:allForms
        })
        
        
        
    }
    catch(err)
    {
         res.status(200).json({
          status:"failure",
          error:err.message
      })
        
    }
    
    
}

