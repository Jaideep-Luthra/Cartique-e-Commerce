

const mongoose = require("mongoose")

const EnquirySchema = mongoose.Schema({
    autoId: { type: Number, default: 1 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", default: null },
    title: { type: String, default: "" },
    message: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }

})


module.exports = mongoose.model("EnquirySchema", EnquirySchema)