const jwt = require('jsonwebtoken')

const User = require('../models/user')

module.exports = async (req, res, next) => {
    const token = req.get('Authorization')
    if (!token) {
        return res.status(401).json({
            message: 'Not authenticated.'
        })
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'quora-developer-anikesh');
    } catch (err) {
        return res.status(500).json({
            message: 'Not authenticated.'
        })
    }
    if (!decodedToken) {
        return res.status(500).json({
            message: 'Not authenticated.'
        })
    }
    const user = await User.findById(decodedToken.userId)
    if (!user) {
        return res.status(404).json({
            message: 'Wrong Credentials'
        })
    }
    req.userId = decodedToken.userId;
    next();
}
