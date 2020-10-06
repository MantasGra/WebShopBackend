import { ErrorRequestHandler } from 'express';
import StatusCodes from 'http-status-codes';

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
};
