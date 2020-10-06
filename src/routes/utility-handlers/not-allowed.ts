import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

export const notAllowed = (req: Request, res: Response) => {
  res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send('This method is not allowed!');
};
