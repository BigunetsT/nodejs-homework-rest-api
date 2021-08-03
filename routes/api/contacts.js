const express = require('express')
const router = express.Router()
const ctrlContact = require('../../controllers/contacts')
const { auth } = require('../../helpers')

router.get('/', auth, ctrlContact.getAll)

router.get('/:contactId', auth, ctrlContact.getById)

router.post('/', auth, ctrlContact.add)

router.delete('/:contactId', auth, ctrlContact.remove)

router.put('/:contactId', auth, ctrlContact.update)

router.patch('/:contactId/favorite', auth, ctrlContact.updateStatus)

module.exports = router
