
// firstname , lastname , dob, gender , 
const mongoose=require("mongoose")

const CustomerSchema=mongoose.Schema({
    autoId:{type:Number , default:1},
    firstName:{type:String , default:""} ,
    lastName:{type:String , default:''} ,
    dateOfBirth:{type:String , default:""},
    gender:{type:String , default:""} ,
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"UserModel", default:null},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}

})


module.exports = mongoose.model("CustomerModel", CustomerSchema)