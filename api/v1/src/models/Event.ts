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
  }
  // FALTA EL USUARIO QUE CREA EL EVENTO

  // FALTA AGREGAR ARREGLO USUARIOS QUE VAN A ASISTIR
}, {
  versionKey: false,
  timestamps: true
});

export default model('Event', eventSchema);
