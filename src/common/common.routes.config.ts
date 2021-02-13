import * as express from "express";

export abstract class CommonRoutesConfig {
  router: express.Router;
  private name: string;

  constructor(router: express.Router, name: string) {
    this.router = router;
    this.name = name;
  }

  getName() {
    return this.name;
  }

  abstract initializeRoutes(): express.Router;
}
