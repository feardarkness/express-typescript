import * as express from "express";
import loginService from "./login.service";
import ValidationError from "../../common/errors/validation-error";
import Validate from "../../common/validations/validate";
import Bcrypt from "../../common/bcrypt";
import UnauthorizedError from "../../common/errors/unauthorized-error";
import configs from "../../configs";

class LoginMiddleware {
  private static instance: LoginMiddleware;

  static getInstance() {
    if (!LoginMiddleware.instance) {
      LoginMiddleware.instance = new LoginMiddleware();
    }
    return LoginMiddleware.instance;
  }

  /**
   * Check if the login body is valid
   * @param req Express request
   * @param res Express response
   * @param next Function to call the next middleware
   */
  async validateLoginData(req: express.Request, res: express.Response, next: express.NextFunction) {
    Validate.schema("Login", req.body);
    next();
  }

  /**
   * Check if the credentials provided are valid
   * @param req Express request
   * @param res Express response
   * @param next Function to call the next middleware
   */
  async credentialsAreValid(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await loginService.searchByEmail(req.body.email);
    if (user === undefined) {
      throw new UnauthorizedError("Unauthorized");
    }

    const validCredentials = await Bcrypt.compare(req.body.password, user.password);
    if (!validCredentials) {
      throw new UnauthorizedError("Unauthorized");
    }

    req.user = user;
    next();
  }
}

export default LoginMiddleware.getInstance();
