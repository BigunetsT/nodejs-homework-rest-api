const mongoose = require('mongoose')
const app = require('../app')
const { createFolderIsNotExist } = require('../helpers')
require('dotenv').config()

const PORT = process.env.PORT || 4000
const { DB_HOST } = process.env
const {
  constants: { tempDir, avatarDir },
} = require('../helpers')

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connection successful')
    createFolderIsNotExist(tempDir)
    createFolderIsNotExist(avatarDir)
    app.listen(PORT)
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
