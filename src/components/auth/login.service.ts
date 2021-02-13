import { User } from "../users/users.entity";
import JWT from "../../common/jwt";
import configs from "../../configs/index";
import { CommonServicesConfig } from "../../common/common.services.config";

class LoginService extends CommonServicesConfig {
  private static instance: LoginService;

  static getInstance(): LoginService {
    if (!LoginService.instance) {
      LoginService.instance = new LoginService();
    }
    return LoginService.instance;
  }

  async generateToken(user: User): Promise<string> {
    // TODO add someKey to the token so we can deactivate if necessary (it would help with logout too)
    const token = await JWT.generateToken(
      {
        id: user.id,
        // someKey: "asdsadsa"
      },
      configs.jwt.secret,
      {
        algorithm: "HS256",
        expiresIn: configs.jwt.expiration,
      }
    );

    // TODO store someKey in the database, relation with user is needed. Prob.one user can have more than one token active (multiple dispositives)
    return token;
  }
}

export default LoginService.getInstance();
