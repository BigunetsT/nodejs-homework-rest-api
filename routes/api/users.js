const express = require('express')
const router = express.Router()
const ctrlUser = require('../../controllers/users')
const auth = require('../../helpers/auth')
const uploadMiddleware = require('../../helpers/uploadMiddleware')

router.post('/signup', ctrlUser.reg)

router.post('/login', ctrlUser.login)

router.post('/logout', auth, ctrlUser.logout)

router.post('/current', auth, ctrlUser.current)

router.patch('/subscription', auth, ctrlUser.updateSubscription)

router.patch(
  '/avatars',
  auth,
  uploadMiddleware.single('avatar'),
  ctrlUser.updateAvatar
)

router.get('/verify/:verificationToken', ctrlUser.verify)

module.exports = router
