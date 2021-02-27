import bunyan from "bunyan";
import path from "path";
import DateCommon from "./date-common";
import configs from "../configs/index";

const environment = process.env.NODE_ENV;

// add uuid with continuation local storage (cls-hooked)

const streams: bunyan.Stream[] = [
  {
    type: "rotating-file",
    period: configs.logs.fileLogRotatePeriod, // period of rotation
    count: 10, // number of files rotated to be kept
    path: path.join(__dirname, `../../${configs.logs.logsPath}`, `log.log`),
  },
];

if (environment !== "production" && environment !== "test") {
  streams.push({
    level: "debug",
    stream: process.stdout,
  });
}

const log = bunyan.createLogger({
  name: "Main",
  streams,
});

export default log;
