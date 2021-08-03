const Jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')
const { users: service } = require('../../service/index')
const {
  constants: { avatarDir },
} = require('../../helpers')

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
      const oldAvatar = (await fs.readdir(avatarDir)).find((fileName) =>
        fileName.includes(id)
      )
      if (oldAvatar) {
        const avatarForDeleted = path.join(avatarDir, oldAvatar)
        fs.unlink(avatarForDeleted)
      }
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
