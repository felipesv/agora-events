import { RequestHandler } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import User, { encryptPassword } from '../models/User';
import config from '../config/config';

export const signUp: RequestHandler = async (req, res) => {
  try {
    const user = new User({
      ...req.body,
      password: await encryptPassword(req.body.password),
      roles: typeof req.body.roles === undefined || req.body.roles?.length === 0 ? ["user"] : req.body.roles
    });
    const savedUser = await user.save();
    const token_key: Secret = String(config.TOKEN_KEY);
    const token = jwt.sign({ id: savedUser._id }, token_key, { expiresIn: '1d'});

    res.json({ token: `Bearer ${token}` });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const signIn: RequestHandler = async (req, res) => {
  try {
    const usersFound = await User.findOne({username: req.body.username});
    const token_key: Secret = String(config.TOKEN_KEY);
    const token = jwt.sign({ id: usersFound._id }, token_key, { expiresIn: '1d'});

    res.json({ token: `Bearer ${token}` });
  } catch(error) {
    return res.status(400).json(error);
  }
};
