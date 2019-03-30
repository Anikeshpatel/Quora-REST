const express = require('express')
const path = require('path')
const logger = require('morgan')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const questionRoutes = require('./routes/question')

const app = express()

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
app.get('/', (req, res) => {
    res.send("<h1 align='center'>Quora Clone</h1>")
})

app.use('/question', questionRoutes)
app.use('/user', userRoutes)
app.use('/auth', authRoutes)

app.use((err, req, res, next) => {
    console.log(err.message)
    const status = err.statusCode || 500
    const msg = err.message
    const data = err.data
    res.status(status).json({
        msg,
        data
    })
})
mongoose.connect(`mongodb://${process.env.MongoUser}:${process.env.MongoPassword}@ds127376.mlab.com:27376/quora`, {
    useNewUrlParser: true
}).then(() => {
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    });
}).catch((err) => console.log(err.message))
