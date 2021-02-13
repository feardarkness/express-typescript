import { JSONSchemaType } from "ajv";
import { LoginBodyDTO } from "../../../components/auth/login.dto";

const loginSchema: JSONSchemaType<LoginBodyDTO> = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export default loginSchema;
