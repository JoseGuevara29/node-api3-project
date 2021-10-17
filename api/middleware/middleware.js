function logger(req, res, next) {
  // DO YOUR MAGIC
  let datetime = new Date();
  let timepstamp =
    datetime.getFullYear() +
    "-" +
    (datetime.getMonth() + 1) +
    "-" +
    datetime.getDate() +
    " " +
    datetime.getHours() +
    ":" +
    datetime.getMinutes() +
    ":" +
    datetime.getSeconds();
  console.log(
    "|Method|",
    req.method,
    "|url|",
    req.url,
    "|Timestamp|",
    timepstamp
  );

  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const varID = req.params.id;
  Users.getById(varID)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: `Users not found with the given ID of ${varID}` });
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "You are missing the name field." });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ message: "You are missing the text field." });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUserId,
  validatePost,
  validateUser,
};
