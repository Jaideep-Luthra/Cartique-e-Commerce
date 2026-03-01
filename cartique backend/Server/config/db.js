// the password of atlas mongodb : c8Q9aVS8Dktd1J9S

const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/Clickcart")
// mongoose.connect("mongodb+srv://neeta5094:c8Q9aVS8Dktd1J9S@cluster0.w1xsdwh.mongodb.net/Clickcart")
.then(()=>{
    console.log("Database is connected!!")
})

.catch((err)=>{
    console.log("Error while database connected" , err)
})