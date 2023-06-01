import { ErrorCode } from './error-code';

export class ErrorException extends Error {
  public name = ErrorException.name;
  public status: number;
  public metaData: any = null;
  constructor(code: string = ErrorCode.UnknownError, metaData: any = null) {
    super(code);
    Object.setPrototypeOf(this, ErrorException.prototype);
    this.name = code;
    this.status = 500;
    this.metaData = metaData;
    switch (code) {
      case ErrorCode.Unauthenticated:
        this.status = 401;
        break;
      case ErrorCode.BadRequest:
        this.status = 400;
        break;
      case ErrorCode.ValidationError:
        this.status = 400;
        break;
      case ErrorCode.NotFound:
        this.status = 404;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}
