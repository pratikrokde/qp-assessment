

function isAdmin(req, res, next) {
    let role = req.headers['role'];

    if (role === 'admin') {
        next();
    } else {
        res.status(401).send({
            error: true,
            message: 'Not Authorized'
        })
    }

}

module.exports = isAdmin;