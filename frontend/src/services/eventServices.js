import { setLoadingState, getEvents, getEventById,
  createEvent, deleteEventById, getEventsByAuthor,
  editEvent, addAttendance, eventError, deleteAttendance, addRating, deleteRating
} from "../actions/eventActionCreator";
import axios from "axios";
import { constructHeader, eventFormat } from "../utils/eventUtils";

export const fetchEvents = () => async dispatch => {
  dispatch(setLoadingState(true));
  await axios.get(
    `${process.env.API_URL}/events`,
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => dispatch(getEvents(data)))
  .catch((error) => {})
  .finally(() => dispatch(setLoadingState(false))); 
};

export const fetchEventById = (id) => async dispatch => {
  dispatch(setLoadingState(true));
  await axios.get(
    `${process.env.API_URL}/events/${id}`,
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => dispatch(getEventById(data)))
  .catch((error) => {})
  .finally(() => dispatch(setLoadingState(false))); 
};

export const fetchEventByAuthor = () => async dispatch => {
  dispatch(setLoadingState(true));
  await axios.get(
    `${process.env.API_URL}/authorevents`,
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => dispatch(getEventsByAuthor(data)))
  .catch((error) => {})
  .finally(() => dispatch(setLoadingState(false))); 
};

export const createNewEvent = (newEvent) => async dispatch => {
  dispatch(setLoadingState(true));
  await axios.post(
    `${process.env.API_URL}/events`,
    eventFormat(newEvent),
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => dispatch(createEvent(data)))
  .catch((error) => {})
  .finally(() => dispatch(setLoadingState(false))); 
};

export const deleteEvent = (id) => async dispatch => {
  dispatch(setLoadingState(true));
  await axios.delete(
    `${process.env.API_URL}/events/${id}`,
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => {
    data.idRemove = id;
    dispatch(deleteEventById(data))
  })
  .catch((error) => {})
  .finally(() => dispatch(setLoadingState(false))); 
};

export const updateEvent = (newEventUpdated) => async dispatch => {
  dispatch(setLoadingState(true));
  await axios.put(
    `${process.env.API_URL}/events/${newEventUpdated.id}`,
    eventFormat(newEventUpdated),
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => dispatch(editEvent(data)))
  .catch((error) => {})
  .finally(() => dispatch(setLoadingState(false))); 
};

export const attendanceUp = (id) => async dispatch => {
  dispatch(setLoadingState(true));
  await axios.post(
    `${process.env.API_URL}/attendance/${id}`,
    {},
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => dispatch(addAttendance(data)))
  .catch((error) => dispatch(eventError(error)))
  .finally(() => dispatch(setLoadingState(false))); 
};

export const attendanceDown = (id) => async dispatch => {
  dispatch(setLoadingState(true));
  await axios.delete(
    `${process.env.API_URL}/attendance/${id}`,
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => dispatch(deleteAttendance(data)))
  .catch((error) => dispatch(eventError(error)))
  .finally(() => dispatch(setLoadingState(false))); 
};

export const ratingUp = (id) => async dispatch => {
  dispatch(setLoadingState(true));
  await axios.post(
    `${process.env.API_URL}/rating/${id}`,
    {},
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => dispatch(addRating(data)))
  .catch((error) => dispatch(eventError(error)))
  .finally(() => dispatch(setLoadingState(false))); 
};

export const ratingDown = (id) => async dispatch => {
  dispatch(setLoadingState(true));
  await axios.delete(
    `${process.env.API_URL}/rating/${id}`,
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => dispatch(deleteRating(data)))
  .catch((error) => dispatch(eventError(error)))
  .finally(() => dispatch(setLoadingState(false))); 
};