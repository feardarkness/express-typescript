import { JSONSchemaType } from "ajv";
import { UserDto } from "../../../components/users/users.dto";

const userSchema: JSONSchemaType<UserDto> = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
    age: {
      type: "integer",
      minimum: 0,
      maximum: 200,
      nullable: true,
    },
    firstName: {
      type: "string",
      nullable: true,
    },
    lastName: {
      type: "string",
      nullable: true,
    },
    email: {
      type: "string",
    },
  },
  required: ["email"],
  additionalProperties: false,
};

export default userSchema;
