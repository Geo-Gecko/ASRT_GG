import React from "react";
import "../App.css";
import Checkboxes from "./CheckBox";

export default function LandCover(props) {
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        {props.IndicatorSlider}
      </div>
      <Checkboxes label="No data" checkboxKey="0" />
      <Checkboxes label="Trees Cover Areas" checkboxKey="1" />
      <Checkboxes label="Shrub Cover Areas" checkboxKey="2" />
      <Checkboxes label="Grassland" checkboxKey="3" />
      <Checkboxes label="Cropland" checkboxKey="4" />
      <Checkboxes
        label="Vegetation aquatic or regularly flooded"
        checkboxKey="5"
      />
      <Checkboxes label="Lichen Mosses / Sparse vegetation" checkboxKey="6" />
      <Checkboxes label="Bare Areas" checkboxKey="7" />
      <Checkboxes label="Built Up areas" checkboxKey="8" />
      <Checkboxes label="snow and ice" checkboxKey="9" />
      <Checkboxes label="open water" checkboxKey="10" />
    </div>
  );
}
