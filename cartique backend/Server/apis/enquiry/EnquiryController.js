
const EnquiryModel =require("../enquiry/EnquiryModel")
const UserModel = require("../users/UserModel")
const mongoose = require("mongoose");

 add = async (req, res) => {
    const formData = req.body;
    let validation = "";

    // Validation checks
    if (!formData.title) {
        validation += "Title is required. ";
    }
    if (!formData.message) {
        validation += "Message is required. ";
    }
    // if (!formData._id) {
    //     validation += "User ID is required. ";
    // }

    if (validation.trim()) {
        return res.json({
            status: 422,
            success: false,
            message: validation.trim()
        });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.decoded.userId)) {
        return res.json({
            status: 400,
            success: false,
            message: "Invalid user ID"
        });
    }

    try {
        // Find user by _id (login user)
        const userData = await UserModel.findById(req.decoded.userId);
        if (!userData) {
            return res.json({
                status: 404,
                success: false,
                message: "User not found"
            });
        }

        // Save enquiry
        const enquiryTotal = await EnquiryModel.countDocuments();
        const enquiryObj = new EnquiryModel({
            autoId: enquiryTotal + 1,
            userId: userData._id,
            title: formData.title,
            message: formData.message
        });

        const enquiryData = await enquiryObj.save();

        return res.json({
            status: 200,
            success: true,
            message: "Enquiry Registered Successfully",
            enquiryData,
            userData: {
                _id: userData._id,
                name: userData.name,
                email: userData.email,
            }
        });

    } catch (err) {
        // console.error("Error:", err);
        return res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message || err
        });
    }
};


all=(req,res)=>{
  let formData=req.body
  let limit=formData.limit
  let currentPage=formData.currentPage
  delete formData.limit
  delete formData.currentPage

  EnquiryModel.find(formData)
  .populate("userId")
  .limit(limit)
  .skip((currentPage-1)*limit)
  .then(async (enquiryData)=>{
    if(enquiryData.length>0){
       let total=await EnquiryModel.countDocuments().exec()
       res.json({
         status:200,
         success:true,
         message:"Enquiry loaded" ,
         total:total,
         data:enquiryData
       })
    } else {
        res.json({
            status:404,
            success:false,
            message:"No Enquiry found",
            data:enquiryData
        })
    }
  })
  .catch((err)=>{
    res.json({
        status:500,
        success:false,
        message:"Internal server error",
        error:err
    })
  })
}


deleteEnquiry=(req,res)=>{
   let validation=""
   let formData=req.body
   if(!formData._id){
      validation+="_id is required"
   }
   if(!!validation.trim()){
     res.json({
         status:422,
         success:false,
         message:validation
     })
   } else {
      EnquiryModel.findOne({_id:formData._id})
      .then((enquiryData)=>{
       if(!enquiryData){
         res.json({
            status:404,
            success:false,
            message:"No Enquiry Found"
         })
       } else {
          EnquiryModel.deleteOne({_id:formData._id})
          .then(()=>{
            res.json({
                status:200,
                success:true,
                message:"Enquiry deleted",
                data:enquiryData
            })
          })
          .catch((err)=>{
            res.json({
               status:500,
               success:false,
               message:"Internal server error",
               error:err
            })
         })
       }
      })
      .catch((err)=>{
         res.json({
            status:500,
            success:false,
            message:"Internal server error",
            error:err
         })
      })
   }
}

module.exports = { add , all , deleteEnquiry};






