const current = async (req, res, next) => {
  try {
    const { email, subscription, avatarURL } = req.user

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        email,
        subscription,
        avatarURL,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = current
