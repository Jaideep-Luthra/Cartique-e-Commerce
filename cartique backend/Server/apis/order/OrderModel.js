const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    autoId: { type: Number, default: 1 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", default: null },
    couponApplied: { type: Boolean, default: false },
    couponId: { type: mongoose.Schema.Types.ObjectId, ref: "CouponModel", default: null },
    shippingAddress: { type: String, default: "" },
    totalAmount: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    discountedPrice: { type: Number, default: 0 },
    paymentMethod: { type: String, default: "Online" },
    orderStatus: { type: String, default: "Pending" },
    // pending, delivered, processing, confirmed, shipped, cancelled
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  },

);

// Model export
module.exports = mongoose.model("Order", orderSchema);
