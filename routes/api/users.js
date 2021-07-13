const express = require('express')
const router = express.Router()
const ctrlUser = require('../../controllers/users')
const auth = require('../../helpers/auth')

router.post('/signup', ctrlUser.reg)

router.post('/login', ctrlUser.login)

router.post('/logout', auth, ctrlUser.logout)

router.post('/current', auth, ctrlUser.current)

module.exports = router
