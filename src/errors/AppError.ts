interface ErrorDTO {
  message: string;
  statusCode?: number;
}

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor({ message, statusCode = 400 }: ErrorDTO) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
