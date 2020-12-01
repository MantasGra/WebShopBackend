import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User, { IUser, UserRoles } from '../entity/User';
import StatusCodes from 'http-status-codes';
import AuthorizedRequest from '../auth/authorized-request';

export const getUserList = async (
  req: AuthorizedRequest<{}, Array<Omit<IUser, 'password'> & { id: number }>>,
  res: Response<Array<Omit<IUser, 'password'> & { id: number }>>
) => {
  if (!req.user || req.user.role !== UserRoles.Admin) {
    return res.status(StatusCodes.UNAUTHORIZED).send();
  }
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  return res.status(StatusCodes.OK).json(users);
};

interface UserRequestParams {
  id: string;
}

export const getUser = async (
  req: AuthorizedRequest<
    UserRequestParams,
    Omit<IUser, 'password'> & { id: number }
  >,
  res: Response<Omit<IUser, 'password'> & { id: number }>
) => {
  try {
    if (!req.user || req.user.role !== UserRoles.Admin) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail(parseInt(req.params.id));
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};

export const createUser = async (
  req: AuthorizedRequest<{}, {}, IUser>,
  res: Response
) => {
  try {
    if (!req.user || req.user.role !== UserRoles.Admin) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }
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
  req: AuthorizedRequest<UserRequestParams, {}, Partial<IUser>>,
  res: Response
) => {
  try {
    if (!req.user || req.user.role !== UserRoles.Admin) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }
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
  req: AuthorizedRequest<UserRequestParams>,
  res: Response
) => {
  try {
    if (!req.user || req.user.role !== UserRoles.Admin) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }
    const userRepository = getRepository(User);
    const userId = parseInt(req.params.id);
    await userRepository.findOneOrFail(userId);
    await userRepository.delete(userId);
    return res.status(StatusCodes.OK).send();
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).send(err.message);
  }
};
