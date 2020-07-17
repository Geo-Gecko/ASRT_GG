import AppState from "../applicationState";
import {
  updatePieChartIndicators,
  updatePieChartData,
  updatePieChartDataSuccess,
  updatePopulationChartData,
  updateChartView,
  updateChartViewSuccess,
  updateRainfallChartData,
  updateCropHealthChartData,
  updateVegetationHealthChartData,
  updateTemperatureChartData
} from "../actions/actionTypes/actionTypes";

const chartReducer = (state = AppState.initialChartState, action) => {
  switch (action.type) {
    case updatePieChartIndicators:
      return {
        ...state,
        piechartIndicators: action.payload,
      };
    case updatePieChartData:
      return {
        ...state,
        pieChartData: action.payload,
        pieChartDataUpdated: true,
      };
    case updatePopulationChartData:
      return {
        ...state,
        populationChartData: action.payload,
        populationAverageNationalGridcells:
          action.populationAverageNationalGridcells,
      };
    case updateVegetationHealthChartData:
      return {
        ...state,
        vegetationHealthChartData: action.payload,
        vegetationHealthNationalGridcells:
          action.vegetationHealthNationalGridcells,
      };
    case updateCropHealthChartData:
      return {
        ...state,
        cropHealthChartData: action.payload,
        cropHealthNationalGridcells: action.cropHealthNationalGridcells,
      };
    case updateRainfallChartData:
      return {
        ...state,
        rainfallChartData: action.payload,
        rainfallNationalGridcells: action.rainfallNationalGridcells,
      };
    case updateTemperatureChartData:
      return {
        ...state,
        temperatureChartData: action.payload,
        temperatureNationalGridcells: action.temperatureNationalGridcells,
      };
    case updatePieChartDataSuccess:
      return {
        ...state,
        pieChartDataUpdated: action.payload,
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
