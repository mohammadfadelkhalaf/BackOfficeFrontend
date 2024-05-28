import {
  SET_NEW_MESSAGE_RESPONSE,
  SET_NEW_NOTIFICATION_RESPONSE,
} from "@/actions/types.js";
const initialState = {
  newResponse: {},
  newNotification: {},
};

export default function chatReducer (state = initialState, action) {
  switch (action.type) {
    case SET_NEW_MESSAGE_RESPONSE:
      return {
        ...state,
        newResponse: action.payload,
      };
    case SET_NEW_NOTIFICATION_RESPONSE:
      return {
        ...state,
        newNotification: action.payload,
      };

    default:
      return state;
  }
}
