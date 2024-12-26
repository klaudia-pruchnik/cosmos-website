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

const _NotFoundError = NotFoundError;
export { _NotFoundError as NotFoundError };
const _NotAuthError = NotAuthError;
export { _NotAuthError as NotAuthError };
