import { getManager } from "typeorm";
import { UserRepository } from "../components/users/users.repository";

export abstract class CommonServicesConfig {
  /**
   * Search a user by email
   * @param email Email to search
   * @returns {Promise<User>}
   */
  async searchByEmail(email: string) {
    const userRepository = getManager().getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);
    return user;
  }
}
