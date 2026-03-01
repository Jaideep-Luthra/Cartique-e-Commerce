const mongoose=require('mongoose')

let ProductSchema=mongoose.Schema({
    autoId:{type:Number, default:1},
    name:{type:String , default:""},
    description:{type:String , default:""} ,
    price:{type:Number , default:""},
    categoryId:{type:mongoose.Schema.Types.ObjectId , ref:"CategoryModel" , default:null},
    brandId:{type:mongoose.Schema.Types.ObjectId , ref:"BrandModel" , default:null} ,
    tags:{type:String, default:""},
    rating:{type:Number , default:""},
    image:{type:String , default:"no-pic.jpg"},
    stock:{type:Number , default:""},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}

})

module.exports=mongoose.model("ProductModel", ProductSchema)