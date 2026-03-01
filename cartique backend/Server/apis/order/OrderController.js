const OrderModel = require("../order/OrderModel")
const UserModel = require("../users/UserModel")
const CartModel = require("../cart/CartModel")
const OrderDetailsModel = require("../orderdetails/OrderDetailModel")
const CouponModel = require("../coupons/CouponModel")
const nodemailer = require("nodemailer"); // <-- Nodemailer import
const Razorpay = require('razorpay')
const OrderDetailModel = require("../orderdetails/OrderDetailModel")


add = async (req, res) => {
    let validation = "";
    let formData = req.body;

    if (!formData.shippingAddress) validation += "Shipping address is required. ";
    if (formData.couponApplied && !formData.couponId) validation += "Coupon ID is required. ";
    // if (!formData.paymentMethod) validation += "Payment method is required. ";
    // if (!formData.orderStatus) validation += "Order status is required. ";

    if (!!validation.trim()) {
        return res.json({
            status: 422,
            success: false,
            message: validation.trim()
        });
    }

    try {
        let totalOrderCount = await OrderModel.countDocuments().exec();
        let orderObj = new OrderModel();
        orderObj.autoId = totalOrderCount + 1;
        orderObj.userId = req.decoded.userId;
        orderObj.shippingAddress = formData.shippingAddress;
        orderObj.paymentMethod = formData.paymentMethod;
        orderObj.orderStatus = formData.orderStatus;
        orderObj.couponApplied = formData.couponApplied || false;
        orderObj.couponId = formData.couponApplied ? formData.couponId : null;

        // : Cart Data
        let cartData = await CartModel.find({ addedById: req.decoded.userId }).populate("productId");

        if (!cartData.length) {
            return res.json({
                status: 200,
                success: false,
                message: "No items in cart."
            });
        }

        let totalAmount = 0;

        for (let i = 0; i < cartData.length; i++) {
            totalAmount += parseInt(cartData[i].productId.price) * parseInt(cartData[i].quantity);

            let totalOrderDetails = await OrderDetailsModel.countDocuments().exec();

            let orderDetailsObj = new OrderDetailsModel({
                autoId: totalOrderDetails + 1,
                productId: cartData[i].productId._id,
                quantity: cartData[i].quantity,
                orderId: orderObj._id
            });

            await orderDetailsObj.save();
        }

        //  Coupon Calculation (if coupon applied)
        let discount = 0;
        if (formData.couponApplied && formData.couponId) {
            const couponData = await CouponModel.findById(formData.couponId);
            if (couponData) {
                if (couponData.discountType === "flat") {
                    discount = couponData.discount;
                } else if (couponData.discountType === "percentage") {
                    discount = (couponData.discount / 100) * totalAmount;
                }
            }
        }

        //  Final amounts
        orderObj.totalAmount = totalAmount;
        orderObj.discount = Math.floor(discount);
        orderObj.discountedPrice = Math.floor(totalAmount - discount);

        //  Save Order
        await orderObj.save();

        //: Empty cart
        await CartModel.deleteMany({ addedById: req.decoded.userId });

        let _id = orderObj._id
        const r = await OrderModel.findById(_id);

        if (!r) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        // Razorpay order creation
        const razorpay = new Razorpay({
            key_id: 'rzp_test_81m41n13O8OvjC',
            key_secret: '0yEv1mJbIxS9SowEyrJ1DtTK',
        });

        const options = {
            amount: totalAmount * 100, // Razorpay expects amount in paise
            currency: "INR",
            receipt: "receipt_order_" + new Date().getTime(),
        };

        const order = await razorpay.orders.create(options);

        r.paymentType = "online";
        r.paymentStatus = "paid";
        await r.save();

        res.json({
            status: 200,
            success: true,
            message: "Order placed successfully.",
            data: orderObj,
            totalAmount,
            orderData: order
        });

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'neeta5094@gmail.com',
                pass: 'xffj qumh rsdi kccl'
            }
        });

        // Send mail
        let mailOptions = {
            from: 'neeta5094@gmail.com',
            // to: 'neetakumari7488@gmail.com',
            to: 'o7services003@gmail.com',
            subject: 'Order Placed Successfully',
            html: `
                <h1>Order Confirmation</h1>
                <h2>Thank you for your order!</h2>
                <p><strong>Order ID:</strong> ${orderObj.autoId}</p>
                <p><strong>Total Amount:</strong> ₹${orderObj.totalAmount}</p>
                <p><strong>Discount:</strong> ₹${orderObj.discount}</p>
                <p><strong>Final Amount:</strong> ₹${orderObj.discountedPrice}</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending mail: ', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error!",
            error: err
        });
    }
};

all = async (req, res) => {
    try {
        let formData = req.body;
        const limit = parseInt(formData.limit) || 10;
        const currentPage = parseInt(formData.currentPage) || 1;
        delete formData.limit;
        delete formData.currentPage;

        const orderObj = await OrderModel.find(formData)
            // .limit(limit)
            // .skip((currentPage - 1) * limit)
            .populate({
                path: 'userId',
                select: 'email',  // Only populate email field from the user
            });
        const total = await OrderModel.countDocuments(formData);

        if (orderObj.length > 0) {
            res.json({
                status: 200,
                success: true,
                message: "Orders loaded",
                total,
                data: orderObj,
            });
        } else {
            res.json({
                status: 404,
                success: false,
                message: "No Orders Found!",
                data: []
            });
        }

    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err
        });
    }
};

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
        OrderModel.findOne({ _id: formData._id })
            .then((orderObj) => {
                if (!orderObj) {

                } else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Order exists",
                        data: orderObj
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

update = (req, res) => {
    let formData = req.body
    let validation = ""
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
        OrderModel.findOne({ _id: formData._id })
            .then((orderObj) => {
                if (!orderObj) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "No Order found!!"
                    })
                } else {
                    if (!!formData.shippingAddress) {
                        orderObj.shippingAddress = formData.shippingAddress
                    }
                    if (!!formData.discount) {
                        orderObj.discount = formData.discount
                    }
                    if (!!formData.discountedPrice) {
                        orderObj.discountedPrice = formData.discountedPrice
                    }
                    if (!!formData.paymentMethod) {
                        orderObj.paymentMethod = formData.paymentMethod
                    }
                    if (!!formData.orderStatus) {
                        orderObj.orderStatus = formData.orderStatus
                    }
                    orderObj.save()
                        .then((orderObj) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Order updated successfully!!",
                                data: orderObj
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
        OrderModel.findOne({ _id: formData._id })
            .then((orderObj) => {
                if (!orderObj) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "No Order found!!"
                    })
                } else {
                    orderObj.orderStatus = formData.orderStatus
                    orderObj.save()
                        .then((orderObj) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Status updated successfully",
                                data: orderObj
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

orderDetail = (req, res) => {
    let validation = ""
    let formData = req.body
    if (!formData.orderId) {
        validation += "Order Id is required"
    }
    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        OrderDetailModel.find({ orderId: formData.orderId })
            .populate('orderId')
            .populate('productId')
            .then((orderObj) => {
                if (!orderObj) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "No Order details found"
                    })
                } else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Order details",
                        data: orderObj
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err.message
                })
            })
    }
}

module.exports = { add, all, single, update, changeStatus, orderDetail };


