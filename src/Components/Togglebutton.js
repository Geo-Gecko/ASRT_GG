import React from "react";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  updateIndicatorSize,
  updateIndicatorSizeSuccess,
} from "../redux/actions/actionTypes/actionTypes";
function Switches(props) {
  const [state, setState] = React.useState({
    checkedA: true,
  });
  const handleChange = (event) => {
    event.preventDefault();
    setState({
      ...state,
      [event.target.name]: !state.checkedA,
    });
  };
  const showContent = state.checkedA;
  if (showContent === true) {
    props.dispatch({ type: updateIndicatorSize, payload: props.chartData });
  }
  if (showContent === false) {
    props.dispatch({
      type: updateIndicatorSizeSuccess,
      payload: props.agricTitle,
    });
  }
  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        }
        label={showContent === true ? props.chartData : props.agricTitle}
        labelPlacement="start"
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    updateIndicatorSize: state.map.updateIndicatorSize,
  };
};

export default connect(mapStateToProps)(Switches);
