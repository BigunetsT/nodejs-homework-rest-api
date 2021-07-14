const { contacts: service } = require('../../service/index')

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id
    const allContacts = await service.listContacts(userId, req.query)
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: { ...allContacts },
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAllContacts
