const jwt = require("jsonwebtoken")
const SECRET = "ClickKart123"

module.exports = (req, res, next) => {
    let authHeader = req.headers.authorization;
    // console.log(authHeader)
    if (!authHeader) {
        return res.status(403).json({
            status: 403,
            success: false,
            message: "No token found!!"
        });
    }

    // ✅ Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];
    // console.log(token)
    jwt.verify(authHeader, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "Token not valid"
            });
        }

        req.decoded = decoded;
        next();
    });
}
