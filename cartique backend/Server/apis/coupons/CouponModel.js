

const mongoose = require("mongoose")

const CouponSchema = mongoose.Schema({
    autoId: { type: Number, default: 1 },
    code: { type: String, default: "" },
    discount: { type: Number, default: 0 },
    discountType: { type: String, enum: ["flat", "percentage"], default: "flat" },
    minAmountSpent: { type: Number, default: 0 },
    expiryDate: { type: Date, default: null },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }

})


module.exports = mongoose.model("CouponSchema", CouponSchema);
