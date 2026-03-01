
const UserModel=require("../apis/users/UserModel")
//npm i bcryptjs
const bcryptjs=require("bcryptjs")
UserModel.findOne({email:"admin@gmail.com"})
.then((UserData)=>{
    if(!UserData){
        let UserObj=new UserModel()
        // let total=UserModel.countDocuments.exec()
        UserObj.autoId=1 
        UserObj.name="admin"
        UserObj.email="admin@gmail.com"
        UserObj.password=bcryptjs.hashSync("123", 10)
        UserObj.userType=1 
        UserObj.save()
        .then((UserData)=>{
            console.log("Admin seeded successfully")
        })
        .catch((err)=>{
            console.log("Error while seeding admin", err);
        })
    }else{
        console.log("Admin already exists!!");
        
    }
})
.catch((err)=>{
    console.log("Error while seeding admin",err);
})