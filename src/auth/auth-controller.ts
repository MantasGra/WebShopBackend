import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User, { IUser, UserRoles } from '../entity/User';
import StatusCodes from 'http-status-codes';

export const register = async (
  req: Request<{}, {}, Omit<IUser, 'role'>>,
  res: Response
) => {
  try {
    const userRepository = getRepository(User);
    const insertResult = await userRepository.insert(
      userRepository.create({ ...req.body, role: UserRoles.Admin })
    );
    return res
      .status(StatusCodes.CREATED)
      .header('Location', `/users/${insertResult.raw.insertId}`)
      .send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};
