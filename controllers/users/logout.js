const { users: service } = require("../../service/index");

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await service.updateToken(id, null);
    return res.status(204).json({
      status: "success",
      code: 204,
      data: "No Content",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
