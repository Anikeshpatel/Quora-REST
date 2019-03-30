const express = require('express')

const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post('/signup', async (req, res, next) => {
    try {
        const isAlreadyHaveUser = await User.findById(req.body.email)
        if (isAlreadyHaveUser) {
            return res.status(401).json({
                message: "Already Have a Account With This Email"
            })
        }
        const passwd = await bcrypt.hash(req.body.password, 10)
        let user = new User({
            _id: req.body.email,
            name: req.body.name,
            auth: {
                email: req.body.email,
                password: passwd
            }
        })

        user = await user.save()
        const token = jwt.sign({
            userId: user._id
        }, 'quora-developer-anikesh', {
            expiresIn: '150d'
        })
        res.status(201).json({
            msg: "User Signup Success!",
            userId: user._id,
            token: token
        })
    }catch (e) {
        next(e)
    }
})

router.post('/login', async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findById(email)
    if (!user) {
        return res.status(200).json({
            message: "Wrong credentials"
        })
    }else {
        try {
            const isPasswdEqual = await bcrypt.compare(password, user.auth.password)
            if (!isPasswdEqual) {
                return res.status(200).json({
                    message: "Wrong credentials"
                })
            }
            const token = jwt.sign({
                userId: user._id.toString()
            }, 'quora-developer-anikesh', {
                expiresIn: '365d'
            })

            res.status(200).json({
                token: token,
                userId: user._id
            })
        }catch (e) {
            e.message = "Login Failed"
            next(e)
        }
    }
})

module.exports = router