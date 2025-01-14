class NotFoundError {
  constructor(message) {
    this.message = message;
    this.status = 404;
  }
}

class NotAuthError {
  constructor(message) {
    this.message = message;
    this.status = 401;
  }
}

// route handlers
const handleValidationErrors = (errors, res, message) => {
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ message, errors });
  }
};

export { NotFoundError, NotAuthError, handleValidationErrors };
