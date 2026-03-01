

const CartModel = require("./CartModel")
const UserModel = require("../users/UserModel")

add=(req,res)=>{
    let validation=""
    let formData=req.body
    if(!formData.productId){
        validation+="Product id is required"
    }

    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    } else {
        CartModel.findOne({productId:formData.productId,addedById:req.decoded.userId})
        .then(async (cartData)=>{
             if(!cartData){
                let cartObj=new CartModel()
                let  total=await CartModel.countDocuments().exec()
                cartObj.productId=formData.productId
                cartObj.quantity=1
                cartObj.addedById=req.decoded.userId
                cartObj.autoId=total+1
                cartObj.save()
                .then((cartData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Added to cart successfully ",
                        data:cartData
                    })
                })
                .catch(()=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        error:err
                    })
                })
             } else {
                  cartData.quantity+=1
                  cartData.save()
                  .then((cartData)=>{
                      res.json({
                        status:200,
                        success:true,
                        message:"Cart updated successfully",
                        data:cartData
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



 all=(req,res)=>{
    CartModel.find({addedById:req.decoded.userId})
    .populate("productId")
    .populate("addedById")
    // .populate({
    //     path:"productId",
    //     populate:"brandId"
    // })
    .then((cartData)=>{
        if(cartData.length>0){
            res.json({
                status:200,
                success:true,
                message:"Cart loaded",
                data:cartData
            })
        }  else {
            res.json({
                status:200,
                success:false,
                message:"No data in cart"
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



 update = (req, res) => {
    let validation=""
    let formData=req.body
    if (!formData._id) {
        validation += "Cart id is required. ";
    }

    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation.trim()
        });
        return;
    }

    CartModel.findOne({ _id: formData._id, addedById: req.decoded.userId })
    .then((cartData) => {
        if (!cartData) {
            res.json({
                status: 404,
                success: false,
                message: "Cart item not found"
            });
        } else {
            if (formData.quantity !== undefined) {
                cartData.quantity = formData.quantity;
            }
            if (formData.status !== undefined) {
                cartData.status = formData.status;
            }

            cartData.save()
            .then((updatedData) => {
                res.json({
                    status: 200,
                    success: true,
                    message: "Cart item updated successfully",
                    data: updatedData
                });
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err
                });
            });
        }
    })
    .catch((err) => {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err
        });
    });
};


deleteCarts=(req,res)=>{
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
        CartModel.findOne({_id:formData._id})
        .then((cartData)=>{
           if(!cartData){
            res.json({
                status:404,
                success:false,
                message:"No cart found"
            })
           } else {
               CartModel.deleteOne({_id:formData._id})
               .then(()=>{
                  res.json({
                     status:200,
                     success:true,
                     message:"Cart deleted"
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

module.exports= {add, all , update ,deleteCarts}