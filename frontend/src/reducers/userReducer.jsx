import { 
  GET_PROFILE, EDIT_USER, USER_ERROR
} from '../actions/userActionType';

export const initialState = {
  loading: false,
  user: null,
  success: ""
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
    case GET_PROFILE:
    case EDIT_USER:
      return { ...state, user: action.data };
    case USER_ERROR:
      return { ...state, error: action.error.response.data };
  }
};

export default userReducer;
