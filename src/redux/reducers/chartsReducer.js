import AppState from "../applicationState";
import {
  updatePieChartIndicators,
  updateChartView,
  updateChartViewSuccess,
} from "../actions/actionTypes/actionTypes";

const chartReducer = (state = AppState.initialChartState, action) => {
  switch (action.type) {
    case updatePieChartIndicators:
      return {
        ...state,
        piechartIndicators: action.payload,
      };
    case updateChartViewSuccess:
      return {
        ...state,
        chartView: action.payload,
      };
    case updateChartView:
      return {
        ...state,
        chartView: action.payload,
      };
    default:
      return state;
  }
};

export default chartReducer;
