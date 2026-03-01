
const CategoryController = require("../apis/category/CategoryController")
const ProductController = require("../apis/product/ProductController")
const BrandController = require("../apis/brand/BrandController")
const CustomerRegisterController = require("../apis/customer/CustomeRegisterController")
const UserController = require("../apis/users/UserController")
const CartController = require("../apis/cart/CartController")
// const EnquiryController = require("../apis/enquiry/EnquiryController")
// const EnquiryController=require("../apis/enquiry/EnquiryController")


//express provides routing feature
const router = require("express").Router()

//auth apis
router.post("/customer/register", CustomerRegisterController.register)
router.post("/user/login", UserController.login)

router.use(require("../middleware/TokenChecker"))

// routes for brand
router.post("/brand/all", BrandController.all)
router.post("/brand/single", BrandController.single)

// routes for category
router.post("/category/all", CategoryController.all)
router.post("/category/single", CategoryController.single)

// routes for product 
router.post("/product/all", ProductController.all)
router.post("/product/single", ProductController.single)

// route for cart     
router.post("/cart/all", CartController.all)

// route for enquiry
// router.post("/enquiry/all" , EnquiryController.all)

// route for enquiry
// router.post("/enquiry/all" , EnquiryController.all)

router.post("/password/change", UserController.changePassword)



module.exports = router 