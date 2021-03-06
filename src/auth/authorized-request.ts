import { Request } from 'express';
import core from 'express-serve-static-core';
import { UserRoles } from '../entity/User';

export default interface AuthorizedRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: {
    id?: number;
    role?: UserRoles;
  };
}
