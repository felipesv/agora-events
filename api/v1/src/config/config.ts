import dotenv from 'dotenv';
dotenv.config();

export default {
  MONGO_DATABASE: process.env.MONGO_DATABASE || process.env.MONGO_DATABASE_TEST,
  MONGO_USER: process.env.MONGO_USER || process.env.MONGO_USER_TEST,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || process.env.MONGO_PASSWORD_TEST,
  MONGO_HOST: process.env.MONGO_HOST || process.env.MONGO_HOST_TEST,
  PORT: process.env.PORT || process.env.PORT_TEST,
  TOKEN_KEY: process.env.TOKEN_KEY || process.env.TOKEN_KEY_TEST,
  SALT_ROUNDS: process.env.SALT_ROUNDS || process.env.SALT_ROUNDS_TEST,
  ROLES: process.env.ROLES || process.env.ROLES_TEST,
};
