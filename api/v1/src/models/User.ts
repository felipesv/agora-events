import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ['user', 'admin']
  },
  verify: {
    type: Boolean,
    required: true,
  },
  attendedEvents: [
    { type: Schema.Types.ObjectId, ref: 'Event' }
  ]
}, {
  versionKey: false,
  timestamps: true
});

export default model('User', userSchema);
