import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import debug from "debug";
// import * as winston from "winston";
// import * as expressWinston from "express-winston";
// import cors from "cors";

import { User } from "./components/users/user.entities";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { UserRoutes } from "./components/users/user.routes";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: Number = 3000;
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

routes.forEach((route) => {
  debugLog(`Routes configured for ${route.getName()}`);
  const routerRoutes: express.Router = route.initializeRoutes();
  app.use(`/${route.getName()}`, routerRoutes);
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

createConnection()
  .then(async (connection) => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    // this is a simple route to make sure everything is working properly
    app.get("/", (req: express.Request, res: express.Response) => {
      res.status(200).send(`Server up and running!`);
    });

    server.listen(port, () => {
      debugLog(`Server running at http://localhost:${port}`);
      routes.forEach((route: CommonRoutesConfig) => {});
    });
  })
  .catch((error) => console.log(error));
