// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";
import { CreateUserDto } from "../validators/user.validator";
import { GetUsersFilterDto } from "../validators/filter.validator";
import * as userService from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    // Convert request body to CreateUserDto
    const userData = plainToClass(CreateUserDto, req.body);

    // Validate userData
    await validateOrReject(userData).catch((errors) => {
      const errorMessages = errors.flatMap((err: { constraints: any }) =>
        Object.values(err.constraints || {})
      );
      throw new Error(errorMessages.join(", "));
    });

    const user = await userService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Convert query params to GetUsersFilterDto
    const filterData = plainToClass(GetUsersFilterDto, {
      page: parseInt(req.query.page as string, 10) || 1,
      pageSize: parseInt(req.query.pageSize as string, 10) || 10,
      name: req.query.name,
      email: req.query.email,
    });

    // Validate filterData
    await validateOrReject(filterData).catch((errors) => {
      const errorMessages = errors.flatMap((err: { constraints: any }) =>
        Object.values(err.constraints || {})
      );
      throw new Error(errorMessages.join(", "));
    });

    const result = await userService.getUsers(filterData);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) throw new Error("Invalid user ID");

    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) throw new Error("Invalid user ID");

    // Convert request body to CreateUserDto
    const userData = plainToClass(CreateUserDto, req.body);

    // Validate userData
    await validateOrReject(userData).catch((errors) => {
      const errorMessages = errors.flatMap((err: { constraints: any }) =>
        Object.values(err.constraints || {})
      );
      throw new Error(errorMessages.join(", "));
    });

    const user = await userService.updateUser(userId, userData);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) throw new Error("Invalid user ID");

    await userService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
