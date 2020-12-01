import { Client, Token } from 'oauth2-server';

import {
  getUserFromCredentials,
  saveAccessToken,
  getToken
} from './auth-helpers';
import User from '../entity/User';

const getClient = async (clientId: string, clientSecret: string) => {
  const client = {
    id: clientId,
    clientSecret,
    grants: ['password']
  };
  return client;
};

const getUser = async (username: string, password: string) => {
  try {
    const user = await getUserFromCredentials(username, password);
    return user;
  } catch (error) {
    return error;
  }
};

const saveToken = async (token: Token, client: Client, user: User) => {
  try {
    await saveAccessToken(token, user.id);
    return { ...token, client, user };
  } catch (error) {
    return error;
  }
};

const getAccessToken = async (accessToken: string) => {
  try {
    const token = await getToken(accessToken);
    return {
      accessToken,
      accessTokenExpiresAt: token.expiresAt,
      user: { id: token.userId },
      client: { id: 'WEBAPP', grants: ['password'] }
    };
  } catch (error) {
    return error;
  }
};

const verifyScope = async (token: Token, scope: string | string[]) => {
  return true;
};

export default {
  getClient,
  getUser,
  saveToken,
  getAccessToken,
  verifyScope
};
