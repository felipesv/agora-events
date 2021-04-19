import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config/config';

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
  roles: [
    {
      type: String,
      default: 'user',
      trim: true,
      enum: ['user', 'admin']
    }
  ],
  verify: {
    type: Boolean,
    default: false
  },
  attendedEvents: [
    { type: Schema.Types.ObjectId, ref: 'Event' }
  ]
}, {
  versionKey: false,
  timestamps: true
});

export const encryptPassword = async (password: String) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, Number(config.SALT_ROUNDS));
};

export default model('User', userSchema);
