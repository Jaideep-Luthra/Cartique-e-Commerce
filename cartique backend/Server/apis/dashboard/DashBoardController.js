
const UserModel = require("../users/UserModel")
const OrderModel = require("../order/OrderModel")
const ReviewModel = require("../review/ReviewModel")
const EnquiryModel = require("../enquiry/EnquiryModel")
const CategoryModel = require("../category/CategoryModel")
const BrandModel = require("../brand/BrandModel")
const ProductModel = require("../product/ProductModel")


dashboard = async (req, res) => {
    try {
        let totalCustomers = await UserModel.countDocuments({ userType: 2 }).exec()
        let totalOrder = await OrderModel.countDocuments().exec()
        let totalCategory = await CategoryModel.countDocuments().exec()
        let totalBrand = await BrandModel.countDocuments().exec()
        let totalProduct = await ProductModel.countDocuments().exec()
        let totalEnquiry = await EnquiryModel.countDocuments().exec()
        // let totalPending=await OrderModel.countDocuments({orderStatus:"pending"}).exec()
        // let totalProcessing=await OrderModel.countDocuments({orderStatus:"processing"}).exec()
        // let totalDelivered=await OrderModel.countDocuments({orderStatus:"delivered"}).exec()
        // let totalCancelled= await OrderModel.countDocuments({orderStatus:"cancelled"}).exec()
        // let totalReview=await ReviewModel.countDocuments().exec()

        res.json({
            status: 200,
            success: true,
            message: "Dashboard loaded!!",
            totalCustomers: totalCustomers,
            totalOrder: totalOrder,
            totalEnquiry: totalEnquiry,
            totalCategory: totalCategory,
            totalBrand: totalBrand,
            totalProduct: totalProduct
        })
    }
    catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err
        })
    }
}


module.exports = { dashboard }


