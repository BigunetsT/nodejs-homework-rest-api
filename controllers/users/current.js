const current = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = current;
