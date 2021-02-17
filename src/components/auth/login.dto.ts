import { UserBasicDto } from "../users/users.dto";

export interface LoginDto {
  token: string;
  user: UserBasicDto;
}

export interface LoginBodyDTO {
  email: string;
  password: string;
}
