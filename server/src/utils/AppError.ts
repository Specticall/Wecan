export class AppError extends Error {
  statusCode: number;
  status: "fail" | "success";
  operational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("2") ? "success" : "fail";
    this.operational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
