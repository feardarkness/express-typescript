import { CRUD } from "../../common/interfaces/crud";
import { UserDto } from "./users.dto";
import { User } from "./users.entity";
import { getManager } from "typeorm";
import { UserRepository } from "./users.repository";
import { CommonServicesConfig } from "../../common/common.services.config";

class UserService extends CommonServicesConfig implements CRUD {
  private static instance: UserService;

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  list: (limit: number, page: number) => Promise<any>;

  // Here we create a new user, no need to validate business rules, that should be done before
  async create(resource: UserDto) {
    const userRepository = getManager().getRepository(User);

    const user = new User();
    Object.assign(user, resource);

    const createdUser = await userRepository.save(user);
    return createdUser;
  }
  updateById: (resourceId: UserDto) => Promise<any>;
  readById: (resourceId: UserDto) => Promise<any>;
  deleteById: (resourceId: UserDto) => Promise<any>;
  patchById: (resourceId: UserDto) => Promise<any>;
}

export default UserService.getInstance();
