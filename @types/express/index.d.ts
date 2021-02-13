// import { User } from "../../src/components/users/users.entity";

// declare namespace Express {
//   interface Request {
//     user: any;
//   }
// }

import { User } from "../../src/components/users/users.entity";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
