const express = require('express')

const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/signup', async (req, res) => {
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
})

router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findById(email)
    if (!user) {
        return res.status(200).json({
            message: "Wrong credentials"
        })
    }else {
        const isPasswdEqual = await bcrypt.compare(password, user.password)
        if (!isPasswdEqual) {
            return res.status(200).json({
                message: "Wrong credentials"
            })
        }
        const token = jwt.sign({
            userId: user._id.toString()
        }, 'love@loverz', {
            expiresIn: '365d'
        })

        res.status(200).json({
            token: token,
            userId: user._id
        })
    }
})

module.exports = router