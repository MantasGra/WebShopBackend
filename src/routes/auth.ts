import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'oauth2-server';
import { ExpressApp } from '..';
import { register } from '../auth/auth-controller';

const getRouter = (app: Required<ExpressApp>) => {
  const router = express.Router();
  router.post('/register', register);
  router.post('/login', async (req, res) => {
    const request = new Request(req);
    const response = new Response(res);
    try {
      const token = await app.oauth.token(request, response);
      res.status(StatusCodes.OK).send(token);
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).send('Invalid credentials');
    }
  });
  return router;
};

export default getRouter;
