import express from "express";
import UnauthorizedError from "../errors/unauthorized-error";
import JWT from "../jwt";
import configs from "../../configs/index";
import log from "../logger";
import usersService from "../../components/users/users.service";
import { UserType } from "../enums/UserType";
import ForbiddenError from "../errors/forbidden-error";

class AuthMiddleware {
  private static instance: AuthMiddleware;

  static getInstance() {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  /**
   * Validate the token, set req.user if the token is valid
   * @param req
   * @param res
   * @param next
   */
  async tokenIsValid(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authorizationToken = req.get("authorization");
    let decodedToken;
    try {
      if (authorizationToken === undefined) {
        throw new Error(`Token is not defined`);
      }
      const [tokenKeyword, token] = authorizationToken.split(" ");
      if (tokenKeyword.toLocaleLowerCase() !== "bearer") {
        throw new Error(`Token keyword is not bearer`);
      }

      decodedToken = (await JWT.verify(token, configs.jwt.secret)) as TokenDto;

      const user = await usersService.findById(decodedToken.userId);

      if (user === undefined) {
        throw new Error(`User with id ${decodedToken.userId} not found`);
      }

      req.user = user;
    } catch (err) {
      log.error(`Authorization error`, { err, authorizationToken });
      throw new UnauthorizedError(`Authorization token not provided or invalid`);
    }

    next();
  }

  /**
   * Check if the user type is allowed to perform some action
   * @param userTypes User types allowed
   */
  async userTypeAllowed(userTypes: UserType[]) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (!userTypes.includes(req.user.userType)) {
        throw new ForbiddenError(`User type ${req.user.userType} is not allowed on this route`);
      }
      next();
    };
  }
}

export interface TokenDto {
  exp: string;
  userId: string;
  issued: string;
}

export default AuthMiddleware.getInstance();
