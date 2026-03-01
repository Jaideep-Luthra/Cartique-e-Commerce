

const mongoose = require("mongoose")
let OrderDetailsSchema = mongoose.Schema({
    autoId: { type: Number, default: 1 },
    orderId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Order" },
    productId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "ProductModel" },
    quantity: { type: Number, default: 1 },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model("OrderDetailsModel", OrderDetailsSchema)