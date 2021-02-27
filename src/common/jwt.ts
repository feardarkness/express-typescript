import * as JsonWebToken from "jsonwebtoken";

export default class JWT {
  /**
   * Generate a JWT token
   * @param payload Token payload
   * @param secret Secret to sign the token
   * @param options Additional options
   * @returns {Promise<string>} A resolved promise with the token signed or a rejected promise with an error
   */
  static generateToken(payload: object, secret: string, options: JsonWebToken.SignOptions = {}): Promise<string> {
    return new Promise((resolve, reject) => {
      JsonWebToken.sign(payload, secret, options, (err, token) => {
        if (err || token === undefined) {
          reject(err);
        } else {
          resolve(token as string);
        }
      });
    });
  }

  /**
   * Verify a JWT token
   * @param token Token to verify
   * @param secret Secret to sign the token
   * @param options Additional options
   * @returns {Promise<object>} A resolved promise with the token decoded
   */
  static verify(token: string, secret: string, options: JsonWebToken.SignOptions = {}): Promise<object> {
    return new Promise((resolve, reject) => {
      JsonWebToken.verify(token, secret, options, (err, token) => {
        if (err || token === undefined) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
}
