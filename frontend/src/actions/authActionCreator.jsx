import { AUTH_LOGIN, AUTH_REGISTER, AUTH_ERROR } from './authActionTypes';

export const authLogin = (token) => ({
  type: AUTH_LOGIN,
  token: token
});

export const authSignup = (token) => ({
  type: AUTH_REGISTER,
  token: token
});

export const authError = (error) => ({
  type: AUTH_ERROR,
  error: error
});
