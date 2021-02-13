import { ErrorInterface } from "../interfaces/error-interface";

export default class Unauthorized extends Error implements ErrorInterface {
  errorStatusCode = 401;

  constructor(message: string) {
    super(message);
  }
}
