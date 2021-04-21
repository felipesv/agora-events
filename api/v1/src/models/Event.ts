import { Schema, model } from 'mongoose';

// An objectId has 2 validation by default:
// 1) Hexadecimal 2) 24 characters
// That's why i necessary to use the mongoose-id-validator library

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
    type: Number
  },
  rating: {
    users: [
      { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    value: {
      type: Number,
      default: 0
    }
  },
  attendance: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ]
}, {
  versionKey: false,
  timestamps: true
});

export default model('Event', eventSchema);
