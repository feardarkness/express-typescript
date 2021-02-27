import { ErrorInterface } from "../interfaces/error-interface";

export default class ForbiddenError extends Error implements ErrorInterface {
  errorStatusCode = 403;

  constructor(message: string) {
    super(message);
  }
}
