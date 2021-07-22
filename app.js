const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { apiLimit, jsonLimit } = require('./config/rate-limit.json')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const apiLimiter = rateLimit({
  windowMs: apiLimit.windowMs, // 15 * 60 * 1000 = 15 minutes
  max: apiLimit.max,
})

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: jsonLimit }))
app.use(helmet())
app.use('/api/', apiLimiter)

const usersRouter = require('./routes/api/users')
app.use('/api/users', usersRouter)

const contactsRouter = require('./routes/api/contacts')
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
