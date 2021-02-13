import * as express from "express";
import debug from "debug";
import userService from "./users.service";

const log: debug.IDebugger = debug("app:user-controller");

// coming here everything should be validated already

export class UserController {
  private static instance: UserController;

  static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  async createUser(req: express.Request, res: express.Response) {
    const createdUser = await userService.create(req.body);
    res.status(201).json(createdUser.basicData());
  }
}

export default UserController.getInstance();
