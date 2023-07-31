const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    next(new HttpError(400, `${id} is invalid id`));
  }
  next();
};

module.exports = isValidId;
