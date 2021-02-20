const express=require("express");

const router=express.Router();

const {protectRoute,isAuthorized}=require("../Controllers/userControllers.js");

const {AddHostel,updateHostel,deleteHostel,getHostels,getHostel,searchHostel,createForm,showAllForms}=require("../Controllers/hostelController.js")

router.route("/addHostel").post(protectRoute,AddHostel)

router.route("/updateHostel/:id").patch(protectRoute,isAuthorized,updateHostel);

router.route("/getHostel/:id").get(protectRoute,getHostel);

router.route("/deleteHostel/:id").delete(protectRoute,isAuthorized,deleteHostel)

router.route("/getAllHostels").get(protectRoute,getHostels)

router.route("/searchHostel").get(protectRoute,searchHostel)
router.route("/createForm/:id").post(protectRoute,createForm)
router.route("/showAllForms").get(protectRoute,isAuthorized,showAllForms)





// /:id--?req.params
// ?------  -->req.query






module.exports=router;