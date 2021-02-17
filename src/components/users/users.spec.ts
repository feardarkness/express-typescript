import app from "../../../app";
import * as request from "supertest";
import { createConnection } from "typeorm";

describe("User routes", () => {
  before(async () => {
    await createConnection();
    console.log("connectiom created");
  });
});
