import * as bcrypt from "Bcrypt";

export default class Bcrypt {
  /**
   * Generate a bcrypt hash
   * @param data Data to be hashed
   * @param numberOfRounds Number of salt rounds
   */
  static hash(data: string, numberOfRounds: number): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(data, numberOfRounds, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  /**
   * Compare the plain text with the hash to know if they are the same
   * @param plainData Plain text
   * @param hash Hashed text
   */
  static compare(plainData: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainData, hash, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
}
