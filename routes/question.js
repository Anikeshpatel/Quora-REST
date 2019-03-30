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

router.post('/', isAuth, async (req, res, next) => {
    try {

        let question = new Question({
            author: req.userId,
            question: req.body.question
        })

        question = await question.save()

        res.status(200).send(question)

    } catch (e) {
        next(e)
    }
})

router.put('/:queId/answer', isAuth, async (req, res, next) => {
    try {

        const questionId = req.params.queId
        const answer = {
            author: req.userId,
            answer: req.body.answer
        }

        const question = await Question.findById(questionId)
        if (!question) {
            return res.status(404).json({
                message: "No Question Found"
            })
        }
        question.answers.push(answer)
        await question.save()
        res.status(200).send(question)

    }catch (e) {
        next(e)
    }
})

router.put('/:queId/:answerId/upVote', isAuth, async (req, res, next) => {
    try {

        const questionId = req.params.queId
        const answerId = req.params.answerId
        const question = await Question.findById(questionId)
        if (!question) {
            return res.status(404).json({
                message: "No Question Found"
            })
        }
        question.answers.map(async (answer) => {
            if (answer._id.toString() === answerId) {
                answer.upVotes = answer.upVotes + 1
                await question.save()
            }
        })

        return res.status(200).json({
            message: "Done"
        })

    }catch (e) {
        next(e)
    }
})

module.exports = router
