const ProductModel = require("./ProductModel")
const CategoryModel = require("../category/CategoryModel")
const BrandModel = require("../brand/BrandModel")
const { uploadImg } = require("../../utilities/helper")


add = async (req, res) => {
    let validation = ""
    let formData = req.body
    if (!formData.categoryId) {
        validation += "CategoryId  is required"
    }
    if (!formData.brandId) {
        validation += " BrandId is required"
    }
    if (!formData.name) {
        validation += " Product name is required"
    }
    if (!formData.price) {
        validation += " Price is required"
    }
    if (!formData.tags) {
        validation += " Tags is required"
    }
    if (!formData.rating) {
        validation += " Rating is required"
    }
    if (!formData.stock) {
        validation += " Stock  is required"
    }
    if (!formData.description) {
        validation += " Description is required"
    }

    if (!req.file) {
        validation += "Image is required"
    }

    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        let total = await ProductModel.countDocuments().exec()
        let productObj = new ProductModel()
        productObj.name = formData.name?.toLowerCase()
        productObj.description = formData.description
        productObj.categoryId = formData.categoryId
        productObj.brandId = formData.brandId
        productObj.price = formData.price
        productObj.tags = formData.tags
        productObj.rating = formData.rating
        productObj.stock = formData.stock
        try {
            let url = await uploadImg(req.file.buffer)
            productObj.image = url
        }
        catch (err) {
            res.json({
                status: 500,
                success: false,
                message: "error while uploading image!!"
            })
        }
        productObj.autoId = total + 1
        productObj.save()
            .then((productData) => {
                res.json({
                    status: 200,
                    success: true,
                    message: "Product data Added",
                    data: productData

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
}


all = (req, res) => {
    // console.log(req.body)
    let formData = req.body
    let limit = formData.limit
    let currentPage = formData.currentPage
    delete formData.limit
    delete formData.currentPage
    //skip, sort, limit
    if(formData.name){
        formData={...formData, name:formData.name.toLowerCase()}
    }
    ProductModel.find(formData)
        .populate("categoryId")
        .populate("brandId")
        //  .populate({
        //     path:"brandId" ,
        //     select:"brandName image"
        //  })
        .limit(limit)
        .skip((currentPage - 1) * limit)
        // .sort({createdAt:-1})
        .then(async (productData) => {
            if (productData.length > 0) {
                let total = await ProductModel.countDocuments().exec()
                res.json({
                    status: 200,
                    success: true,
                    message: "Product loaded",
                    total: total,
                    data: productData
                })
            } else {
                res.json({
                    status: 404,
                    success: false,
                    message: "No product Found!!",
                    data: productData
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
        validation += "_id is required"
    }
    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        ProductModel.findOne({ _id: formData._id })
            .populate("categoryId")
            .populate("brandId")
            .then((productData) => {
                if (!productData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "No Product found"
                    })
                } else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Product exists",
                        data: productData
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


const update = async (req, res) => {
    let formData = req.body;
    let validation = "";

    if (!formData._id) {
        validation += "_id is required";
    }

    if (validation.trim()) {
        return res.json({
            status: 422,
            success: false,
            message: validation
        });
    }

    try {
        let productData = await ProductModel.findOne({ _id: formData._id });

        if (!productData) {
            return res.json({
                status: 404,
                success: false,
                message: "No Product found"
            });
        }

        // Update fields if they exist in formData
        if (formData.name) productData.name = formData.name;
        if (formData.description) productData.description = formData.description;
        if (formData.price) productData.price = formData.price;
        if (formData.tags) productData.tags = formData.tags;
        if (formData.rating) productData.rating = formData.rating;
        if (formData.stock) productData.stock = formData.stock;

        // Upload image if present
        if (req.file && req.file.buffer) {
            try {
                let url = await uploadImg(req.file.buffer); // Assuming uploadImg returns image URL
                productData.image = url;
            } catch (err) {
                return res.json({
                    status: 500,
                    success: false,
                    message: "Error while uploading image !!",
                    error: err?.message || err
                });
            }
        }

        const updatedProduct = await productData.save();

        return res.json({
            status: 200,
            success: true,
            message: "Product updated successfully!!",
            data: updatedProduct
        });

    } catch (err) {
        return res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err?.message || err
        });
    }
};


changeStatus = (req, res) => {
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
        ProductModel.findOne({ _id: formData._id })
            .then((productData) => {
                if (!productData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "No Product found!!"
                    })
                } else {
                    productData.status = formData.status
                    productData.save()
                        .then((productData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Status updated successfully",
                                data: productData
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

module.exports = { add, all, single, update, changeStatus }