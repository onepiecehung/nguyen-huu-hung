import { validateOrReject } from "class-validator";

import { AppDataSource } from "../database/data-source";
import { User } from "../entities/user.entity";
import { PaginationHelper, PaginationResult } from "../util/pagination";
import { GetUsersFilterDto } from "../validators/filter.validator";
import { CreateUserDto } from "../validators/user.validator";

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (userData: CreateUserDto) => {
  const user = await userRepository.findOneBy({ email: userData.email });
  if (user) {
    throw new Error("User already exists");
  }
  return await userRepository.save(userData);
};

export const getUsers = async (
  filter: GetUsersFilterDto
): Promise<PaginationResult<User>> => {
  // Validate filter
  await validateOrReject(filter).catch((errors) => {
    const errorMessages = errors.flatMap((err: { constraints: any }) =>
      Object.values(err.constraints || {})
    );
    throw new Error(errorMessages.join(", "));
  });

  const queryBuilder = userRepository.createQueryBuilder("user");
  if (filter.name)
    queryBuilder.andWhere("user.name LIKE :name", { name: `%${filter.name}%` });
  if (filter.email)
    queryBuilder.andWhere("user.email LIKE :email", {
      email: `%${filter.email}%`,
    });

  const totalItems = await queryBuilder.getCount();

  const paginationHelper = new PaginationHelper(filter, totalItems);

  const data = await queryBuilder
    .take(paginationHelper.take)
    .skip(paginationHelper.skip)
    .getMany();

  return {
    data,
    pagination: {
      page: paginationHelper.page,
      pageSize: paginationHelper.pageSize,
      totalItems,
      totalPages: paginationHelper.totalPages,
    },
  };
};

export const getUserById = async (id: number) => {
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const updateUser = async (id: number, userData: Partial<User>) => {
  const checkData = await userRepository.findOneBy({ email: userData.email });
  if (checkData) {
    throw new Error("Email already exists");
  }
  const user = await getUserById(id);
  Object.assign(user, userData);
  return await userRepository.save(user);
};

export const deleteUser = async (id: number) => {
  const user = await getUserById(id);
  return await userRepository.remove(user);
};
