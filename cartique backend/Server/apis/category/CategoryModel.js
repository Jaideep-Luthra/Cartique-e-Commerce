

const mongoose=require("mongoose")
let CategorySchema=mongoose.Schema({
    autoId:{type:Number, default:1},
    categoryName:{type:String, default:""},
    image:{type:String, default:"no-pic.jpg"},
    // status:{type:Number, default:1},
    //1->Pending, 2->Approve, 3->decline, 4->packed, 5->shipped, 6->delivered
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})

module.exports=mongoose.model("CategoryModel", CategorySchema)






