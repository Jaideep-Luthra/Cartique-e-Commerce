
const multer=require("multer")

const CategoryController=require("../apis/category/CategoryController")
const ProductController=require("../apis/product/ProductController")
const BrandController=require("../apis/brand/BrandController")
const UserController=require("../apis/users/UserController")
const EnquiryController = require("../apis/enquiry/EnquiryController")
const ReviewController = require("../apis/review/ReviewController")
const CustomerRegisterController=require("../apis/customer/CustomeRegisterController")
const CouponController=require("../apis/coupons/CouponController")
const OrderController=require("../apis/order/OrderController")
const DashBoardController=require("../apis/dashboard/DashBoardController")

//express provides routing feature
const router=require("express").Router()

// no auth required - >   no reg. because already admin insert in db due to admin-seed

// token checker 
router.use(require("../middleware/AdminTokenChecker"))

// route for dashboard
router.post("/dashboard/view" , DashBoardController.dashboard)

// route  for customer
router.post("/view/all" , CustomerRegisterController.all)
router.post("/customer/single" , CustomerRegisterController.single)
router.post("/customer/status" , CustomerRegisterController.changeStatus)


// // route for enquiry
router.post("/enquiry/all" , EnquiryController.all)

// route for review
router.post("/review/all" , ReviewController.all)


// route for coupon
router.post("/coupon/all" , CouponController.all)

// route for order
router.post("/order/all" , OrderController.all)

// route for order
router.post("/order/update" , OrderController.update)
router.post("/order/changeStatus" ,OrderController.changeStatus)


// routes for product 
const productStorage = multer.memoryStorage()
const productUpload = multer({storage:productStorage})
router.post("/product/add",
productUpload.single("image") ,  ProductController.add)
const productUpdateStorage = multer.memoryStorage()
const productUploads = multer({storage:productUpdateStorage})
router.post("/product/update",
productUploads.single("image") , ProductController.update)
router.post("/product/changeStatus" , ProductController.changeStatus)
router.post("/product/view" ,ProductController.all )
router.post("/product/single" , ProductController.single)

// route for coupon
router.post("/coupon/add" , CouponController.add)
router.post("/coupon/single" , CouponController.single)
router.post("/coupon/update" , CouponController.update)
router.post("/coupon/changeStatus" , CouponController.changeStatus)

// routes for brand
const brandStorage = multer.memoryStorage() // buffer object
const brandUpload = multer({storage: brandStorage})
router.post("/brand/add",
brandUpload.single("image") , BrandController.add)
const brandUpdateStorage = multer.memoryStorage()
const brandUploads = multer({storage:brandUpdateStorage})
router.post("/brand/update", 
brandUploads.single("image") ,BrandController.update)
router.post("/brand/changeStatus", BrandController.changeStatus)
router.post("/brand/view" , BrandController.all)
router.post("/brand/single" , BrandController.single)
// router.get("/brand/deleteByParams/:id", BrandController.deleteBrand)


// routes for category
const categoryStorage = multer.memoryStorage()
const categoryUpload = multer({storage:categoryStorage})
router.post("/category/add",
categoryUpload.single("image") ,CategoryController.add )
const categoryUpdate = multer.memoryStorage()
const categoryUploads =  multer({storage:categoryUpdate})
router.post("/category/update" ,
categoryUploads.single("image"), CategoryController.update)
router.post("/category/changeStatus" , CategoryController.changeStatus)
router.post("/category/view" , CategoryController.all)
router.post("/category/single" , CategoryController.single)

// route for users
router.post("/user/all" , UserController.all)
router.post("/user/changeStatus" , UserController.changeStatus)

// route for enquiry
router.post("/enquiry/all" , EnquiryController.all)
router.post("/enquiry/delete" , EnquiryController.deleteEnquiry)


// route for  review
router.post("/review/delete" , ReviewController.deleteReview)

// route for order
// router.post("/order/add" , OrderController.add)
router.post("/order/all" , OrderController.all)
router.post("/order/single" , OrderController.single)
// router.post("/order/update" , OrderController.update)
router.post("/order/changeStatus" , OrderController.changeStatus)
router.post("/order/orderDetail" , OrderController.orderDetail)

module.exports=router 