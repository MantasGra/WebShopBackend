import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {
  Request as OAuthRequest,
  Response as OAuthResponse
} from 'oauth2-server';
import apiRouter from './api';
import openApiRouter from './openApi';
import authRouter from './auth';
import { notFound } from './utility-handlers/not-found';
import { ExpressApp } from '..';
import { StatusCodes } from 'http-status-codes';
import AuthorizedRequest from '../auth/authorized-request';
import { getUserRole } from '../utils/getUserRole';

const getRouter = (app: Required<ExpressApp>) => {
  const router = express.Router();

  router.use(express.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the web shop application!');
  });

  router.use('/auth', authRouter(app));
  router.use('/api', openApiRouter);
  router.use(
    '/api',
    async (req, res, next) => {
      const request = new OAuthRequest(req);
      const response = new OAuthResponse(res);
      try {
        const token = await app.oauth.authenticate(request, response);
        const role = await getUserRole(token.user.id);
        (req as AuthorizedRequest).user = { id: token.user.id, role };
        next();
      } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
      }
    },
    apiRouter
  );

  router.use(notFound);

  return router;
};

export default getRouter;
