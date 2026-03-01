

const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
    autoId:{type:Number , default:1},
    name:{type:String , default:""} ,
    email:{type:String , default:""} ,
    password:{type:String,default:""},
    userType:{type:Number , default:2} ,
    // 1-> admin, 2-> customer
    status:{type:Boolean , default:true} ,
    createAt:{type:Date , default:Date.now()} ,
})


module.exports=mongoose.model("UserModel" , UserSchema)