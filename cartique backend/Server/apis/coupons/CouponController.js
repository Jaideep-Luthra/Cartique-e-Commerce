

const CouponModel = require("./CouponModel")


add=async (req,res)=>{
    let validation=""
    let formData=req.body
    if(!formData.code){
        validation+="code is required"
    }
    if(!formData.discount){
        validation+="Discount is required"
    }
    if(!formData.discountType){
        validation+="Discount type is required"
    }
    if(!formData.minAmountSpent){
        validation+="Amountspent is required"
    }
    if(!formData.expiryDate){
        validation+="Expirydate is required"
    }
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    } else {
         let total = await CouponModel.countDocuments().exec()
         let CouponObj = new CouponModel()
         CouponObj.code = formData.code
         CouponObj.discount = formData.discount
         CouponObj.discountType = formData.discountType
         CouponObj.minAmountSpent = formData.minAmountSpent
         CouponObj.expiryDate = formData.expiryDate
         CouponObj.autoId = total+1
         CouponObj.save()
         .then((couponData)=>{
             res.json({
                status:200,
                success:true,
                message:"Coupon added successfully",
                data:couponData
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
}



all=(req,res)=>{
    let formData=req.body
    let limit=formData.limit
    let currentPage=formData.currentPage
    delete formData.limit
    delete formData.currentPage

    CouponModel.find(formData)
    .limit(limit)
    .skip((currentPage-1)*limit)
     .then(async (couponData)=>{
         if(couponData.length>0){
          let total=await CouponModel.countDocuments().exec()
          res.json({
             status:200,
             success:true,
             message:"Coupon data loaded" ,
             total:total,
             data:couponData
          })
         } else {
              res.json({
                 status:404,
                 success:false,
                 message:"No Coupon found",
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


single=(req,res)=>{
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
        CouponModel.findOne({_id:formData._id})
        .then((couponData)=>{
          if(!couponData){
             res.json({
                status:404,
                success:false,
                message:"No Coupons Found"
            
             })
          }  else {
            res.json({
                status:200,
                success:true,
                message:"Coupons data  exits",
                data:couponData
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



update=(req,res)=>{
    let formData=req.body
    let validation=""
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
        CouponModel.findOne({_id:formData._id})
        .then((couponData)=>{
           if(!couponData){
             res.json({
                status:404,
                success:false,
                message:"No Coupon found"
             })
           } else {
               if(!!formData.code){
                  couponData.code=formData.code
               }
               if(!!formData.discount){
                  couponData.discount=formData.discount
               }
               if(!!formData.discountType){
                  couponData.discountType=formData.discountType
               }
               if(!!formData.minAmountSpent){
                  couponData.minAmountSpent=formData.minAmountSpent
               }
               if(!!formData.expiryDate){
                  couponData.expiryDate=formData.expiryDate
               }
               couponData.save()
               .then((couponData)=>{
                 res.json({
                    status:200,
                    success:true,
                    message:"Coupon updated successfully",
                    data:couponData
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


changeStatus=(req,res)=>{
    let validation=""
    let formData=req.body
    if(!formData._id){
        validation+="_id id required"
    }
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    } else {
        CouponModel.findOne({_id:formData._id})
        .then((couponData)=>{
          if(!couponData){
            res.json({
                status:404,
                success:false,
                message:"No Coupon found"
            })
          } else {
              couponData.status=formData.status
              couponData.save()
               .then((couponData)=>{
                  res.json({
                     status:200,
                     success:true,
                     message:"Status updated successfully" ,
                     data:couponData
                  })
               })
               .catch((er)=>{
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

module.exports={add , all  , single , update , changeStatus}