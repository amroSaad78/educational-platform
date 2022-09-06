export class SuccessResponse {
  statusCode: number;
  object: object;
  constructor(object: object, statusCode: number) {
    this.statusCode = statusCode;
    this.object = object;
  }
}
