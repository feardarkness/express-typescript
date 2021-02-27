import Ajv, { DefinedError } from "ajv";
import Schemas from "./schemas/index";
import ValidationError from "../errors/validation-error";
import addFormats from "ajv-formats";
import log from "../logger";

class Validate {
  private static instance: Validate;
  private validator: Ajv;

  constructor() {
    this.validator = new Ajv();
    addFormats(this.validator);
  }

  static getInstance() {
    if (!Validate.instance) {
      Validate.instance = new Validate();
    }
    return Validate.instance;
  }

  schema(schemaName: string, data: any) {
    log.trace(`[Validate ] validating with schema`, { schemaName, data });

    const validate = this.validator.compile(Schemas[schemaName]);
    if (!validate(data)) {
      log.trace(`[Validate] errors on validate`, {
        errors: validate.errors,
      });

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
