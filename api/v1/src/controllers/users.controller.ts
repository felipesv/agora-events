import { RequestHandler, Request, Response } from 'express';
import User from '../models/User';

export const getUsers: RequestHandler = async (req, res) => {
  try {
    if (!req.registered)
      return res.status(401).json({ message: "No token provided" });
    
    const users = await User.find();

    res.json(users);
  } catch(error) {
    return res.status(500).json({ message: "Failed to get Users", error });
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    if (!req.registered)
      return res.status(401).json({ message: "No token provided" });

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get User", error });
  }
 
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    if (!req.registered)
      return res.status(401).json({ message: "No token provided" });

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete User", error });
  }
  
  
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    if (!req.registered)
      return res.status(401).json({ message: "No token provided" });

    const userFound = await User.findById(req.userId);

    if (!userFound) {
      return res.status(404).json({message: 'invalid user ID'});
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
      return res.status(409).json({message: 'email or username already exists'});
    }

    const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Failed to Update User", error });
  }
};

export const getProfile: RequestHandler = async (req, res) => {
  try {
    if (!req.registered)
      return res.status(401).json({ message: "No token provided" });
    
    const user = await User.findById(req.userId, {password: 0});

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Failed to Update User", error });
  }
  
};
