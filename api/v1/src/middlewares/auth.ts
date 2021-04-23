import { RequestHandler, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';

export interface IPayload {
  id: string,
  iat: number,
  exp: number,
}

export const validNewEmailUsername: RequestHandler = async (req, res, next) => {
  try {
    const usersFound = await User.find(
      {
        $or: [
          { email: req.body.email },
          { username: req.body.username }
        ]
      }
    );

    if (usersFound.length > 0)
      return res.status(400).json({ message: 'Email or username already exists' });

    return next();
  } catch (error) {
    return res.status(500).json({
      message: "User and password validation failed",
      error
    });
  }

};


export const validUsernamePassword: RequestHandler = async (req, res, next) => {
  try {
    const usersFound = await User.findOne({ username: req.body.username });

    if (!usersFound)
      return res.status(400).json({ message: 'Invalid user or password' });

    const validPassword = await bcrypt.compare(req.body.password, usersFound.get('password'));

    if (!validPassword)
      return res.status(400).json({ message: 'Invalid user or password' });

    return next();
  } catch (error) {
    return res.status(500).json({
      message: "User and password validation failed", error
    });
  }

};

export const validToken: RequestHandler = async (req: Request, res: Response,
  next: NextFunction) => {

  try {
    let token = req.get('x-auth-token');

    if (!token) {
      req.userId = "";
      req.registered = false;
      return next();
    }

    const tokenValue = token.split(' ')[1].trim();
    const decoded = jwt.verify(tokenValue, config.TOKEN_KEY) as IPayload;

    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });

    if (!user) return res.status(404).json({ message: "No user found" });

    req.registered = true;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!", error });
  }
};

export const isAdmin: RequestHandler = async (req: Request, res: Response,
  next: NextFunction) => {
  try {
    if (!req.registered)
      return res.status(401).json({ message: "No token provided" });

    const userFind = await User.findById(req.userId);

    if (!userFind) return res.status(404).json({ message: "No user found" });

    if (!userFind.roles.includes('admin')) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

}
