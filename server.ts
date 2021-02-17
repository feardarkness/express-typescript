import "dotenv/config";
import { createConnection } from "typeorm";
import configs from "./src/configs/index";
import app from "./app";
import debug from "debug";
import * as http from "http";

const server: http.Server = http.createServer(app);
const port: Number = configs.app.PORT;

console.log("port======================");
console.log(port);
console.log("======================");

const debugLog: debug.IDebugger = debug("server");

createConnection()
  .then(async () => {
    console.log("connection created");
    // TODO move this to another file (the listening part) and remove the if
    if (process.env.NODE_END !== "test") {
      server.listen(port, () => {
        debugLog(`Server running at http://localhost:${port}`);
      });
    }
  })
  .catch((error) => {
    // debug and log
    console.log(error);
    process.exit(1);
  });
