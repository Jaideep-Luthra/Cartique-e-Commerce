const jwt = require("jsonwebtoken")
const SECRET = "ClickKart123"

module.exports = (req, res, next) => {

    let token = req.headers['authorization']
    // console.log(token)
    if (!token) {
        res.json({
            status: 403,
            success: false,
            message: "No token found "
        })
    } else {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (!!err) {
                res.json({
                    status: 403,
                    success: false,
                    message: "Token not valid"
                })
            } else {
                if (decoded.userType == 1) {
                    req.decoded = decoded
                    next()
                } else {
                    res.json({
                        status: 403,
                        success: false,
                        message: "Unauthorized Access"
                    })
                }
            }
        })
    }
}