import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { UserDto } from "./users.dto";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 100,
  })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({
    nullable: false,
  })
  @Index({
    unique: true,
  })
  email: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    type: "timestamp",
    onUpdate: "CURRENT_TIMESTAMP",
    nullable: true,
  })
  updatedAt: Date;

  public basicData(): UserDto {
    return {
      email: this.email,
      id: this.id,
      age: this.age,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}
