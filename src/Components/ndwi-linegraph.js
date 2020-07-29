import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Line } from "react-chartjs-2";
class Ndwilinegraph extends React.Component {
  render() {
    let ndwi_jfm_value,
      ndwi_amj_value,
      ndwi_jas_value,
      ndwi_ond_value,
      ndwi_jfm,
      ndwi_amj,
      ndwi_jas,
      ndwi_ond = 0;
    let nationalData = this.props.nationalGridData;
    let cropHealthchartData = _.cloneDeep(this.props.cropHealthchartData);
    let districtData = this.props.propertiesData;
    let cropHealthNationalGridcells = _.cloneDeep(
      this.props.cropHealthNationalGridcells
    );
    districtData.filter((propertyData) => {
      for (let [sliderK, val] of Object.entries(propertyData)) {
        //ndwi amount
        ndwi_jfm =
          sliderK === "ndwi_jfm"
            ? (ndwi_jfm += val)
            : (ndwi_jfm = propertyData["ndwi_jfm"]);
        ndwi_amj =
          sliderK === "ndwi_amj"
            ? (ndwi_amj += val)
            : (ndwi_amj = propertyData["ndwi_amj"]);
        ndwi_jas =
          sliderK === "ndwi_jas"
            ? (ndwi_jas += val)
            : (ndwi_jas = propertyData["ndwi_jas"]);
        ndwi_ond =
          sliderK === "ndwi_ond"
            ? (ndwi_ond += val)
            : (ndwi_ond = propertyData["ndwi_ond"]);
      }
      return true;
    });

    nationalData.forEach((nationalGridcell) => {
      for (let [sliderK, val] of Object.entries(
        nationalGridcell["properties"]
      )) {
        //national ndwi amount
        ndwi_jfm_value =
          sliderK === "ndwi_jfm"
            ? (ndwi_jfm_value += val)
            : (ndwi_jfm_value = nationalGridcell["properties"]["ndwi_jfm"]);
        ndwi_amj_value =
          sliderK === "ndwi_amj"
            ? (ndwi_amj_value += val)
            : (ndwi_amj_value = nationalGridcell["properties"]["ndwi_amj"]);
        ndwi_jas_value =
          sliderK === "ndwi_jas"
            ? (ndwi_jas_value += val)
            : (ndwi_jas_value = nationalGridcell["properties"]["ndwi_jas"]);
        ndwi_ond_value =
          sliderK === "ndwi_ond"
            ? (ndwi_ond_value += val)
            : (ndwi_ond_value = nationalGridcell["properties"]["ndwi_ond"]);
      }
      return true;
    });
    //crop health calculations
    cropHealthchartData[0] = ndwi_jfm;
    cropHealthchartData[1] = ndwi_amj;
    cropHealthchartData[2] = ndwi_jas;
    cropHealthchartData[3] = ndwi_ond;

    cropHealthNationalGridcells[0] = ndwi_jfm_value;
    cropHealthNationalGridcells[1] = ndwi_amj_value;
    cropHealthNationalGridcells[2] = ndwi_jas_value;
    cropHealthNationalGridcells[3] = ndwi_ond_value;
    const options = {
      legend: {
        display: true,
        position: "bottom",
      },
    };
    const state = {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "National Crop Health",
          fill: false,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          lineTension: 0,
          data: cropHealthNationalGridcells,
        },
        {
          label: " District Crop Health",
          fill: false,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(75,192,192,1)",
          hoverBackgroundColor: "rgba(75,192,192,2)",
          hoverBorderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          lineTension: 0,
          data: cropHealthchartData,
        },
      ],
    };

    return (
      <div className="mega">
        <div className="charts">
          <h5 className="chartHeading">Crop Health</h5>
        </div>
        <div className="chartSection">
          <Line data={state} options={options} height={120} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cropHealthchartData: state.chart.cropHealthChartData,
    cropHealthNationalGridcells: state.chart.cropHealthNationalGridcells,
    propertiesData: state.map.propertiesData,
    nationalGridData: state.map.nationalGridData,
  };
};
export default connect(mapStateToProps)(Ndwilinegraph);
