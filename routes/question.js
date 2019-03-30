const express = require('express')
const router = express.Router()

const isAuth = require('../middlewares/isAuth')

const Question = require('../models/question')

router.get('/', isAuth, async (req, res, next) => {
    try {

        const questions = await Question.find()
        res.status(200).send(questions)

    }catch (e) {
        next(e)
    }
})


module.exports = router
