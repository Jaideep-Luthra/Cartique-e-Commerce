const CategoryModel = require('./CategoryModel')
const { uploadImg } = require("../../utilities/helper")


// post or add the category 
add = (req, res) => {
    let validation = ""
    let formData = req.body
    if (!formData.categoryName) {
        validation += "Category Name is required, "
    }
    if (!req.file) {
        validation += "Image is required, "
    }
    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        // duplicacy 
        CategoryModel.findOne({ categoryName: formData.categoryName })
            .then(async (categoryData) => {
                if (!categoryData) {
                    let categoryObj = new CategoryModel()
                    // console.log(categoryObj)
                    let total = await CategoryModel.countDocuments().exec()
                    categoryObj.categoryName = formData.categoryName
                    try {
                        let url = await uploadImg(req.file.buffer)
                        categoryObj.image = url
                    }
                    catch (err) {
                        res.json({
                            status: 500,
                            success: false,
                            message: "error while uploading image !!",
                            error: err
                        })
                    }
                    categoryObj.autoId = total + 1
                    categoryObj.save()
                        .then((categoryData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Category Added!!",
                                data: categoryData
                            })
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error!",
                                error: err
                            })
                        })

                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Category already exist with same name",
                        data: categoryData
                    })
                }

            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error!",
                    error: err
                })
            })
    }


}

// get the category
all = (req, res) => {
    let formData = req.body
    let limit = formData.limit
    let currentPage = formData.currentPage
    delete formData.limit
    delete formData.currentPage
    //skip, sort, limit
    CategoryModel.find(formData)
        // CategoryModel.find({categoryName:formData.categoryName})
        .limit(limit)
        .skip((currentPage - 1) * limit)
        // .sort({createdAt:-1})
        .then(async (categoryData) => {

            if (categoryData.length > 0) {
                let total = await CategoryModel.countDocuments().exec()
                res.json({
                    status: 200,
                    success: true,
                    message: "Category loaded",
                    total: total,
                    data: categoryData
                })
            } else {
                res.json({
                    status: 404,
                    success: false,
                    message: "No Category Found!!",
                    data: categoryData
                })
            }

        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err
            })
        })
}


single = (req, res) => {
    let validation = ""
    let formData = req.body
    if (!formData._id) {
        validation += "_id id required"
    }
    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        CategoryModel.findOne({ _id: formData._id })
            .then((categoryData) => {
                if (!categoryData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "No Category Found"
                    })
                } else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Category exits",
                        data: categoryData
                    })
                }
            })

            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err
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
        const existingCategory = await CategoryModel.findOne({ _id: formData._id });

        if (!existingCategory) {
            return res.json({
                status: 404,
                success: false,
                message: "No Category found!!",
            });
        }

        let updateNeeded = false;
        let updatedFields = {};

        if (
            formData.categoryName &&
            formData.categoryName !== existingCategory.categoryName
        ) {
            updatedFields.categoryName = formData.categoryName;
            updateNeeded = true;
        }

        if (req.file && req.file.buffer) {
            try {
                let url = await uploadImg(req.file.buffer);
                updatedFields.image = url;
                updateNeeded = true;
            } catch (err) {
                // 🔴 FIX: return here to avoid duplicate res.json calls
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
                data: existingCategory,
            });
        }

        const updatedCategory = await CategoryModel.findOneAndUpdate(
            { _id: formData._id },
            { $set: updatedFields },
            { new: true }
        );

        return res.json({
            status: 200,
            success: true,
            message: "Category updated successfully!!",
            data: updatedCategory,
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



//  update=(req,res)=>{
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
//         CategoryModel.findOne({_id:formData._id})
//         .then(async (categoryData)=>{
//             if(!categoryData){
//                 res.json({
//                     status:404,
//                     success:false,
//                     message:"No Category found!!"
//                 })
//             }else{
//                 if(!!formData.categoryName){
//                     categoryData.categoryName=formData.categoryName 
//                 }
//                 try{
//                     let url=await uploadImg(req.file.buffer)
//                     categoryData.image=url
//                   }
//                   catch(err){
//                     res.json({
//                         status:500,
//                         success:false,
//                         message:"error while uploading image !!",
//                         error:err
//                     })
//                 }
//                categoryData.save()
//                .then((categoryData)=>{
//                     res.json({
//                         status:200,
//                         success:true,
//                         message:"Category updated successfully!!",
//                         data:categoryData
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

// }


changeStatus = (req, res) => {
    // console.log("Req body for Change Status Category", req.body)
    let validation = ""
    let formData = req.body
    if (!formData._id) {
        validation += "_id is required"
    }

    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        CategoryModel.findOne({ _id: formData._id })
            .then((categoryData) => {
                if (!categoryData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "No Category found!!"
                    })
                } else {
                    // brandData.status=!brandData.status 
                    categoryData.status = formData.status
                    categoryData.save()
                        .then((categoryData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Status updated successfully",
                                data: categoryData
                            })
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error",
                                error: err
                            })
                        })

                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err
                })
            })
    }
}


// named exports 
module.exports = { add, all, single, update, changeStatus }