module.exports = (req, res, next) => {
    console.log('From is admin', req.userInfo)
    if (req.userInfo.isAdmin === 0) {
        return res.status(401).send({
            message: `Admin resources! Access denied`
        })
    }
    next();

}