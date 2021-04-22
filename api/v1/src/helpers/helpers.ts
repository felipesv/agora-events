import { ObjectId } from "mongoose";
import Event from '../models/Event';
import { ExecOptionsWithStringEncoding } from "child_process";


export const isAuthor = async (eventId: string, userId: string) => {
  const theEvent = await Event.findOne({ _id: eventId, author: userId});
  
  if (!theEvent) {
    return false;
  }
  return true
}
