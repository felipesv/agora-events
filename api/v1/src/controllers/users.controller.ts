import { RequestHandler } from 'express';
import User from '../models/User';

export const createUser: RequestHandler = async (req, res) => {
  try {
    const usersFound = await User.find(
      {
        $or:[
          {email: req.body.email},
          {username: req.body.username}
        ]
      }
    );

    if (usersFound.length > 0)
    {
      return res.status(301).json({message: 'email or username already exists'});
    }
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    return res.json(error);
  }
  
};

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

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const userFound = await User.findById(req.params.id);
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
          {_id: {$ne: req.params.id}}
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
