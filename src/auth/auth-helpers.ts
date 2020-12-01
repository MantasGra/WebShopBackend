import { getRepository } from 'typeorm';
import { Token as OAuthToken } from 'oauth2-server';
import { createHash } from 'crypto';

import User from '../entity/User';
import Token from '../entity/auth/Token';

export const getUserFromCredentials = async (
  email: string,
  password: string
) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOneOrFail({
    where: {
      email,
      password: createHash('sha256').update(password).digest('hex')
    }
  });
  return user;
};

export const saveAccessToken = async (token: OAuthToken, userId: number) => {
  const tokenRepository = getRepository(Token);
  const userToken = await tokenRepository.findOne({ where: { userId } });
  if (userToken) {
    await tokenRepository.update(
      { userId },
      { token: token.accessToken, expiresAt: token.accessTokenExpiresAt }
    );
  } else {
    await tokenRepository.insert({
      userId,
      token: token.accessToken,
      expiresAt: token.accessTokenExpiresAt
    });
  }
};

export const getToken = async (token: string) => {
  const tokenRepository = getRepository(Token);
  const accessToken = await tokenRepository.findOneOrFail({ where: { token } });
  return accessToken;
};
