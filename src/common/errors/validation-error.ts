import { ErrorInterface } from "../interfaces/error-interface";

export default class ValidationError extends Error implements ErrorInterface {
  errorStatusCode = 400;
  errorDetail: string[];

  constructor(message: string, errors: string[] = []) {
    super(message);
    this.errorDetail = errors;
  }
}
