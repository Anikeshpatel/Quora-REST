const express = require('express')

const router = express.Router()

const isAuth = require('../middlewares/isAuth')

const User = require('../models/user')

router.get('/users', isAuth, async (req, res, next) => {
    const users = await User.find()
    return res.status(200).send(users)
})

router.get('/:userId', isAuth, async (req, res, next) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).send(user)
    }catch (e) {
        next(e)
    }
})

module.exports = router