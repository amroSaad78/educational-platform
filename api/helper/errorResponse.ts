export class ErrorResponse {
  statusCode: number;
  error: any;
  constructor(error: any, statusCode: number) {
    this.statusCode = statusCode;
    this.error = error;
  }
}
