const validatePost = (req, res, next) => {
  const {body} = req;
  const {text} = body;

  const bodyHasData = Object.keys(body).length;
  
  if (!bodyHasData) {
    res
      .status(400)
      .json({
      message: "missing post data"
    });
  }

  if (!text) {
    res
      .status(400)
      .json({
      message: "missing required text field"
    });
  }

  next();
}

module.exports = validatePost;