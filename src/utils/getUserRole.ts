import { getRepository } from 'typeorm';
import User from '../entity/User';

export const getUserRole = async (userId: number) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);
  if (user) {
    return user.role;
  }
  return undefined;
};
