import {
  updateGridData,
  loadGridData,
  updateLandCoverGridData,
  updateIndicatorSize,
  updateIndicatorSizeSuccess,
} from "../actions/actionTypes/actionTypes";
import AppState from "../applicationState";

const mapReducer = (state = AppState.initialMapState, action) => {
  switch (action.type) {
    case loadGridData:
      return {
        ...state,
        mapGrids: action.payload,
        updatedMapGrids: action.payload,
      };
    case updateGridData:
      return {
        ...state,
        updatedMapGrids: action.payload,
        mapUpdated: true,
      };
    case updateLandCoverGridData:
      return {
        ...state,
        updatedMapGrids: action.payload,
        landCovermapUpdated: true,
        mapUpdated: true,
      };
    case updateIndicatorSize:
      return {
        ...state,
        updateIndicatorSize: action.payload,
      };
    case updateIndicatorSizeSuccess:
      return {
        ...state,
        updateIndicatorSize: action.payload,
      };

    default:
      return state;
  }
};

export default mapReducer;
