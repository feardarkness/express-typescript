import * as express from "express";
import debug from "debug";
import loginService from "./login.service";
import { LoginRoutes } from "./login.routes";
import { LoginDto } from "./login.dto";

const log: debug.IDebugger = debug("app:login-controller");

export class LoginController {
  private static instance: LoginController;

  static getInstance(): LoginController {
    if (!LoginController.instance) {
      LoginController.instance = new LoginController();
    }
    return LoginController.instance;
  }

  async login(req: express.Request, res: express.Response) {
    const token = await loginService.generateToken(req.user);
    const response: LoginDto = {
      token,
      user: req.user.basicData(),
    };
    res.status(201).json(response);
  }
}

export default LoginController.getInstance();
