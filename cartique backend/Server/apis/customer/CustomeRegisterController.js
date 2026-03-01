

const UserModel = require("../users/UserModel")
const CustomerModel = require("./CustomerRegisterModel")
const bcryptjs = require("bcryptjs")


register = (req, res) => {
    // usermodel , customermodel
    let validation = ""
    let formData = req.body
    if (!formData.firstName) {
        validation += "First Name is required"
    }
    if (!formData.lastName) {
        validation += "Last Name is required"
    }
    if (!formData.dateOfBirth) {
        validation += "Date of birth is required"
    }
    if (!formData.gender) {
        validation += "Gender is required"
    }
    if (!formData.email) {
        validation += "Email is required"
    }
    if (!formData.password) {
        validation += "Password is required"
    }
    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        // duplicy 
        UserModel.findOne({ email: formData.email })
            .then(async (userData) => {
                if (!userData) {
                    // insert the usermodel then customer model
                    let userTotal = await UserModel.countDocuments().exec()
                    let userObj = new UserModel()
                    userObj.autoId = userTotal + 1
                    // userObj.name=formData.name
                    userObj.name = formData.firstName + " " + formData.lastName
                    userObj.email = formData.email
                    userObj.password = bcryptjs.hashSync(formData.password, 10)
                    userObj.userType = 2
                    userObj.save()
                        .then(async (userData) => {
                            // insert into customer model
                            let customerTotal = await
                                CustomerModel.countDocuments().exec()
                            let customerObj = new CustomerModel()
                            customerObj.autoId = customerTotal + 1
                            customerObj.firstName = formData.firstName
                            customerObj.lastName = formData.lastName
                            customerObj.dateOfBirth = formData.dateOfBirth
                            customerObj.gender = formData.gender
                            customerObj.userId = userData._id
                            customerObj.save()
                                .then((customerData) => {
                                    res.json({
                                        status: 200, // created
                                        success: true,
                                        message: "Customer registered  Successfully !!",
                                        customerData,
                                        userData
                                    })
                                })
                                .catch((err) => {
                                    res.json({
                                        status: 500,
                                        success: false,
                                        message: "Internal server error!!",
                                        error: err
                                    })
                                })
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error!!",
                                error: err
                            })
                        })
                } else {
                    res.json({
                        status: 200,
                        success: false,
                        message: "User already exist",
                        data: userData
                    })
                }

            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: 'Internal server error!!',
                    error: err
                })
            })
    }
}


all = (req, res) => {
    let formData = req.body
    let limit = formData.limit
    let currentPage = formData.currentPage
    delete formData.limit
    delete formData.currentPage
    CustomerModel.find(formData)
        .limit(limit)
        .skip((currentPage - 1) * limit)
        .then(async (customerData) => {
            if (customerData.length > 0) {
                let total = await CustomerModel.countDocuments().exec();
                res.json({
                    status: 200,
                    success: true,
                    message: "Customers loaded",
                    total: total,
                    data: customerData
                });
            } else {
                res.json({
                    status: 404,
                    success: false,
                    message: "No Customer Found",
                    data: []
                });
            }
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err
            });
        });
};



single = (req, res) => {
    let validation = ""
    let formData = req.body
    if (!formData._id) {
        validation += "id is required"
    }

    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        CustomerModel.findOne({ _id: formData._id })
            .then((customerData) => {
                if (!customerData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: validation
                    })
                } else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Customer exists",
                        data: customerData
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


update = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "id is required"
    }
    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        CustomerModel.findOne({ _id: formData._id })
            .then((customerData) => {
                if (!customerData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "No Customer found"
                    })
                } else {
                    if (!!formData.firstName) {
                        customerData.firstName = formData.firstName
                    }
                    if (!!formData.lastName) {
                        customerData.lastName = formData.lastName
                    }
                    if (!!formData.dateOfBirth) {
                        customerData.dateOfBirth = formData.dateOfBirth
                    }
                    if (!!formData.gender) {
                        customerData.gender = formData.gender
                    }
                    customerData.save()
                        .then((customerData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Profile updated successfully !!",
                                data: customerData
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



changeStatus = (req, res) => {
    let validation = ""
    let formData = req.body
    if (!formData._id) {
        validation += "id is required"
    }

    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    } else {
        CustomerModel.findOne({ _id: formData._id })
            .then((customerData) => {
                if (!customerData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "No Brand found!!"
                    })
                } else {
                    customerData.status = formData.status
                    customerData.save()
                        .then((customerData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Status updated successfully",
                                data: customerData
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


profile = (req, res) => {

    CustomerModel.findOne({ userId: req.decoded.userId })
        .populate("userId")
        .then((customerData) => {
            if (!customerData) {
                res.json({
                    status: 404,
                    success: false,
                    message: validation
                })
            } else {
                res.json({
                    status: 200,
                    success: true,
                    message: "Customer exists",
                    data: customerData
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

module.exports = { register, all, single, update, changeStatus, profile }
