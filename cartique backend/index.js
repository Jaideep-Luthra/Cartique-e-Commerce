const express = require('express')
const cors = require("cors");
const app=express();
const PORT=5000;

// cors setup

// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET" , "POST" , "PUT" , "DELETE", "OPTIONS"],
//     credentials: false,
//   }));


app.use(cors());

// body-parsers
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"40mb"}))

// routes
const api=require("./Server/routes/ApiRoutes")
app.use("/api", api)
const admin=require("./Server/routes/AdminRoutes")
app.use("/admin" , admin)
const customer=require("./Server/routes/CustomerRoutes")
app.use("/customerapi", customer)
// app.use( cors());

// db
const db=require("./Server/config/db")
const seed=require("./Server/config/seed")

//api - application programming interface

// app.method(endpoint, fn)
// default route
app.get("/" , (req,res)=>{
    // console.log("data is loaded !")
    res.json({
        status:200,
        success:true,
        message:"Server is running"
    })
})


app.all("/**",(req,res)=>{
    res.status(404).json({
        status:404,
        success:false,
        message:"Not Found!!"
    })
})


// start server
app.listen(PORT , ()=>{
    console.log("Server  is running on port" , PORT)
 })