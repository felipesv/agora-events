import { AUTH_LOGIN, AUTH_REGISTER} from './authActionTypes';

export const authLogin = (token) => ({
  type: AUTH_LOGIN,
  token: token
});

