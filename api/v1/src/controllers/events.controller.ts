import { RequestHandler } from 'express';
import Event from '../models/Event';

/* FUNCTION TO CREATE EVENT */
export const createEvent: RequestHandler = async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    return res.json(savedEvent);
  } catch(error) {
    return res.status(301).json('All fields are required');
  }
};

/* FUNCTION TO GET ALL EVENTS */
export const getEvents: RequestHandler = async (req, res) => {
  try {

    if (req.userId) {
      const events = await Event.find();
      return res.json(events);
    }
    const events = await Event.find().select('-attendance');
    return res.json(events);
  } catch(error) {
    res.json(error);
  }
};

/* FUNCTION TO GET AN EVENT BY ID */
export const getEvent: RequestHandler = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(204).json(); // no sale mensaje para el error 204
    return res.json(event);
  } catch(error) {
    return res.status(204).json();
  }
};

/* FUNCTION TO DELETE AN EXISTING EVENT */
export const deleteEvent: RequestHandler = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(204).json(); // no sale mensaje para el error 204
    res.json(event);
  } catch(error) {
    return res.status(204).json();
  }
};

/* FUNCTION TO UPDATE AN EVENT BY ID */
export const updateEvent: RequestHandler = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(204).json(); // no sale mensaje para el error 204
    res.json(event);
  } catch(error) {
    return res.status(204).json();
  }
};
