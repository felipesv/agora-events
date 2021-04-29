import { combineReducers } from 'redux';
import eventReducer, { initialState as initialEvent} from "../reducers/eventReducer";
import authReducer, { initialState as initialAuth} from "../reducers/authReducer";

const rootReducers = combineReducers({
  events: eventReducer,
  auth: authReducer
});

export const initialState = {
	events: initialEvent,
  auth: initialAuth,
};

export default rootReducers;
