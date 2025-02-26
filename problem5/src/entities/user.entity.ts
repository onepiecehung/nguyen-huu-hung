import { Column, Entity } from "typeorm";

import { BaseEntity } from "./base.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
