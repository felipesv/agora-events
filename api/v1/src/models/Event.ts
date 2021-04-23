import { Schema, model, Document, ObjectId } from 'mongoose';

// An objectId has 2 validation by default:
// 1) Hexadecimal 2) 24 characters
// That's why i necessary to use the mongoose-id-validator library

export interface IEvent extends Document{
  author: string | ObjectId,
  tittle: string,
  description: string,
  date: Date,
  duration: {
    length: number,
    format: string
  },
  format: string,
  onSite: boolean,
  venue: string,
  isActive: boolean,
  capacity: number,
  rating: Array<string>,
  attendance: Array<string>,
}

const eventSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
  duration: {
    length: {
      type: Number,
      required: true,
    },
    format: {
      type: String,
      required: true,
      trim: true,
      enum: ['days', 'hours']
    }
  },
  onSite: {
    type: Boolean,
    required: true,
  },
  venue: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  capacity: {
    type: Number,
    default: -1,
  },
  rating: [
      { type: Schema.Types.ObjectId, ref: 'User' }
    ],
  attendance: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ]
}, {
  versionKey: false,
  timestamps: true
});

export default model<IEvent>('Event', eventSchema);
