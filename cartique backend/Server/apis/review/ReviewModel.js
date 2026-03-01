
const mongoose= require("mongoose")

const ReviewSchema = mongoose.Schema({
    autoId:{type:Number , default:1} ,
    userId:{type:mongoose.Schema.Types.ObjectId , ref:"UserModel" , default:null} ,
    productId:{type:mongoose.Schema.Types.ObjectId , ref:"ProductModel" , default:null} ,
    rating:{type:Number , default:""} ,
    comment:{type:String , default:""} ,
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}

})


module.exports = mongoose.model("ReviewModel", ReviewSchema);
