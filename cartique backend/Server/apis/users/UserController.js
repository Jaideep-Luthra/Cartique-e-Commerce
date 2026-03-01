
const UserModel = require("./UserModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const SECRET = "ClickKart123"

login = (req, res) => {
    let validation = ""
    let formData = req.body
    if (!formData.email) {
        validation += "Email is  required"
    }
    if (!formData.password) {
        validation += "  Password is required"
    }
    if (!!validation.trim()) {
        res.json({
            status: 422, // validation error
            success: false,
            message: validation
        })
    } else {
        UserModel.findOne({ email: formData.email })
            .then((userData) => {
                if (!userData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "User does not exist !"
                    })
                } else {
                    // compare the password
                    let result = bcryptjs.compareSync(formData.password, userData.password)
                    if (result) {
                        // created a simplified object from userData keeping only the 
                        // keys required 
                        let payload = {
                            userId: userData._id,
                            email: userData.email,
                            userType: userData.userType,
                            name: userData.name
                        }

                        // sign the token 
                        let token = jwt.sign(payload, SECRET, { expiresIn: "24h" })
                        res.json({
                            status: 200,
                            success: true,
                            message: "Login successfully !!",
                            token,
                            // name : userData.name ,
                            data: userData
                        })
                    } else {
                        res.json({
                            status: 200,
                            success: false,
                            message: "Invalid credentails"
                        })
                    }
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error!!"
                })
            })
    }
}

changePassword = (req, res) => {

    // console.log(req.decoded)

    let formData = req.body;
    let validation = "";
    if (!formData.oldPassword) {
        validation += "Old Password is required. ";
    }
    if (!formData.newPassword) {
        validation += "New Password is required. ";
    }
    if (!formData.confirmPassword) {
        validation += "Confirm Password is required.";
    }

    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation
        });
    } else {
        if (formData.newPassword === formData.confirmPassword) {
            UserModel.findOne({ _id: req.decoded.userId })
                .then((userData) => {
                    let result = bcryptjs.compareSync(formData.oldPassword, userData.password);
                    if (result) {
                        userData.password = bcryptjs.hashSync(formData.newPassword, 10);
                        userData.save()
                            .then(() => {
                                res.json({
                                    status: 200,
                                    success: true,
                                    message: "Password changed successfully!!"
                                });
                            })
                            .catch(() => {
                                res.json({
                                    status: 500,
                                    success: false,
                                    message: "Internal server error"
                                });
                            });

                    } else {
                        res.json({
                            status: 200,
                            success: false,
                            message: "Old Password doesn't match!"
                        });
                    }
                })
                .catch(() => {
                    res.json({
                        status: 500,
                        success: false,
                        message: "Internal server error"
                    });
                });
        } else {
            res.json({
                status: 200,
                success: false,
                message: "New password doesn't match with confirm password"
            });
        }
    }
}

all = (req, res) => {
    let formData = req.body
    let limit = formData.limit
    let currentPage = formData.currentPage
    delete formData.limit
    delete formData.currentPage
    //skip, sort, limit
    UserModel.find(formData)
        .limit(limit)
        .skip((currentPage - 1) * limit)
        // .sort({createdAt:-1})
        .then(async (userData) => {

            if (userData.length > 0) {
                let total = await UserModel.countDocuments().exec()
                res.json({
                    status: 200,
                    success: true,
                    message: "Users loaded",
                    total: total,
                    data: userData
                })
            } else {
                res.json({
                    status: 404,
                    success: false,
                    message: "No User Found!!",
                    data: userData
                })
            }

        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err
            })
        })
}

changeStatus = (req, res) => {
    // console.log("Req body for Change Status User", req.body)
    let validation = ""
    let formData = req.body
    if (!formData._id) {
        validation += "_id is required"
    }

    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        UserModel.findOne({ _id: formData._id })
            .then((userData) => {
                if (!userData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "No User found!!"
                    })
                } else {
                    
                    userData.status = formData.status
                    userData.save()
                        .then((userData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Status updated successfully",
                                data: userData
                            })
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error",
                                error: err
                            })
                        })

                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err
                })
            })
    }
}

module.exports = { login, changePassword, all, changeStatus }