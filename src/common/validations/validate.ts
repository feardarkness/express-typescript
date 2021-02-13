import Ajv, { DefinedError } from "ajv";
import Schemas from "./schemas/index";
import ValidationError from "../errors/validation-error";
import * as addFormats from "ajv-formats";

class Validate {
  private static instance: Validate;
  private validator: Ajv;

  constructor() {
    this.validator = new Ajv();
    (addFormats as any)(this.validator);
  }

  static getInstance() {
    if (!Validate.instance) {
      Validate.instance = new Validate();
    }
    return Validate.instance;
  }

  schema(schemaName: string, data: any) {
    console.log("schemaName======================");
    console.log(schemaName);
    console.log("======================");
    console.log("Schemas======================");
    console.log(Schemas);
    console.log("======================");

    console.log("Schemas[schemaName]======================");
    console.log(Schemas[schemaName]);
    console.log("======================");

    const validate = this.validator.compile(Schemas[schemaName]);
    if (!validate(data)) {
      console.log(JSON.stringify(validate.errors, null, 4));

      const errors: string[] | undefined = [];

      for (const err of validate.errors as DefinedError[]) {
        if (err.message) {
          errors.push(`${err.dataPath} ${err.message}`.trim());
        } else {
          console.log("err not found======================");
          console.log(err);
          console.log("======================");
        }
      }
      throw new ValidationError(`Invalid data`, errors);
    }
  }
}

export default Validate.getInstance();
