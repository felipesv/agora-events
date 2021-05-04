import { combineReducers } from 'redux';
import eventReducer, { initialState as initialEvent} from "../reducers/eventReducer";
import authReducer, { initialState as initialAuth} from "../reducers/authReducer";
import userReducer, { initialState as initialUser } from "../reducers/userReducer";

const rootReducers = combineReducers({
  events: eventReducer,
  auth: authReducer,
  user: userReducer
});

export const initialState = {
	events: initialEvent,
  auth: initialAuth,
  user: initialUser
};

export default rootReducers;
