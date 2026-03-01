
// const multer=require("multer")

const CartController = require("../apis/cart/CartController")
const BrandController = require("../apis/brand/BrandController")
const CategoryController = require("../apis/category/CategoryController")
const ProductController = require("../apis/product/ProductController")
const EnquiryController = require("../apis/enquiry/EnquiryController")
const ReviewController = require("../apis/review/ReviewController")
const CustomerRegisterController = require("../apis/customer/CustomeRegisterController")
const OrderController = require("../apis/order/OrderController")

const router = require("express").Router()

//auth apis ....

// route for customer
router.post("/customer/register", CustomerRegisterController.register)


// routes for brand
router.post("/brand/view", BrandController.all)
router.post("/brand/single", BrandController.single)

// route for category
router.post("/category/view", CategoryController.all)
router.post("/category/single", CategoryController.single)

// route for product
router.post("/product/view", ProductController.all)
router.post("/product/single", ProductController.single)

router.use(require("../middleware/CustomerTokenChecker"))

//routes for customer 
router.post("/customer/profile", CustomerRegisterController.profile)
router.post("/customer/single", CustomerRegisterController.single)
router.post("/customer/update", CustomerRegisterController.update)

// route for cart
router.post("/cart/add", CartController.add)
router.post("/cart/all", CartController.all)
router.post("/cart/update", CartController.update)
// router.delete("/cart/deleteByParams/:_id" , CartController.deleteCarts)
router.post("/cart/delete", CartController.deleteCarts)

// route for order
router.post("/order/add", OrderController.add)
router.post("/order/all", OrderController.all)
router.post("/order/single", OrderController.single)
// router.post("/order/update" , OrderController.update)
router.post("/order/changeStatus", OrderController.changeStatus)
router.post("/order/orderDetail", OrderController.orderDetail)

// route for enquiry
router.post("/enquiry/add", EnquiryController.add)
router.post("/enquiry/all", EnquiryController.all)

// route for review
router.post("/review/add", ReviewController.add)
router.post("/review/all", ReviewController.all)

module.exports = router