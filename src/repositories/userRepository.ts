import { AppDataSource } from "../data-source";
import { User } from "../entites/User"

export const userRepository = AppDataSource.getRepository(User)