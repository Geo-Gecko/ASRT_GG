import React from "react";
import "../App.css";
import Nouislider from "nouislider-react";
import _ from "lodash";
import "nouislider/distribute/nouislider.css";
import { connect } from "react-redux";
import {
  updateGridData,
  updatePieChartIndicators,
} from "../redux/actions/actionTypes/actionTypes";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  width: "250px",
  marginLeft: "20px",
  marginBottom: "20px",
};
class CustomizedSlider extends React.Component {
  UpdatedIndicators = this.props.updatePieChartIndicators;

  shouldComponentUpdate(nextProps, nextState) {
    let update_ = true;
    if (this.props.sliderValue.length > 0 && nextProps.sliderValue.length > 0) {
      let currentSliderSum = this.props.sliderValue[
        this.props.sliderKey
      ].reduce((a, b) => { return a + b }, 0 )
      let nextSliderSum = nextProps.sliderValue[
        nextProps.sliderKey
      ].reduce((a, b) => { return a + b }, 0 )
      currentSliderSum === nextSliderSum ? update_ = false : update_ = true
      return update_
    }
    return update_
  }

  onSlide = (render, handle, value, un, percent) => {
    this.indicators = this.props.indicators;
    this.props.sliderValues[this.props.sliderKey] = value;
    let selectedMapData = 
      this.props.landCovermapUpdated === true
        ? _.cloneDeep(this.props.updatedMapGrids)
        : _.cloneDeep(this.props.mapGrids);

    this.indicator = this.indicators[this.props.sliderKey];

    if (this.UpdatedIndicators.includes(this.indicator) === false) {
      if (this.props.sliderKey <= 7 && this.props.sliderKey >= 1) {
        this.UpdatedIndicators.push(this.indicator);
      }
    }

    for (let [sliderKey, values] of Object.entries(this.props.sliderValues)) {
      this.props.currentsliderValues.push(values);

      selectedMapData[0][0].features = selectedMapData[0][0].features.filter(
        (piece) => {
          let propertyValue;
          for (let [key, property] of Object.entries(piece.properties)) {
            if (key === this.indicators[sliderKey]) {
              if (property < values[0] || property > values[1]) {
                propertyValue= false;
                return propertyValue;
              }
              propertyValue= true;
              return propertyValue;
            }
          }
          return propertyValue;
        }
      );
    }

    this.props.dispatch({
      type: updateGridData,
      payload: selectedMapData,
    });
    this.props.dispatch({
      type: updatePieChartIndicators,
      payload: this.UpdatedIndicators,
    });
  };

  render() {

    let value = [1, 100];
    let result = this.props.sliderValue;
    var { sliderKey } = this.props;
    result = result.map((sliderInfo) => sliderInfo);
    let newResult = result[sliderKey];
    if (Array.isArray(newResult) && newResult.length) {
      value = newResult;
    }
    if (this.props.chartView === true && this.props.mapUpdated === true) {
      result = this.props.sliderValues;
      for (let [Key, values] of Object.entries(this.props.sliderValues)) {
        if (Key === sliderKey) {
          value = values;
        }
      }
    }

    let range = { min: 1, max: 100 };
    if (newResult) {
      range = { min: newResult[0], max: newResult[1] };
    }

    return (
      <div style={styles}>
        <div style={{ textAlign: "center", marginBottom: 5, fontSize: 15 }}>
          {this.props.IndicatorSlider}
        </div>
        <Nouislider
          start={value}
          key={sliderKey}
          range={range}
          tooltips={false}
          onChange={this.onSlide}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    district: state.map.district,
    chartView: state.chart.chartView,
    sliderValue: state.slider.sliderValue,
    indicators: state.slider.indicators,
    mapGrids: state.map.mapGrids,
    mapUpdated: state.map.mapUpdated,
    landCovermapUpdated: state.map.landCovermapUpdated,
    sliderValues: state.map.sliderValues,
    currentsliderValues: state.map.currentsliderValues,
    piechartData: state.chart.pieChartData,
    updatePieChartIndicators: state.chart.piechartIndicators,
    pieChartDataUpdated: state.chart.pieChartDataUpdated,
    locationValue: state.location.locationValue,
    DistrictGridcells: state.map.DistrictGridcells,
    updatedMapGrids: state.map.updatedMapGrids,
  };
};

export default connect(mapStateToProps)(CustomizedSlider);
