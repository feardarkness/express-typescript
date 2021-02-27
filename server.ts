import "dotenv/config";
import { createConnection } from "typeorm";
import configs from "./src/configs/index";
import log from "./src/common/logger";
import app from "./app";
import debug from "debug";
import * as http from "http";

const server: http.Server = http.createServer(app);
const port: Number = configs.app.PORT;

const debugLog: debug.IDebugger = debug("server");

createConnection()
  .then(async () => {
    log.trace(`Connection to the database created`);
    if (process.env.NODE_END !== "test") {
      server.listen(port, () => {
        log.info(`App listening on port ${port}`);
        debugLog(`Server running at http://localhost:${port}`);
      });
    }
  })
  .catch((error) => {
    log.error(`Fatal Error`, { error });
    process.exit(1);
  });
