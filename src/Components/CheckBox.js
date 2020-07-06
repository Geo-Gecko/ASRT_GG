import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "../App.css";
import FormGroup from "@material-ui/core/FormGroup";
import { connect } from "react-redux";
import _ from "lodash";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { updateLandCoverGridData } from "../redux/actions/actionTypes/actionTypes";

class Checkboxes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: false,
      tagCheckBox: parseFloat(Math.random().toFixed(3))
    };
    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.tagCheckBox === nextState.tagCheckBox ? false : true
  }

  handleChange() {
    this.setState({
      key: !this.state.key,
      tagCheckBox: parseFloat(Math.random().toFixed(3))
    });
  
    let checkboxValue = 0;
  
    let result = this.props.landCoverValue;
    result = result.map((sliderInfo) => sliderInfo);
    let newResult = result[this.props.checkboxKey];
    checkboxValue = newResult;
    let selectedMapData = _.cloneDeep(this.props.mapGrids);;
   
    this.props.landCoverSliderValues[this.props.checkboxKey] = checkboxValue;
    
    for (let [landCoverKey, value] of Object.entries(
      this.props.landCoverSliderValues
    )) {

      selectedMapData[0][0].features = selectedMapData[0][0].features.filter(
        (piece) => {
          let checkPropertyValue;
          for (let [key, property] of Object.entries(piece.properties)) {
            if (
              key === "land_cover" &&
              this.props.landCoverIndicators[landCoverKey] === this.props.label
            ) {
              if (property < value) {
                checkPropertyValue=false;
                return checkPropertyValue;
              } else {
                checkPropertyValue= true;
                return checkPropertyValue;
              }
            }
          }
          return checkPropertyValue;
        }
      );
    }

    this.props.dispatch({ type: updateLandCoverGridData, payload: selectedMapData });
    // this is in onChange so may bring up an error
    return true
  };

  render() {
  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.key}
              size="small"
              onChange={this.handleChange}
              value={this.state.key === true ? this.props.landCoverSliderValues : 0}
              id={this.props.checkboxKey}
              inputProps={{ "aria-label": "checkbox with default color" }}
            />
          }
          label={this.props.label}
        />
      </FormGroup>
    </div>
  )};
}
const mapStateToProps = (state) => {
  return {
    landCoverValue: state.slider.landCoverResults,
    landCoverIndicators: state.slider.landCoverCheckBox,
    indicator: state.slider.land_cover,
    mapGrids: state.map.mapGrids,
    updatedMapGrids: state.map.updatedMapGrids,
    landCoverSliderValues: state.map.landCoverSliderValues,
    mapUpdated: state.map.mapUpdated,
  };
};
export default connect(mapStateToProps)(Checkboxes);
