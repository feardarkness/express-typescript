import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column("double")
  price: number;

  @Column()
  nickname: string;
}

// const userRepository = connection.getRepository(User);

// // example how to save DM entity
// const user = new User();
// user.firstName = "Timber";
// user.lastName = "Saw";
// user.isActive = true;
// await userRepository.save(user);

// // example how to remove DM entity
// await userRepository.remove(user);

// // example how to load DM entities
// const users = await userRepository.find({ skip: 2, take: 5 });
// const newUsers = await userRepository.find({ isActive: true });
// const timber = await userRepository.findOne({ firstName: "Timber", lastName: "Saw" });
