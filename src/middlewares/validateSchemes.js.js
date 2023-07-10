const validateSchemes = (scheme) => async (req, res, next) => {
  try {
    await scheme.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
}

module.exports = validateSchemes;