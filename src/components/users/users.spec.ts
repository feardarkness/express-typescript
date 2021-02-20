import app from "../../../app";
import * as request from "supertest";
import { createConnection } from "typeorm";

let connection;

describe("User routes", () => {
  before(async () => {
    connection = await createConnection();
    console.log("connection created");
  });

  describe("Create user", () => {
    it("should create a user", async () => {
      const response = await request(app).post("/users").send({
        id: 1,
        name: "Mike",
      });
      console.log("response======================");
      console.log(response.body);
      console.log("======================");
    });
  });

  after(async () => {
    await connection.close();
  });
});
