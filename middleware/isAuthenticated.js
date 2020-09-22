const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).send({
            message: `Unauthorized! Access denied!`
        })
    }
    // console.log(authHeader)
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        next(error);
    }

    console.log(decodedToken);

    if (!decodedToken) {
        return res.status(401).send({
            message: `Not authorized! Access denied!`
        })
    }

    req.userInfo = decodedToken; // We pass the decodedToken in the req object with 
    // the name of userInfo.
    next();
}
