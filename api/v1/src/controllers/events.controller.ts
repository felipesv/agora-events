import { RequestHandler } from 'express';
import Event from '../models/Event';
import User from '../models/User';
import { isAuthor, hasCapacity } from '../helpers/helpers';

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
        const events = await Event.find();
        return res.json(events);
      }
    }

    // This is in case the user is registered but has no admin
    const events = await Event.find().select('-attendance');

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

        const event = await Event.findById(req.params.id);

        return res.json(event);
      }
    }

    const event = await Event.findById(req.params.id).select('-attendance');

    if (!event) return res.status(404).json({ message: "User not found" });

    return res.json(event);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get event", error });
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
export const updateEvent: RequestHandler = async (req, res) => {
  try {
    if (!req.registered)
      return res.status(403).json({ message: "No token provided" });

    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

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
    return res.json(event);
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete Attendence", error });
  }
};