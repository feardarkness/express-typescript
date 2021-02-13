import { EntityRepository, Repository } from "typeorm";
import { User } from "./users.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Find a user by full name
   * @param firstName User's first name
   * @param lastName User's last name
   */
  findByFullName(firstName: string, lastName: string): Promise<User[]> {
    return this.createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName })
      .andWhere("user.lastName = :lastName", { lastName })
      .getMany();
  }

  /**
   * Find a user by email
   * @param email User's email
   */
  findByEmail(email: string): Promise<User | undefined> {
    return this.createQueryBuilder("user").where("user.email=:email", { email }).getOne();
  }
}
