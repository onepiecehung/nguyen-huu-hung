import { DataSource } from "typeorm";

import { User } from "../entities/user.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST ?? "localhost",
  port: parseInt(process.env.DB_PORT ?? "3306"),
  username: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "99tech",
  database: process.env.DB_NAME ?? "99tech_db",
  entities: [User],
  synchronize: true,
  logging: true,
});
