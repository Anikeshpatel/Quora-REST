const mongoose = require('mongoose')
const Schema = mongoose.Schema


const answerSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    answer: {
        type: String,
        required: true
    },
    upVotes: {
        type: Number,
        default: 0
    }
})

const questionSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    question: {
        type: String,
        required: true
    },
    answers: [
        {
            type: answerSchema
        }
    ]
})

module.exports = mongoose.model('Question', questionSchema)