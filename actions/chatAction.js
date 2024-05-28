import { SET_NEW_MESSAGE_RESPONSE, SET_NEW_NOTIFICATION_RESPONSE } from "./types";

export const setResponse = (message) => (dispatch) => {
  dispatch({
    type: SET_NEW_MESSAGE_RESPONSE,
    payload: message,
  });
};

export const setNotification = (notification) => (dispatch) => {
  console.log(notification);
  dispatch({
    type: SET_NEW_NOTIFICATION_RESPONSE,
    payload: notification,
  });
};