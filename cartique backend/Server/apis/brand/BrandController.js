

const BrandModel = require("./BrandModel")
const {uploadImg} = require("../../utilities/helper")

add=(req,res)=>{
    let validation=""
    let formData=req.body
    if(!formData.brandName){
        validation+="Brand name is required"
    }
    if(!req.file){
        validation+="Logo is required"
    }
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        //duplicacy 
        BrandModel.findOne({brandName:formData.brandName})
        .then(async (brandData)=>{
            if(!brandData){
                let brandObj=  new BrandModel()
                // console.log(brandObj);
                let total=await BrandModel.countDocuments().exec()
                brandObj.brandName=formData.brandName
                try {
                    let url=await uploadImg(req.file.buffer) 
                    brandObj.image=url
                }
                catch(err){
                    res.json({
                        status:500,
                        success:false,
                        message:"error while uploading image !!",
                        error:err
                    })
                }
                brandObj.autoId=total+1 
                brandObj.save()
                .then((brandData)=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"Brand added!!",
                        data:brandData
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
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Brand already exists",
                    data:brandData
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

all=(req,res)=>{
    let formData=req.body
    let limit=formData.limit  
    let currentPage=formData.currentPage 
    delete formData.limit 
    delete formData.currentPage
    //skip, sort, limit
    BrandModel.find(formData)
   .limit(limit)
    .skip((currentPage-1)*limit)
    // .sort({createdAt:-1})
    .then(async (brandData)=>{
        if(brandData.length>0){
            let total=await BrandModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"Brand loaded",
                total:total,
                data:brandData
            })
        }else{
            res.json({
                status:404,
                success:false,
                message:"No brand Found!!",
                data:brandData
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
    }else{
        BrandModel.findOne({_id:formData._id})
        .then((brandData)=>{
            if(!brandData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Brand found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Brand exists",
                    data:brandData
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

update = async (req, res) => {
    let formData = req.body;
  
    if (!formData._id) {
      return res.json({
        status: 422,
        success: false,
        message: "_id is required",
      });
    }
  
    try {
      const existingBrand = await BrandModel.findOne({ _id: formData._id });
  
      if (!existingBrand) {
        return res.json({
          status: 404,
          success: false,
          message: "No Brand found!!",
        });
      }
  
      let updateNeeded = false;
      let updatedFields = {};
  
      if (
        formData.brandName &&
        formData.brandName !== existingBrand.brandName
      ) {
        updatedFields.brandName = formData.brandName;
        updateNeeded = true;
      }
  
      if (req.file && req.file.buffer) {
        try {
          let url = await uploadImg(req.file.buffer);
          updatedFields.image = url;
          updateNeeded = true;
        } catch (err) {
          // 🔴 Ensure return here to avoid sending second res.json
          return res.json({
            status: 500,
            success: false,
            message: "Error while uploading image!!",
            error: err,
          });
        }
      }
  
      if (!updateNeeded) {
        return res.json({
          status: 200,
          success: true,
          message: "Nothing changed",
          data: existingBrand,
        });
      }
  
      const updatedBrand = await BrandModel.findOneAndUpdate(
        { _id: formData._id },
        { $set: updatedFields },
        { new: true }
      );
  
      return res.json({
        status: 200,
        success: true,
        message: "Brand updated successfully!!",
        data: updatedBrand,
      });
  
    } catch (err) {
      return res.json({
        status: 500,
        success: false,
        message: "Internal server error",
        error: err,
      });
    }
  };
  

// update=  (req,res)=>{
//     let formData=req.body 
//     let validation=""
//     if(!formData._id){
//         validation+="_id is required"
//     }
//     if(!!validation.trim()){
//         res.json({
//             status:422,
//             success:false,
//             message:validation
//         })
//     }else{
//         BrandModel.findOne({_id:formData._id})
//         .then( async (brandData)=>{
//             if(!brandData){
//                 res.json({
//                     status:404,
//                     success:false,
//                     message:"No Brand found!!"
//                 })
//             }else{
//                 if(!!formData.brandName){
//                     brandData.brandName=formData.brandName 
//                 }
//                 try {
//                     let url=await uploadImg(req.file.buffer) 
//                     brandData.image=url
//                 }
//                 catch(err){
//                     res.json({
//                         status:500,
//                         success:false,
//                         message:"error while uploading image !!",
//                         error:err
//                     })
//                 }
//                brandData.save()
//                .then((brandData)=>{
//                     res.json({
//                         status:200,
//                         success:true,
//                         message:"Brand updated successfully!!",
//                         data:brandData
//                     })
//                })
//                .catch((err)=>{
//                     res.json({
//                         status:500,
//                         success:false,
//                         message:"Internal server error",
//                         error:err
//                     })
//                }) 
//             }
            
//         })
//         .catch((err)=>{
//             res.json({
//                 status:500,
//                 success:false,
//                 message:"Internal server error",
//                 error:err
//             })
//         })
//     }

//     // find given _id 
//     //update

// }


changeStatus=(req,res)=>{
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
    }else{
        BrandModel.findOne({_id:formData._id})
        .then((brandData)=>{
            if(!brandData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Brand found!!"
                })
            }else{
            // brandData.status=!brandData.status 
               brandData.status=formData.status 
               brandData.save()
               .then((brandData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated successfully",
                        data:brandData
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



module.exports={add, all, single, update, changeStatus}

