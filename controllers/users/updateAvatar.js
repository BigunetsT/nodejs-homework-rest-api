const Jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')
const { users: service } = require('../../service/index')
const { avatarDir } = require('../../helpers/constants')

const updateAvatar = async (req, res, next) => {
  const id = req.user.id
  const { path: tempName, originalname } = req.file
  try {
    if (req.file) {
      const img = await Jimp.read(tempName)
      img
        .autocrop()
        .cover(
          250,
          250,
          Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
        )
        .writeAsync(tempName)
      const newFileName = path.join(avatarDir, `${id}_${originalname}`)
      fs.rename(tempName, newFileName)
      const { avatarURL: newAvatarUrl } = await service.updateAvatar(
        id,
        newFileName
      )
      return res.json({
        status: 'success',
        code: 200,
        data: {
          avatarURL: newAvatarUrl,
        },
      })
    }
  } catch (error) {
    fs.unlink(tempName)
    next(error)
  }
}

module.exports = updateAvatar
