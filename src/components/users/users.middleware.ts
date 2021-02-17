import * as express from "express";
import userService from "./users.service";
import ValidationError from "../../common/errors/validation-error";
import Validate from "../../common/validations/validate";

class UsersMiddleware {
  private static instance: UsersMiddleware;

  static getInstance() {
    if (!UsersMiddleware.instance) {
      UsersMiddleware.instance = new UsersMiddleware();
    }
    return UsersMiddleware.instance;
  }

  async validateData(req: express.Request, res: express.Response, next: express.NextFunction) {
    Validate.schema("User", req.body);
    next();
  }

  async validateEmailAlreadyExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await userService.searchByEmail(req.body.email);

    if (user !== undefined) {
      throw new ValidationError(`User with email ${req.body.email} already registered`);
    }
    next();
  }

  async validatePasswordComplexity(req: express.Request, res: express.Response, next: express.NextFunction) {
    // TODO add a password validator, length, number of chars, etc
    next();
  }
}

export default UsersMiddleware.getInstance();
