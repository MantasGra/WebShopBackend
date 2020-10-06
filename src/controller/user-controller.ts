import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User, { IUser } from '../entity/User';
import StatusCodes from 'http-status-codes';

export const getUserList = async (
  req: Request<{}, Array<Omit<IUser, 'password'> & { id: number }>>,
  res: Response<Array<Omit<IUser, 'password'> & { id: number }>>
) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  return res.status(StatusCodes.OK).json(users);
};

interface UserRequestParams {
  id: string;
}

export const getUser = async (
  req: Request<UserRequestParams, Omit<IUser, 'password'> & { id: number }>,
  res: Response<Omit<IUser, 'password'> & { id: number }>
) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail(parseInt(req.params.id));
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const createUser = async (
  req: Request<{}, {}, IUser>,
  res: Response
) => {
  try {
    const userRepository = getRepository(User);
    const insertResult = await userRepository.insert(req.body);
    return res
      .status(StatusCodes.CREATED)
      .header('Location', `/users/${insertResult.raw.insertId}`)
      .send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const updateUser = async (
  req: Request<UserRequestParams, {}, Partial<IUser>>,
  res: Response
) => {
  try {
    const userRepository = getRepository(User);
    const userId = parseInt(req.params.id);
    await userRepository.findOneOrFail(userId);
    await userRepository.update(userId, req.body);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const deleteUser = async (
  req: Request<UserRequestParams>,
  res: Response
) => {
  try {
    const userRepository = getRepository(User);
    const userId = parseInt(req.params.id);
    await userRepository.findOneOrFail(userId);
    await userRepository.delete(userId);
    return res.status(StatusCodes.OK).send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};
