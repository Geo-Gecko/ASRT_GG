import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomizedSlider from "./Slider";
import FormLabel from "@material-ui/core/FormLabel";
class RadioButtons extends React.Component {
  state = {
    value: "jfm",
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  render() {
    this.radioComponent = (
      <div>
        <CustomizedSlider IndicatorSlider="Soil Moisture" sliderKey={8} />
        <CustomizedSlider IndicatorSlider="Rainfall" sliderKey={12} />
        <CustomizedSlider IndicatorSlider="Vegetation Health" sliderKey={16} />
        <CustomizedSlider IndicatorSlider="Temperature" sliderKey={22} />
      </div>
    );
    if (this.state.value === "amj") {
      this.radioComponent = (
        <div>
          <CustomizedSlider IndicatorSlider="Soil Moisture" sliderKey={9} />
          <CustomizedSlider IndicatorSlider="Rainfall" sliderKey={13} />
          <CustomizedSlider
            IndicatorSlider="Vegetation Health"
            sliderKey={17}
          />
          <CustomizedSlider IndicatorSlider="Temperature" sliderKey={23} />
        </div>
      );
    } else if (this.state.value === "jas") {
      this.radioComponent = (
        <div>
          <CustomizedSlider IndicatorSlider="Soil Moisture" sliderKey={10} />
          <CustomizedSlider IndicatorSlider="Rainfall" sliderKey={14} />
          <CustomizedSlider
            IndicatorSlider="Vegetation Health"
            sliderKey={18}
          />
          <CustomizedSlider IndicatorSlider="Temperature" sliderKey={24} />
        </div>
      );
    } else if (this.state.value === "ond") {
      this.radioComponent = (
        <div>
          <CustomizedSlider IndicatorSlider="Soil Moisture" sliderKey={11} />
          <CustomizedSlider IndicatorSlider="Rainfall" sliderKey={15} />
          <CustomizedSlider
            IndicatorSlider="Vegetation Health"
            sliderKey={19}
          />
          <CustomizedSlider IndicatorSlider="Temperature" sliderKey={25} />
        </div>
      );
    } else {
      let defaultRadioComponent = this.radioComponent;
      this.radioComponent = defaultRadioComponent;
    }
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">calendar quarters</FormLabel>
        <RadioGroup
          aria-label="position"
          name="rainfall"
          value={this.state.value}
          onChange={this.handleChange}
          row
        >
          <FormControlLabel
            value="jfm"
            control={<Radio color="default" />}
            label="jfm"
            labelPlacement="end"
          />
          <FormControlLabel
            value="amj"
            control={<Radio color="default" />}
            label="amj"
            labelPlacement="end"
          />
          <FormControlLabel
            value="jas"
            control={<Radio color="default" />}
            label="jas"
            labelPlacement="end"
          />
          <FormControlLabel
            value="ond"
            control={<Radio color="default" />}
            label="ond"
            labelPlacement="end"
          />
        </RadioGroup>
        <div className="monthDisplay">{this.radioComponent}</div>
      </FormControl>
    );
  }
}

export default RadioButtons;
