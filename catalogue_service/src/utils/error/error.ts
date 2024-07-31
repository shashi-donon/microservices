import { STATUS_CODES } from './status-code'

class BaseError extends Error{

    public readonly name;
    public readonly status;
    public readonly message;

    constructor(name: string, status: number, description){
        super()
        this.name=name;
        this.status=status;
        this.message=description;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

// 500 Internal Error
export class APIError extends BaseError {
    constructor(description = "api error") {
      super(
        "api internal server error",
        STATUS_CODES.INTERNAL_ERROR,
        description
      );
    }
  }
  
  // 400 Validation Error
  export class ValidationError extends BaseError {
    constructor(description = "bad request") {
      super("bad request", STATUS_CODES.BAD_REQUEST, description);
    }
  }
  
  // 403 Authorize error
  export class AuthorizeError extends BaseError {
    constructor(description = "access denied") {
      super("access denied", STATUS_CODES.UNAUTHORIZED, description);
    }
  }
  
  // 404 Not Found
  export class NotFoundError extends BaseError {
    constructor(description = "not found") {
      super(description, STATUS_CODES.NOT_FOUND, description);
    }
  }