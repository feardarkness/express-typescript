import { CommonRoutesConfig } from "../../common/common.routes.config";
import * as express from "express";
import userController from "./users.controller";
import userMiddleware from "./users.middleware";
import authMiddleware from "../../common/middlewares/authorization";
import asyncWrapper from "../../common/async-wrapper";
import { UserType } from "../../common/enums/UserType";

export class UserRoutes extends CommonRoutesConfig {
  constructor() {
    super(express.Router(), "users");
  }

  initializeRoutes(): express.Router {
    this.router.all("*", asyncWrapper(authMiddleware.tokenIsValid));

    this.router.post(
      "",
      asyncWrapper(authMiddleware.userTypeAllowed([UserType.admin])),
      asyncWrapper(userMiddleware.validateData),
      asyncWrapper(userMiddleware.validateEmailAlreadyExists),
      asyncWrapper(userMiddleware.validatePasswordComplexity),
      asyncWrapper(userController.createUser)
    );

    this.router
      .all(`/:userId`, (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // this middleware function runs before any request to /users/:userId
        // but it doesn't accomplish anything just yet---
        // it simply passes control to the next applicable function below using next()
        next();
      })
      .get(`/:userId`, (req: express.Request, res: express.Response) => {
        res.status(200).send(`GET requested for id ${req.params.userId}`);
      })
      .put(`/:userId`, (req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for id ${req.params.userId}`);
      })
      .patch(`/:userId`, (req: express.Request, res: express.Response) => {
        res.status(200).send(`PATCH requested for id ${req.params.userId}`);
      })
      .delete(`/:userId`, (req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE requested for id ${req.params.userId}`);
      });

    return this.router;
  }
}
