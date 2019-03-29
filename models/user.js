const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxLength: 30
    },
    auth: {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        }
    },
    pic: {
        originalUrl: String,
        thumbUrl: String,
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    upVotePosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
})

module.exports = mongoose.model('User', userSchema)
