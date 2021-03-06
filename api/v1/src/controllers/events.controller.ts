import { RequestHandler, Request } from 'express';
import Event from '../models/Event';
import User from '../models/User';
import { isAuthor, hasCapacity, emptyFieldsEvent } from '../helpers/helpers';

const mongoose = require('mongoose')

/* FUNCTION TO CREATE EVENT */
export const createEvent: RequestHandler = async (req, res) => {
  try {
    if (!req.registered) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.body.author = req.userId;
    const event = new Event(req.body);
    const savedEvent = await event.save();

    return res.json(savedEvent);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create event", error });
  }
};

/* FUNCTION TO GET ALL EVENTS */
export const getEvents: RequestHandler = async (req, res) => {
  try {
    if (req.registered) {

      const user = await User.findById(req.userId);

      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.roles.includes('admin')) {
        const events = await Event.aggregate(
          [
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
            { $unwind: '$author' },
            { $project: { 
              _id: '$_id', isActive: '$isActive', capacity: '$capacity', rating: '$rating',
              attendance: '$attendance', title: '$title', description: '$description',
              date: '$date', duration: '$duration', onSite: '$onSite', venue: '$venue',
              createdAt: '$createdAt', updatedAt: '$updatedAt',
              author: {
                firstName: '$author.firstName',
                lastName: '$author.lastName',
                username: '$author.username'
              },
              rate: { $size: '$rating' }
            }},
            { $sort: { rate: -1}}
          ]);
        return res.json(events);
      }
    }

    // This is in case the user is registered but has no admin
    const events = await Event.aggregate(
      [
        { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
        { $unwind: '$author' },
        { $project: { 
          _id: '$_id', isActive: '$isActive', capacity: '$capacity', title: '$title',
          description: '$description', date: '$date', duration: '$duration', 
          onSite: '$onSite', venue: '$venue', createdAt: '$createdAt', updatedAt: '$updatedAt', 
          author: {
            firstName: '$author.firstName',
            lastName: '$author.lastName',
            username: '$author.username'
          },
          rate: { $size: '$rating' }
        }},
        { $sort: { rate: -1}}
      ]);
    return res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to get events", error });
  }
};

/* FUNCTION TO GET AN EVENT BY ID */
export const getEvent: RequestHandler = async (req, res) => {
  try {
    if (req.registered) {

      const user = await User.findById(req.userId);

      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.roles.includes('admin') ||
        await isAuthor(req.params.id, req.userId)) {

        const event = await Event.aggregate(
          [
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
            { $match: { "_id": mongoose.Types.ObjectId(req.params.id)}},
            { $unwind: '$author' },
            { $project: { 
              _id: '$_id', isActive: '$isActive', capacity: '$capacity', rating: '$rating',
              attendance: '$attendance', title: '$title', description: '$description',
              date: '$date', duration: '$duration', onSite: '$onSite', venue: '$venue',
              createdAt: '$createdAt', updatedAt: '$updatedAt',
              author: {
                firstName: '$author.firstName',
                lastName: '$author.lastName',
                username: '$author.username'
              }
            }}
          ]);

        if (event.length === 0) return res.status(404).json({ message: "Event not found" });

        return res.json(event[0]);
      }
    }

    const event = await Event.aggregate(
      [
        { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
        { $match: { "_id": mongoose.Types.ObjectId(req.params.id)}},
        { $unwind: '$author' },
        { $project: { 
          _id: '$_id', isActive: '$isActive', capacity: '$capacity', title: '$title',
          description: '$description', date: '$date', duration: '$duration', 
          onSite: '$onSite', venue: '$venue', createdAt: '$createdAt', updatedAt: '$updatedAt', 
          author: {
            firstName: '$author.firstName',
            lastName: '$author.lastName',
            username: '$author.username'
          }
        }}
      ]);

    if (event.length === 0) return res.status(404).json({ message: "Event not found" });

    return res.json(event[0]);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get event", error });
  }
};

