import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "../App.css";
import FormGroup from "@material-ui/core/FormGroup";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { updateGridData } from "../redux/actions/actionTypes/actionTypes";

function Checkboxes(props) {
  let { checkboxKey } = props;
  let checkboxValue = 0;
  let indicators = props.landCoverIndicators;
  let result = props.landCoverValue;
  result = result.map(sliderInfo => sliderInfo);
  let newResult = result[checkboxKey];
  checkboxValue = newResult;
  const [state, setState] = React.useState({ id: false, value: 0 });
  const handleChange = event => {
    let mapData = props.mapGrids;
    setState({ ...state, id: event.target.checked, value: checkboxValue });
    console.log(state.value);
    mapData[0][0].features = mapData[0][0].features.filter(piece => {
      for (let [key, property] of Object.entries(piece.properties)) {
        if (key === "land_cover") {
          if (indicators[checkboxKey] == props.label) {
            if (property < checkboxValue) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    });
    props.dispatch({ type: updateGridData, payload: mapData });
  };
  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checked}
              onChange={handleChange}
              value={checkboxValue}
              id={checkboxKey}
              inputProps={{ "aria-label": "checkbox with default color" }}
            />
          }
          label={props.label}
        />
      </FormGroup>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    landCoverValue: state.slider.landCoverResults,
    landCoverIndicators: state.slider.landCoverCheckBox,
    indicator: state.slider.land_cover,
    mapGrids: state.map.mapGrids
  };
};
export default connect(mapStateToProps)(Checkboxes);
