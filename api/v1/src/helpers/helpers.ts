import Event, { IEvent } from '../models/Event';
import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';

export const isAuthor = async (eventId: string, userId: string) => {
  const theEvent = await Event.findOne({ _id: eventId, author: userId});
  
  if (!theEvent) {
    return false;
  }
  return true
}

export const hasCapacity = async (event: IEvent) => {

  if (event.capacity < 0)
    return true;
  
  if (event.capacity > event.attendance.length)
    return true;
  
  return false;
  
}
