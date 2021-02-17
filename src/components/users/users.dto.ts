export interface UserDto {
  id: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  email: string;
  password: string;
}

export interface UserBasicDto {
  id: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  email: string;
}
