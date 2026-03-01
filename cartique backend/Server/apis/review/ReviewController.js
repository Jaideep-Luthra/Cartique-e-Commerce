

const ReviewModel = require("./ReviewModel")


add=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData.productId){
        validation+="Product id is required"
    }
    
    if(!formData.rating){
        validation+=" Rating is required"
    }

    if(!formData.comment){
        validation+=" Comment is required"
    }

    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    } else {
         ReviewModel.findOne({productId:formData.productId,userId:req.decoded.userId })
         .then(async  (reviewData)=>{
            if(!reviewData){
                let reviewObj=new ReviewModel()
                let total=await ReviewModel.countDocuments().exec()
                reviewObj.productId=formData.productId
                reviewObj.userId=req.decoded.userId
                reviewObj.rating=formData.rating
                reviewObj.comment=formData.comment
                reviewObj.autoId=total+1
                reviewObj.save()
                .then((reviewData)=>{
                   res.json({
                      status:200,
                      success:true,
                      message:"Review added successfully",
                      data:reviewData
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
             else {
                return res.json({
                    status: 409,
                    success: false,
                    message: "You have already submitted a review for this product",
                    data:reviewData
                });
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

 
all=(req,res)=>{
    let formData=req.body
    let limit=formData.limit
    let currentPage=formData.currentPage
    delete formData.limit
    delete formData.currentPage
  
    ReviewModel.find(formData)
    .limit(limit)
    .skip((currentPage-1)*limit)
    .then(async (reviewData)=>{
      if(reviewData.length>0){
         let total=await ReviewModel.countDocuments().exec()
         res.json({
           status:200,
           success:true,
           message:"Review loaded" ,
           total:total,
           data:reviewData
         })
      } else {
          res.json({
              status:404,
              success:false,
              message:"No Review found",
              data:reviewData
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


  deleteReview=(req,res)=>{
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
       ReviewModel.findOne({_id:formData._id})
       .then((reviewData)=>{
        if(!reviewData){
          res.json({
             status:404,
             success:false,
             message:"No Review Found"
          })
        } else {
           ReviewModel.deleteOne({_id:formData._id})
           .then(()=>{
             res.json({
                 status:200,
                 success:true,
                 message:"Review deleted",
                 data:reviewData
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
 

module.exports={add , all , deleteReview}