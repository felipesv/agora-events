import { combineReducers } from 'redux';
import eventReducer, { initialState as initialEvent} from "../reducers/eventReducer";

const rootReducers = combineReducers({
  events: eventReducer
});

export const initialState = {
	events: initialEvent,
};

export default rootReducers;
