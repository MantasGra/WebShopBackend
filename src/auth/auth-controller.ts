import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User, { IUser } from '../entity/User';
import StatusCodes from 'http-status-codes';

export const register = async (req: Request<{}, {}, IUser>, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const insertResult = await userRepository.insert(
      userRepository.create(req.body)
    );
    return res
      .status(StatusCodes.CREATED)
      .header('Location', `/users/${insertResult.raw.insertId}`)
      .send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};