/* FUNCTION TO GET EVENT BY AUTHOR  */
export const getEventAuthor: RequestHandler = async (req, res) => {
  try {
    if (!req.registered)
      return res.status(403).json({ message: "No token provided" });

    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // const events = await Event.find({author: req.userId});
    const events = await Event.aggregate(
      [
        { $match: { "author": mongoose.Types.ObjectId(req.userId)}},
        { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
        { $unwind: '$author' },
        { $project: { 
          _id: '$_id', isActive: '$isActive', capacity: '$capacity', title: '$title',
          description: '$description', date: '$date', duration: '$duration', 
          onSite: '$onSite', venue: '$venue', createdAt: '$createdAt', updatedAt: '$updatedAt', 
          author: {
            firstName: '$author.firstName',
            lastName: '$author.lastName',
            username: '$author.username'
          }
        }}
      ]);

    return res.json(events);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get events", error });
  }
};

/* FUNCTION TO DELETE AN EXISTING EVENT */
export const deleteEvent: RequestHandler = async (req, res) => {
  try {
    if (!req.registered)
      return res.status(403).json({ message: "No token provided" });

    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.roles.includes('admin') || await isAuthor(req.params.id, req.userId)) {
      const event = await Event.findByIdAndDelete(req.params.id);

      if (!event) return res.status(404).json({ message: "User not found" });

      return res.json({ message: "successful removal!" });
    }
    return res.status(401).json({ message: "Unauthorized!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete event", error });
  }
};

/* FUNCTION TO UPDATE AN EVENT BY ID */
export const updateEvent: RequestHandler = async (req: Request, res) => {
  try {
    if (!req.registered)
      return res.status(403).json({ message: "No token provided" });

    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.roles.includes('admin') && ('attendance' in req.body || 'rating' in req.body))
        return res.status(401).json({ message: "Unauthorized!"});

    req.body = { ...req.body, author:req.userId }
    if (!emptyFieldsEvent(req))
      return res.status(401).json({ message: "Invalid fields"});

    if (user.roles.includes('admin') || await isAuthor(req.params.id, req.userId)) {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!event) return res.status(404).json({ message: "User not found" });
      return res.json(event);
    }
    return res.status(401).json({ message: "Unauthorized!" });

  } catch (error) {
    return res.status(500).json({ message: "Failed to update event", error });
  }
};

/*FUNCTION TO INSERT AN ATTENDANCE*/
export const insertAttendance: RequestHandler = async (req, res) => {
  try {
    if (!req.registered)
      return res.status(403).json({ message: "No token provided" });

    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });
    
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.attendance.includes(req.userId)) {
      return res.status(409).json({ message: "you are already an assistant" });
    }

    if (await hasCapacity(event)) {
      const event = await Event.findByIdAndUpdate(req.params.id,
        { $addToSet: { attendance: req.userId } }, { new: true });
      return res.json({ message: "attendance registered successfully" });
    }
    return res.status(409).json({ message: "It's full! no capacity available." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to insert Attendence", error });
  }
};

/*FUNCTION TO DELETE AN ATTENDANCE*/
export const deleteAttendance: RequestHandler = async (req, res) => {
  try {
    if (!req.registered)
      return res.status(403).json({ message: "No token provided" });

    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const event = await Event.findByIdAndUpdate(req.params.id,
      { $pullAll: { attendance: [req.userId] } }, { new: true });

    if (!event) return res.status(404).json({ message: "User not found" });
    return res.json({message: "attendance unregistered successfully"});
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete Attendence", error });
  }
};

/* FUNCTION TO INCREASE RATING */
export const increaseRating: RequestHandler = async (req, res) => {
  try {
    if (!req.registered)
      return res.status(401).json({ message: "No token provided" });

    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.rating.includes(req.userId)) {
      return res.status(409).json({ message: "you have already rated the event before!" });
    }

    await Event.findByIdAndUpdate(req.params.id,
      { $addToSet: { rating: req.userId } }, { new: true });

      return res.status(200).json({ message: "Rating up successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to increase rating!", error });
  }
};

/* FUNCTION TO DECREASE RATING */

export const decreaseRating: RequestHandler = async (req, res) => {
  try {
    if (!req.registered)
      return res.status(403).json({ message: "No token provided" });

    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.rating.includes(req.userId)) {
      return res.status(409).json({ message: "you have already rated DOWN the event before!" });
    }
    await Event.findByIdAndUpdate(req.params.id,
      { $pullAll: { rating: [req.userId] } }, { new: true });

    return res.status(200).json({ message: "Rating down successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to decrease rating!", error });
  }
};
