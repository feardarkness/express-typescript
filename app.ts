import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";

import * as bodyParser from "body-parser";
import debug from "debug";
import configs from "./src/configs/index";
// import * as winston from "winston";
// import * as expressWinston from "express-winston";
// import cors from "cors";

import { CommonRoutesConfig } from "./src/common/common.routes.config";
import { UserRoutes } from "./src/components/users/users.routes";
import { ErrorInterface } from "./src/common/interfaces/error-interface";
import { LoginRoutes } from "./src/components/auth/login.routes";
import { start } from "repl";

const app: express.Application = express();

const port: Number = configs.app.PORT;

const routes: Array<CommonRoutesConfig> = [];

const debugLog: debug.IDebugger = debug("app");
// here we are adding middleware to parse all incoming requests as JSON
app.use(bodyParser.json());

// // here we are adding middleware to allow cross-origin requests
// app.use(cors());

// // here we are configuring the expressWinston logging middleware,
// // which will automatically log all HTTP requests handled by Express.js
// app.use(
//   expressWinston.logger({
//     transports: [new winston.transports.Console()],
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json()
//     ),
//   })
// );

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new UserRoutes());
routes.push(new LoginRoutes());

routes.forEach((route) => {
  debugLog(`Routes configured for ${route.getName()}`);
  const routerRoutes: express.Router = route.initializeRoutes();
  app.use(`${configs.app.BASE_PATH}/${route.getName()}`, routerRoutes);
});

// // here we are configuring the expressWinston error-logging middleware,
// // which doesn't *handle* errors per se, but does *log* them
// app.use(
//   expressWinston.errorLogger({
//     transports: [new winston.transports.Console()],
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json()
//     ),
//   })
// );

// export default createConnection()
//   .then(async () => {
//     console.log("connection created");
//     // TODO move this to another file (the listening part) and remove the if
//     if (process.env.NODE_END !== "test") {
//       server.listen(port, () => {
//         debugLog(`Server running at http://localhost:${port}`);
//         routes.forEach((route: CommonRoutesConfig) => {});
//       });
//     }
//   })
//   .catch((error) => {
//     // debug and log
//     console.log(error);
//     process.exit(1);
//   });

// default route
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server up and running!`);
});

// error handler
app.use((err: ErrorInterface, req: express.Request, res: express.Response, next) => {
  // add logger, errors should be logged, more if those are auth errors
  console.log("err======================");
  console.log(err);
  console.log("======================");

  res.status(err.errorStatusCode || 500).json({
    error: err.message,
    detail: err.errorDetail,
  });
});

export default app;
