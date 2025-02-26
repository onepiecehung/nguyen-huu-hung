import { User } from "../entities/user.entity";
import { AppDataSource } from "./data-source";

export const seedData = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const usersToSeed = [
    { name: "Alice", email: "alice@99tech.com" },
    { name: "Bob", email: "bob@99tech.com" },
    { name: "Charlie", email: "charlie@99tech.com" },
  ];

  try {
    const existingEmails = await userRepository.find({
      select: ["email"],
    });

    const usersToInsert = usersToSeed.filter(
      (user) => !existingEmails.some((e: any) => e.email === user.email)
    );

    if (usersToInsert.length > 0) {
      await userRepository.save(usersToInsert);
      console.log(`Inserted ${usersToInsert.length} new user(s)`);
    } else {
      console.log("All seed users already exist");
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};
