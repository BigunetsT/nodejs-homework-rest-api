const { users: service } = require('../../service/index')

const logout = async (req, res, next) => {
  try {
    const id = req.user.id
    const user = await service.findById(id)
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
        data: 'Unauthorized',
      })
    }
    await service.updateToken(id, null)
    return res.status(204).json({
      status: 'success',
      code: 204,
      data: 'No Content',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = logout
