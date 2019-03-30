const jwt = require('jsonwebtoken')

const User = require('../models/user')

module.exports = async (req, res, next) => {
    const token = req.get('Authorization')
    if (!token) {
        const error = new Error('Not authenticated.')
        error.statusCode = 401
        throw error
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'quora-developer-anikesh');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const user = await User.findById(decodedToken.userId)
    if (!user) {
        const error = new Error('Wrong Credentials');
        error.statusCode = 404;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}
