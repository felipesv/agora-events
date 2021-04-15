import { RequestHandler } from 'express';
import Event from './Event';

export const createEvent: RequestHandler = async (req, res) => {
  /* PARA LOS USUARIOS
    const videosFound = await Video.find({url: req.body.url});
    if (videosFound)
      res.status(301).json({message: 'mensaje de error'});
   */

  const event = new Event(req.body);
  const savedEvent = await event.save();
  res.json(savedEvent);
};

export const getEvents: RequestHandler = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch(error) {
    res.json(error);
  }
};

export const getEvent: RequestHandler = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(204).json(); // no sale mensaje para el error 204
  res.json(event);
};

export const deleteEvent: RequestHandler = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(204).json(); // no sale mensaje para el error 204
  res.json(event);
};

export const updateEvent: RequestHandler = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) return res.status(204).json(); // no sale mensaje para el error 204
  res.json(event);
};
