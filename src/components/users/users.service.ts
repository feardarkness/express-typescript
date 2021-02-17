import { CRUD } from "../../common/interfaces/crud";
import { UserDto } from "./users.dto";
import { User } from "./users.entity";
import { getManager } from "typeorm";
import { CommonServicesConfig } from "../../common/common.services.config";
import bcrypt from "../../common/bcrypt";
import configs from "../../configs";

class UserService extends CommonServicesConfig implements CRUD {
  private static instance: UserService;

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  list: (limit: number, page: number) => Promise<any>;

  /**
   * Creates a user
   * @param resource User data
   */
  async create(resource: UserDto) {
    const userRepository = getManager().getRepository(User);

    const user = new User();
    Object.assign(user, resource);
    user.password = await bcrypt.hash(resource.password, configs.jwt.saltRounds);

    const createdUser = await userRepository.save(user);
    return createdUser;
  }
  updateById: (resourceId: UserDto) => Promise<any>;
  readById: (resourceId: UserDto) => Promise<any>;
  deleteById: (resourceId: UserDto) => Promise<any>;
  patchById: (resourceId: UserDto) => Promise<any>;
}

export default UserService.getInstance();
