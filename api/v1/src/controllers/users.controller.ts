import { RequestHandler, Request, Response } from 'express';
import User from '../models/User';

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch(error) {
    res.json(error);
  }
};

export const getUser: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(204).json(); // no sale mensaje para el error 204
  res.json(user);
};

export const deleteUser: RequestHandler = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(204).json(); // no sale mensaje para el error 204
  res.json(user);
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userFound = await User.findById(req.body.userId);
    if (!userFound) {
      return res.status(301).json({message: 'invalid user ID'});
    }
    const usersFound = await User.find(
      {
        $or:[
          {email: req.body.email},
          {username: req.body.username}
        ],
        $and:[
          // exclude his own data
          {_id: {$ne: req.userId }}
        ]
      }
    );

    if (usersFound.length > 0)
    {
      return res.status(301).json({message: 'email or username already exists'});
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(204).json(); // no sale mensaje para el error 204
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

export const getProfile: RequestHandler = async (req, res) => {
  const user = await User.findById(req.userId, {password: 0});
  if (!user) return res.status(204).json(); // no sale mensaje para el error 204
  res.json(user);
};

