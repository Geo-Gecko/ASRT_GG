import { loadLocationData } from "./actionTypes/actionTypes";
import axios from "axios";
let LocationUrl = `${process.env.REACT_APP_BACKEND_URL}/location/`;

export const getLocation = () => {
  return dispatch => {
    axios.get(LocationUrl).then(async response => {
      await dispatch({
        type: loadLocationData,
        payload: response.data
      });
    });
  };
};
