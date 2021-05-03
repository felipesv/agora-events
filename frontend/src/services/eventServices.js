import { setLoadingState, getEvents, getEventById,
  createEvent, deleteEventById } from "../actions/eventActionCreator";
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
    {},
    constructHeader()
  )
  .then((res) => res.data)
  .then((data) => dispatch(deleteEventById(data)))
  .catch((error) => {})
  .finally(() => dispatch(setLoadingState(false))); 
};
