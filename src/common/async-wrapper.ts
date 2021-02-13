import * as express from "express";

function runAsyncWrapper(callback): (req: express.Request, res: express.Response, next: express.NextFunction) => void {
  return function (req: express.Request, res: express.Response, next: express.NextFunction) {
    callback(req, res, next).catch(next);
  };
}

export default runAsyncWrapper;
