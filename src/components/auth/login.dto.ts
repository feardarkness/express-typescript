import { UserDto } from "../users/users.dto";

export interface LoginDto {
  token: string;
  user: UserDto;
}

export interface LoginBodyDTO {
  email: string;
  password: string;
}
