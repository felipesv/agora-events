import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import User, { encryptPassword } from '../models/User';
import config from '../config/config';

export const validNewEmailUsername: RequestHandler = async (req, res, next) => {
  const usersFound = await User.find(
    {
      $or:[
        {email: req.body.email},
        {username: req.body.username}
      ]
    }
  );

  if (usersFound.length > 0)
    return res.status(400).json({message: 'Email or username already exists'});

  next();
};


export const validUsernamePassword: RequestHandler = async (req, res, next) => {
  const usersFound = await User.findOne({username: req.body.username});

  if (!usersFound)
    return res.status(400).json({message: 'Invalid user or password'});
  
  const validPassword = await bcrypt.compare(req.body.password, usersFound.get('password'));
  
  if(!validPassword)
    return res.status(400).json({message: 'Invalid user or password'});

  next();
};

export const validToken: RequestHandler = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) 
    return res.status(403).json({ message: "No token provided" });

  try {
    const decoded: any = jwt.verify(String(token), config.TOKEN_KEY);
    req.body.userId = decoded.id;

    const user = await User.findById(req.body.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
