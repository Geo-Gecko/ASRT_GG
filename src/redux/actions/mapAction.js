import { loadGridData } from "./actionTypes/actionTypes";
import axios from "axios";
let mapUrl = `${process.env.REACT_APP_BACKEND_URL}/mapGrids/`;

export const getMapGrids = () => {
  return dispatch => {
    axios.get(mapUrl).then(async response => {
      await dispatch({
        type: loadGridData,
        payload: response.data.data
      });
    });
  };
};
