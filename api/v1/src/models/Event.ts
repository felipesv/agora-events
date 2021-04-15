import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
});

export default model('Event', eventSchema);
